import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import {Link, useHistory} from "react-router-dom";

import Logo from "../../assets/image/logo.png";
import ProductImage from "../../assets/image/fotos-premium-15x20cm-10-otm-340x202-br-cg3j.png";

import {useSelector, useDispatch} from 'react-redux';
//import {setProduct, getProducts,loadActiveProducts} from '../../slices/productSlicer';
import {newProject, setActiveProject, loadActiveProjects, getProjects} from '../../slices/projectSlice';
import {ImageUploadAPI} from '../../services/db/models/imageUploadAPI';

import ProductPage from "../products/products.page";

const useStyles = makeStyles((theme) => ({
    button: {
        "&:hover": {
            backgroundColor: "transparent"
        }
    }
}));

const ProjectPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const reduceProjects = useSelector(getProjects);
    const [images, setImages] = React.useState([]);

    React.useEffect(() => {
        dispatch(loadActiveProjects());
        // getImage(reduceProjects[0].uuid);
    }, []);


    function newProject(e) {
        history.push("/products");
    }

    function openProject(project) {
        dispatch(setActiveProject({project: project})).then(() => {
            history.push("/home");
        });

    }

    const getImage = (id) => {
        const imageApi = new ImageUploadAPI();
        let _images = [];
        imageApi.listByProject(id).then(res => {
            _images[id] = [];
            res.offset(3).each((el, index) => {
                _images[id].push(el);
            });
            setImages(_images);
        });
    }

    React.useEffect(() => {
        reduceProjects.map(el => {
            getImage(el.uuid);
        })
    }, [reduceProjects]);
    return (
        <Box>
            <AppBar position="absolute" elevation={0} style={{
                borderBottom: '1px solid #ccc'
            }}>
                <Toolbar>
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        <img src={Logo} alt="" width="100"/>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box mt={10}>


                <ProductPage/>

                {/*<Button variant="contained" color="primary" onClick={(e) => newProject(e)}>New</Button>*/}

                <hr/>

                <Grid container>

                    {
                        reduceProjects.map((project, index) => (
                            <Grid key={index} item>
                                <Link to="">
                                    <IconButton className={classes.button}>
                                        <Grid container direction="column" justify="center" alignItems="center">
                                            <Grid item onClick={(e) => openProject(project)}>
                                                <Typography>{project.title}</Typography>
                                            </Grid>
                                            <Grid item>
                                                {
                                                    console.log(images)
                                                    // images[project.uuid].map((el, index) => (
                                                    //     <img key={index} src={el.base64_original} width={120} alt=""/>
                                                    // ))
                                                }
                                            </Grid>
                                        </Grid>
                                    </IconButton>
                                </Link>

                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    );
}

export default ProjectPage;
