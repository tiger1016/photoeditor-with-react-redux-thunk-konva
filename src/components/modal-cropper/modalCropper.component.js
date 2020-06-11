import React from "react";
import Cropper from "react-cropper";
import '../../../node_modules/cropperjs/src/css/cropper.scss';
import './cropper.css';

import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import RedoIcon from '@material-ui/icons/Redo';
import UndoIcon from '@material-ui/icons/Undo';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import CropIcon from '@material-ui/icons/Crop';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Crop169Icon from '@material-ui/icons/Crop169';
import CropSquareIcon from '@material-ui/icons/CropSquare';
import CropPortraitIcon from '@material-ui/icons/CropPortrait';
import GridOffIcon from '@material-ui/icons/GridOff';
import GridOnIcon from '@material-ui/icons/GridOn';

import {DialogActions, DialogContent, DialogContentText} from "@material-ui/core";

import {useDispatch, useSelector} from 'react-redux';
import {updateImage, redefineImage} from "../modal-upload-images/uploadSlicer";
import {getProject} from "../../slices/projectSlice";
import {ImageUploadAPI} from '../../services/db/models/imageUploadAPI';

const imageUploadAPI = new ImageUploadAPI();

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ModalCropperComponent = ({isOpen, handleClose, image}) => {
    const [hasGrid, setHasGrid] = React.useState(true);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [aspectRatio, setAspectRatio] = React.useState([]);
    const [openCrop, setOpenCrop] = React.useState(false);
    const [editImage, setEditImage] = React.useState(image || null);
    const [urlImage, setUrlImage] = React.useState(null);
    const editorRef = React.createRef();


    const dispatch = useDispatch();
    const project = useSelector(getProject);
    const PROJECT_ASPECT_RATIO = project.aspect_ratio?.split('/') || [16, 9];
    const CANVAS_WIDTH = 900;
    const CANVAS_HEIGHT = 1200;

    React.useEffect(() => {

        if (image) {
            const img = new Image();

            imageUploadAPI.get(image.image_meta.image_uuid).then((image_db) => {
                console.log(image_db);
                const url_source = URL.createObjectURL(image_db.modified ? image_db.blob_medium_modified : image_db.blob_medium);

                setUrlImage(url_source);

                img.src = url_source;
                img.onload = function () {

                    // URL.revokeObjectURL(url_source);

                    if (img.width > img.height) {
                        setAspectRatio([Math.max(...PROJECT_ASPECT_RATIO), Math.min(...PROJECT_ASPECT_RATIO)]);
                    } else if (img.width < img.height) {
                        setAspectRatio([Math.min(...PROJECT_ASPECT_RATIO), Math.max(...PROJECT_ASPECT_RATIO)]);
                    } else {
                        setAspectRatio(PROJECT_ASPECT_RATIO);
                    }
                }

                setEditImage(image_db);

            });
        }

    }, [image]);

    const redefineImageUrl = () => {

        const url_source = URL.createObjectURL(editImage.blob_medium);

        setUrlImage(url_source);
    }

    const saveImage = () => {
        const img = new Image();
        editorRef.current.getCroppedCanvas().toBlob((blob) => {

            //img.src = editorRef.current.getCroppedCanvas().toDataURL();
            img.src = URL.createObjectURL(blob);
            const cropData = editorRef.current.getCropBoxData();
            const rotateData = editorRef.current.getImageData();

            const image_transform = {
                "crop_x": cropData.left,
                "crop_y": cropData.top,
                "rotation": rotateData.rotate,
                "filters": []
            }

            img.onload = function () {

//                URL.revokeObjectURL(img.src);

                if (img.width === img.height) {
                    const canvas = document.createElement("canvas");
                    canvas.width = Math.max(CANVAS_WIDTH, CANVAS_HEIGHT);
                    canvas.height = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT);
                    img.width = canvas.height;
                    img.height = canvas.height;
                    const ctx = canvas.getContext("2d");
                    ctx.fillStyle = "#ffffff";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, (canvas.width / 2) - (img.width / 2), (canvas.height / 2) - (img.height / 2), img.width, img.height);

                    canvas.toBlob(blob_adjusted => {
                        dispatch(updateImage({
                            project,
                            image: image,
                            modified: blob_adjusted,
                            modified_thumb: blob_adjusted,
                            transform: image_transform
                        }));
                        handleClose();
                        return;
                    }, img.type);
                }
            }


            dispatch(updateImage({
                project,
                image: image,
                modified: blob,
                modified_thumb: blob,
                transform: image_transform
            }));
            handleClose();
        });


    }
    const setCrop = (ratio) => {
        editorRef.current.setAspectRatio(ratio);
        editorRef.current.crop();
        setHasGrid(true);
    }
    const addEvent = (event) => {
        if (event.ctrlKey && event.key === 'z') {
            if (editorRef.current) {
                editorRef.current.reset();
            }
        }
    }
    return (
        <React.Fragment>
            <Dialog
                PaperProps={{
                    style: {
                        minHeight: '600px',
                        backgroundColor: '#1e1e1e',

                    }
                }}
                fullWidth maxWidth="lg" aria-labelledby="simple-dialog-title"
                TransitionComponent={Transition}
                onEntered={() => {
                    document.addEventListener('keydown', addEvent);
                }}
                onExit={() => {
                    setOpenCrop(false);
                    document.removeEventListener('keydown', addEvent);
                }}
                open={isOpen}
                onClose={handleClose}>
                <Container
                    style={{
                        padding: '20px'
                    }}>
                    <Grid container direction="row" justify="flex-end" spacing={2}>
                        <Grid item>
                            <Button onClick={handleClose}>
                                <Typography variant="caption" style={{
                                    color: "#cecece"
                                }}>Cancelar</Typography>
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                                onClick={saveImage}
                                style={{
                                    backgroundColor: "#cecece"
                                }}
                            >
                                <Typography variant="caption">Salvar</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
                <Box>
                    <Cropper
                        ref={editorRef}
                        src={urlImage}
                        aspectRatio={aspectRatio[0] / aspectRatio[1]}
                        style={{height: 600, minHeight: 600}}
                        autoCrop={true}
                        autoCropArea={1}
                        viewMode={1}
                        dragMode={'none'}
                        guides={true}/>
                </Box>
                <Container
                    style={{
                        backgroundColor: "#1E1E1E",
                    }}>
                    <Container style={{margin: "10px"}}>
                        <Grid spacing={2} container justify="center" alignItems="center" alignContent="center">
                            <Grid item>
                                {hasGrid ?
                                    <Button onClick={() => {
                                        setHasGrid(false);
                                        editorRef.current.clear();
                                    }}>
                                        <GridOffIcon style={{color: "#ccc"}}/>
                                    </Button>
                                    :
                                    <Button onClick={() => {
                                        setHasGrid(true);
                                        editorRef.current.crop();
                                    }}>
                                        <GridOnIcon style={{color: "#ccc"}}/>
                                    </Button>
                                }
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={() => {
                                        editorRef.current.reset();
                                    }}
                                >
                                    <UndoIcon style={{color: "#ccc"}}/>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button>
                                    <RedoIcon style={{color: "#ccc"}}/>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    disabled={image?.image_meta.source_modified === null}
                                    onClick={() => {
                                        setOpenAlert(true);
                                    }}
                                >
                                    <SettingsBackupRestoreIcon style={{color: "#ccc"}}/>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Divider orientation="vertical"
                                         style={{backgroundColor: "rgba(255,255,255,0.3)", height: "25px"}}
                                         flexItem/>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => {
                                    setOpenCrop(!openCrop);
                                }}>
                                    <CropIcon style={{color: "#ccc"}}/>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => {
                                    editorRef.current.rotate(90);
                                    const canvas_data = editorRef.current.getCanvasData();
                                    let ap_ratio = null;
                                    if (canvas_data.width > canvas_data.height) {
                                        ap_ratio = Math.max(aspectRatio[0], aspectRatio[1]) / Math.min(aspectRatio[0], aspectRatio[1]);
                                    } else {
                                        ap_ratio = Math.min(aspectRatio[0], aspectRatio[1]) / Math.max(aspectRatio[0], aspectRatio[1]);
                                    }
                                    editorRef.current.setAspectRatio(ap_ratio);
                                }}>
                                    <RotateLeftIcon style={{color: "#ccc"}}/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>

                    {openCrop ?
                        <Grid spacing={2} container justify="center" alignItems="center" alignContent="center">
                            <Grid item>

                                <Button onClick={() => {
                                    setCrop(1);
                                }}>
                                    <Grid container direction="column" justify="center" alignItems="center"
                                          alignContent="center">
                                        <CropSquareIcon style={{color: "#ccc"}}/>
                                        <Typography variant="caption" style={{
                                            color: "#fff"
                                        }}>
                                            Quadrado
                                        </Typography>
                                    </Grid>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => {
                                    setCrop(Math.max(aspectRatio[0], aspectRatio[1]) / Math.min(aspectRatio[0], aspectRatio[1]));
                                }}>
                                    <Grid container direction="column" justify="center" alignItems="center"
                                          alignContent="center">
                                        <Crop169Icon style={{color: "#ccc"}}/>
                                        <Typography variant="caption" style={{
                                            color: "#fff"
                                        }}>
                                            Horizontal
                                        </Typography>
                                    </Grid>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => {
                                    setCrop(Math.min(aspectRatio[0], aspectRatio[1]) / Math.max(aspectRatio[0], aspectRatio[1]));
                                }}>
                                    <Grid container direction="column" justify="center" alignItems="center"
                                          alignContent="center">
                                        <CropPortraitIcon style={{color: "#ccc"}}/>
                                        <Typography variant="caption" style={{
                                            color: "#fff"
                                        }}>
                                            Vertical
                                        </Typography>
                                    </Grid>
                                </Button>
                            </Grid>
                        </Grid>
                        : ''}

                </Container>
                <Container style={{
                    backgroundColor: '#1e1e1e',
                }}>&nbsp;</Container>
            </Dialog>

            <Dialog
                open={openAlert}
                onClose={() => {
                    setOpenAlert(false);
                }}
                PaperProps={{
                    style: {
                        padding: '20px'
                    }
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza que deseja desfazer todas as mudanças dessa foto?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenAlert(false);
                    }} color="default">
                        Não
                    </Button>
                    <Button onClick={() => {
                        dispatch(redefineImage({image, project})).then((image2) => {

                            redefineImageUrl();
                        });

                        setOpenAlert(false);

                    }} color="default" autoFocus>
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
export default ModalCropperComponent;
