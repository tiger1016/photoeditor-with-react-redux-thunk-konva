import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";

import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import {useDispatch} from 'react-redux';

import {updateImage, redefineImage} from "../modal-upload-images/uploadSlicer";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalEditImageComponent = ({isOpen, handleClose, image}) => {
    const [open, setOpen] = React.useState(isOpen);
    const [editImage, setEditImage] = React.useState(image || null);
    const [imageUrl, setImageUrl] = React.useState(null);
    const editorRef = React.createRef();
    const dispatch = useDispatch();

    React.useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    React.useEffect(() => {

        imageUploadAPI.getImageByUUID(image_uuid).then((image_db)=>{                        
            
            setImageUrl(URL.createObjectURL(image_db.modified?image_db.blob_thumb_modified:image_db.blob_thumb));

            console.log(image_db);
            setEditImage(image);
        });
      


    }, [image]);

    const saveImage = () => {
        

        const editorInstance = editorRef.current.getInstance();
        console.log("editImage",editImage);
        dispatch(updateImage({index: editImage.index, modified: editorInstance.toDataURL()}));
        handleClose();
    }

    return (
        <React.Fragment>
            <Dialog
                PaperProps={{
                    style: {
                        minHeight: '400px'
                    }
                }}
                fullWidth maxWidth="md" aria-labelledby="simple-dialog-title"
                TransitionComponent={Transition}
                open={open}
                onRendered={() => {
                    const editorInstance = editorRef.current.getInstance();
                    document.querySelector('.tie-btn-reset')
                        .addEventListener('click', function (e) {
                            let a = dispatch(redefineImage(editImage));
                            editorInstance.loadImageFromURL(a.payload.original, a.payload.index.toString()).then(result => {
                                editorInstance.ui.resizeEditor();
                            });
                        });
                }}
                onClose={handleClose}>
                <Container
                    style={{
                        backgroundColor: '#1e1e1e',
                        padding: '10px'
                    }}>
                    <Grid container direction="row" justify="flex-end" spacing={2}>
                        <Grid item>
                            <Button>
                                <Typography style={{
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
                                <Typography>Salvar</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
                <ImageEditor
                    ref={editorRef}
                    includeUI={{
                        loadImage: { 
                            path: imageUrl?imageUrl:null,
                            name: editImage?.index.toString()
                        },
                        menu: ['crop', 'rotate'],
                        initMenu: null,
                        uiSize: {
                            width: '100%',
                            height: '650px'
                        },
                        menuBarPosition: 'bottom'
                    }}
                    onObjectRotated={(resp) => {
                        console.log(resp);
                    }}
                    cssMaxHeight={500}
                    cssMaxWidth={700}
                    selectionStyle={{
                        cornerSize: 0,
                        rotatingPointOffset: 70
                    }}
                />
            </Dialog>
        </React.Fragment>
    );
}
export default ModalEditImageComponent;
