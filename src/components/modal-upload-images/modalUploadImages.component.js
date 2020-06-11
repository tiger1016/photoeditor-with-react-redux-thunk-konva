import React from "react";
import {v4 as uuidv4} from 'uuid';
import {resizeImage} from '../../utils/utils_new';

import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';
import Container from "@material-ui/core/Container";
import AddIcon from '@material-ui/icons/Add';

import {ReactComponent as GooglePhotosIcon} from "../../assets/image/google_photos.svg";
import {ReactComponent as FacebookIcon} from "../../assets/image/facebook.svg";
import {ReactComponent as InstagramIcon} from "../../assets/image/instagram.svg";
import {ReactComponent as DropBoxIcon} from "../../assets/image/dropbox.svg";
import {ReactComponent as MyComputerIcon} from "../../assets/image/computador-portatil.svg";

import {useSelector, useDispatch} from 'react-redux';
import {
    selectImages,
    setImage,
    selectIsOpen,
    setModalClose,
    setModalOpen,
    setIsUpload,
    plusCur,
    increment,
    decrement
} from './uploadSlicer';
import {setPercent, setIsUploading} from "../ui/progress-bar/progressBarSlice";
import {getProject} from "../../slices/projectSlice";

import {ProjectAPI} from '../../services/db/models/projectAPI';


const projectAPI = new ProjectAPI();


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        borderBottom: '1px solid #ccc'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalUploadImagesComponent = ({layout}) => {
    const classes = useStyles();
    const modalIsOpen = useSelector(selectIsOpen);
    const dispatch = useDispatch();
    const project = useSelector(getProject);
    const photos = useSelector(selectImages);

    const handleClose = () => {
        dispatch(setModalClose());
    };

    const handleSelectImages = (event) => {
        handleClose();
        console.time("event.target.files");
        let files = event.target.files;
        console.timeLog("event.target.files");
        let _uploaded = 1;
        dispatch(setIsUploading());
        dispatch(setIsUpload(true));



        const files_arr = Array.from(files);

        // Resize & convert to blob
        
        console.time("resize");
        console.timeLog("resize","init");
        /*
        console.time("create_promises");
        
        console.time("db");


        var worker = new Worker('task.js');

        worker.addEventListener('message', function(e) {
            console.log('Worker said: ', e.data);
        }, false);
        
        
        worker.postMessage(URL.createObjectURL(files_arr[0]));
        */
        /*
        
        
        let img = new Image();
        img.src = URL.createObjectURL(files_arr[0]);
        img.onload = function () {
            console.timeLog("resize","ONLOAD");

            URL.revokeObjectURL(img.src);
            worker.postMessage("PROCESS IMAGE"); // Send data to our worker.                    
        }
        */
        
       
        
        
        const handlefiles = (_files_arr)=>{
            const images = [];
            const files_arr_20 = _files_arr.splice(0,20);
            console.log(files_arr_20);
            files_arr_20.forEach((el, index) => {
                images.push(resizeImage(el, project.min_resize.width, project.min_resize.height));
                console.timeLog("create_promises");
    
            });
            
            const new_items = [];
            
            Promise.all(images).then((images_resized)=>{                            
               
               projectAPI.get(project.id).then((updated_project)=>{
                
                    projectAPI.addItemV4(updated_project,images_resized).then((resp_add_item)=>{
                        updated_project = resp_add_item.updated_project
    
                        const percent = Math.round((_uploaded / files.length) * 100);
                        dispatch(setPercent({'total': percent}));
                        _uploaded += 1;
                            
                        projectAPI.save(updated_project).catch((error) => {
                            console.log("error_project", error);
                        }).then(()=>{
                            
                        }); 
                        
                        dispatch(setImage(resp_add_item.new_items));
                        if (percent === 100) {
                            dispatch(setIsUpload(false));
                        }

                        if(_files_arr.length > 0){
                            console.log("SET TIMEOUT",_files_arr.length);
                            setTimeout(()=>handlefiles(_files_arr),1000);                            
                        }

                        if (photos.length + images.length === 3 && images.length !== 3) {
                            dispatch(increment({item: photos[0], project}));
                            dispatch(decrement({item: photos[0], project}));
                        }

                        console.timeLog("resize","end");
        
                    });
                
                });
            });
        }

        handlefiles(files_arr);        
        
    }

    return (
        <Box>
            <Box display="flex" justifyContent={layout? layout: 'flex-end'} p={2}>
                <Button
                    style={{
                        backgroundColor: '#31BFFF',
                        color: 'white',
                        border: '1px solid #31BFFF',
                        borderRadius: "50px",
                        marginBottom: layout? '40px' : '0px',
                        padding: '10px 30px 10px 30px',
                        boxShadow: '0px 5px 5px 0px rgba(153,153,153,1)'
                    }}
                    onClick={() => dispatch(setModalOpen())}
                ><AddIcon/> Adicionar fotos
                </Button>
            </Box>
            
            <Dialog style={{
                margin: '80px 40px 0 40px'
            }}
                    PaperProps={{
                        style: {
                            maxHeight: '800px',
                            height: '800px'
                        }
                    }}
                    fullWidth maxWidth="lg"
                    open={modalIsOpen} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar elevation={0} className={classes.appBar}>
                    <Toolbar>

                        <Box
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                            <Box style={{
                                width: '40%',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <MyComputerIcon width={35}/>
                                <GooglePhotosIcon width={35}/>
                                <FacebookIcon width={35}/>
                                <InstagramIcon width={35}/>
                                <DropBoxIcon width={35}/>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container style={{
                    height: '100%',
                    padding: '20px',
                }}>
                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column"
                         style={{
                             height: '100%',
                             border: '2px dotted #ccc'
                         }}
                    >
                        <MyComputerIcon width={80}/>
                        <Typography variant="h5" color="textSecondary">Computador</Typography>
                        <Box mt={2}>
                            <Typography>Adicione suas fotos favoritas do seu computador</Typography>
                        </Box>
                        <Box mt={2}>
                            <Button
                                onClick={() => {
                                    document.getElementById('search_photos').click();
                                }}
                                style={{
                                    backgroundColor: '#31BFFF',
                                    color: 'white',
                                    padding: '10px',
                                    width: '300px'
                                }}
                            ><Typography variant="caption">Selecionar Fotos</Typography></Button>
                            <input
                                accept="image/x-png,image/gif,image/jpeg,image/heic"
                                id="search_photos"
                                style={{
                                    display: 'none'
                                }} type="file" multiple={true} onChange={handleSelectImages}/>
                        </Box>
                        <Box mt={2}>
                            <Typography>ou</Typography>
                        </Box>
                        <Box mt={2}>
                            <Typography>Arraste aqui suas fotos</Typography>
                        </Box>
                    </Box>
                </Container>
            </Dialog>
        </Box>
    );
}


export default ModalUploadImagesComponent;