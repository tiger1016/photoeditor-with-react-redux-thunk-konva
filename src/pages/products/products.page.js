import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";
import {Link, useHistory} from "react-router-dom";

import Logo from "../../assets/image/logo.png";
import ProductImage from "../../assets/image/fotos-premium-15x20cm-10-otm-340x202-br-cg3j.png";
import {useSelector, useDispatch} from 'react-redux';
import {setProduct, getProducts, loadActiveProducts} from '../../slices/productSlicer';
import {newProject, setActiveProject} from '../../slices/projectSlice';


const useStyles = makeStyles((theme) => ({
    button: {
        "&:hover": {
            backgroundColor: "transparent"
        }
    }
}));


const ProductPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const reduceProducts = useSelector(getProducts);

    React.useEffect(() => {
        dispatch(loadActiveProducts());
    }, []);

    function newProjectClick(product, e) {
        e.preventDefault();
        dispatch(newProject({project: product.project_template})).then((project) => {
            dispatch(setActiveProject({project: project.payload})).then(() => {
                history.push("/home");
            });
        });
    }

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
                <Grid container>
                    {
                        reduceProducts.map((product, index) => (
                            <Grid key={index} item onClick={(e) => newProjectClick(product, e)}>
                                <IconButton className={classes.button}>
                                    <Grid container direction="column" justify="center" alignItems="center">
                                        <Grid item>
                                            <Typography>{product.name}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <img src={ProductImage} alt=""/>
                                        </Grid>
                                    </Grid>
                                </IconButton>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    );
}

export default ProductPage;