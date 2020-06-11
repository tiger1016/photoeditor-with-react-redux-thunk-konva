import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PhotoFilterIcon from '@material-ui/icons/PhotoFilter';
import Header from './Header';
import ModalUploadImagesComponent from "../../components/modal-upload-images/modalUploadImages.component";
import {getProject, loadSelectedProject} from '../../slices/projectSlice';
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import PhotosEditorComponent from "../../components/photos/photo.editor.component";

import {
    minusCur,
    plusCur,
    selectImages
} from '../../components/modal-upload-images/uploadSlicer';
import { Icon } from '@material-ui/core';

import CanvasCollage from '../../components/canvas-collage/canvas-collage'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    sideMenu: {
        padding: 12
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
    icon: {
        width: 50,
        height: 50
    },
    card: {
        margin: 25,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f1acac',
        width: '80%',
        height: '80%',
        boxShadow: '10px 10px #c49d9d',
        transform: 'rotateX(7deg) rotateY(-7deg)'
    },
    cardImage: {
        position: 'relative',
        right: 0,
        top: 0
    },
    iconCss: {
        "&:hover, &:focus": {
            transform: 'scale(1.2, 1.2)'
        }
    },
    input: {
        border: 'hidden',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontSize: '32px',
        '&:focus': {
            outline: 'none'
        }
    }
}));

function Editor() {
    const classes = useStyles();
    const reduceProject = useSelector(getProject);
    const history = useHistory();
    const photos = useSelector(selectImages);

    const dispatch = useDispatch();

    React.useEffect(() => {     
        if (!reduceProject.id) {
            dispatch(loadSelectedProject()).then((project) => {
                if (project.error) {
                    history.push("/");
                }
            });
        }
    }, []);

    const onLeft = () => {
        dispatch(minusCur());
    }

    const onRight = () => {
        dispatch(plusCur());
    }

    return (
        <div className={classes.root}>
            <Header/>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={4} md={2} style={{marginTop: '20px'}}>
                    <Paper className={classes.paper}>
                        <div style={{flexDirection: 'column'}}>
                            <div className={classes.sideMenu}><PhotoFilterIcon className={classes.icon}/>Fhotos</div>
                            <div className={classes.sideMenu}><PhotoFilterIcon className={classes.icon}/>Tema</div>
                            <div className={classes.sideMenu}><PhotoFilterIcon className={classes.icon}/>Modelo</div>
                            <div className={classes.sideMenu}><PhotoFilterIcon className={classes.icon}/>Tamanho</div>
                            <div className={classes.sideMenu}><PhotoFilterIcon className={classes.icon}/>Texto</div>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={6} sm={8} md={3} style={{marginTop: '20px'}}>
                    <Paper className={classes.paper}>
                        <div>
                            <ModalUploadImagesComponent layout={'center'}/>
                            <PhotosEditorComponent/>
                        </div>
                    </Paper>
                </Grid>
                {
                    photos.length ===3 ?
                    <Grid item xs={4} sm={4} md={1} style={{margin: '40px 0px 0px 0'}}>
                        <Icon style={{fontSize: 40, color: 'grey', marginRight: '10px'}} className={classes.iconCss} onClick={onLeft}>undo</Icon>
                        <Icon style={{fontSize: 40, color: 'grey'}} className={classes.iconCss} onClick={onRight}>redo</Icon>
                    </Grid>
                    : ''
                }
                <Grid item xs={8} sm={8} md={6} style={{marginTop: '100px'}}>
                    <CanvasCollage/>
                </Grid>
            </Grid>
        </div>
    );
}

export default Editor;
