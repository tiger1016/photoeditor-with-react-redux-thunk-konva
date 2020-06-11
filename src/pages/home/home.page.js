import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import SubMenuComponent from "../../components/ui/sub-menu/subMenu.component";

import {useHistory} from "react-router-dom";

import ListItems from '../../components/sidebar/listItems.component';

import {useSelector, useDispatch} from 'react-redux';
import {
    selectImages,
    selectImagesPoorQuality,
    setModalOpen,
    selectDiscarded,
} from '../../components/modal-upload-images/uploadSlicer';
import {openModalReUpload} from "../../components/modal-review-photos/modalReviewPhotosSilice";


import ModalUploadImagesComponent from "../../components/modal-upload-images/modalUploadImages.component";
import ModalAlertLowQuality from "../../components/modal-alert-low-quality/modalAlertLowQuality.component";
import ModalDesignsComponent from "../../components/modal-designs/modalDesigns.component";
import ModalReviewPhotosComponent from "../../components/modal-review-photos/modalReviewPhotos.component";
import ModalValesComponent from "../../components/modal-vales/modalVales.component";
import ModalUpsellComponent from "../../components/modal-upsell/modalUpsell.component";

import PhotosComponent from "../../components/photos/photos.component";

import Logo from '../../assets/image/logo.png';

import {getProject, loadSelectedProject} from '../../slices/projectSlice';

const drawerWidth = 140;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8px 0 20px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        marginTop: '15px'
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(0),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflowZ: 'hidden',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    secondNav: {
        position: 'fixed',
        height: document.documentElement.scrollHeight - theme.mixins.toolbar.minHeight,
        margin: 0,
        padding: 0,
        overflowY: 'scroll'
    },
    containerContent: {
        padding: '20px'
    },
    buttonPhooto: {
        backgroundColor: 'rgb(250,122,97)',
        background: 'linear-gradient(55deg, rgba(250,122,97,1) 0%, rgba(251,166,22,1) 100%)',
        color: 'white',
        padding: '10px',
        paddingLeft: '20px',
        paddingRight: '20px'
    }
}));

const HomePage = () => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const reduceImages = useSelector(selectImages);
    const totalDiscarded = useSelector(selectDiscarded);
    const poorQuality = useSelector(selectImagesPoorQuality);
    const reduceProject = useSelector(getProject);
    console.log(reduceProject);
    const [open, setOpen] = React.useState(true);
    const [openModalQuality, setOpenModalQuality] = React.useState(false);

    React.useEffect(() => {
        if (!reduceProject.id) {
            dispatch(loadSelectedProject()).then((project) => {
                if (project.error) {
                    history.push("/");
                }
            });
        }
        dispatch(setModalOpen());
    }, []);

    const handleNextStep = () => {
        const _getTotalPoorQuality = poorQuality.filter(el => el.isKeeping === false);
        console.log('_getTotalPoorQuality', _getTotalPoorQuality.length);
        if (_getTotalPoorQuality.length > 0) {
            setOpenModalQuality(true);
        } else if (totalDiscarded > 0) {
            dispatch(openModalReUpload());
        }
    }
    const handleCloseModalAlertLowQuality = () => {
        setOpenModalQuality(false);
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // React.useEffect(() => {
    //     document.body.addEventListener('dragover', function (e) {
    //         e.preventDefault();
    //         console.log('dragover');
    //         console.log(e.dataTransfer);
    //         console.log(e.dataTransfer.files);
    //         return false;
    //     }, false);
    //
    //     document.body.addEventListener('dragleave', function (e) {
    //         e.preventDefault();
    //         console.log('dragleave');
    //         console.log(e.dataTransfer.files);
    //
    //         return false;
    //     }, false);
    //
    //     document.body.addEventListener('drop', function (e) {
    //         e.preventDefault();
    //         console.log('drop');
    //         console.log(e.dataTransfer.files);
    //
    //         return false;
    //     }, false);
    //
    // }, []);

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>

            <CssBaseline/>
            <AppBar elevation={0} className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>

                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        <img src={Logo} alt="" width="120"/>
                    </Typography>

                    {reduceImages.length > 0 ?
                        <React.Fragment>
                            <Typography noWrap className={classes.title}>{reduceImages.length} Fotos</Typography>
                            <Button
                                className={classes.buttonPhooto}
                                onClick={handleNextStep}
                            >Avançar</Button>
                        </React.Fragment>
                        : ''
                    }
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                {reduceProject.type_product === 'photos' ?
                    <React.Fragment>
                        <List>
                            <ListItems />
                        </List>
                    </React.Fragment>
                    : ''
                    }
                    {/*<Divider/>*/}
                    {/*<List>{secondaryListItems}</List>*/}
            </Drawer>

            <main className={classes.content}>

                <SubMenuComponent/>

                <div className={classes.appBarSpacer}/>
                <Paper elevation={0}>
                    <Box className={classes.containerContent}>
                        <PhotosComponent/>
                        <ModalUploadImagesComponent/>
                    </Box>
                </Paper>
            </main>

            <ModalDesignsComponent modalOpen={false}/>
            <ModalAlertLowQuality
                openModal={openModalQuality}
                handleClose={handleCloseModalAlertLowQuality}/>

            <ModalReviewPhotosComponent/>
            <ModalValesComponent/>
            <ModalUpsellComponent/>

            
        </div>
    );
}

export default HomePage;
