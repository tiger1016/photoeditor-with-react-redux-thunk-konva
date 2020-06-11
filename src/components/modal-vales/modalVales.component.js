import React from 'react';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles';

import {useDispatch, useSelector} from "react-redux";
import {selectIsOpen, closeModalVales} from './modalValesSlice';
import {openModalUpsell} from "../modal-upsell/modalUpsellSlice";
import {setModalOpen} from "../modal-upload-images/uploadSlicer";

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
const ModalValesComponent = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isOpen = useSelector(selectIsOpen);
    return (
        <Dialog
            PaperProps={{
                style: {
                    maxHeight: '400px',
                    height: '400px'
                }
            }}
            fullWidth maxWidth="md" aria-labelledby="simple-dialog-title"
            TransitionComponent={Transition}
            open={isOpen}
            onClose={() => {
            }}>
            <AppBar elevation={0} className={classes.appBar}>
                <Toolbar>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={() => {
                                dispatch(closeModalVales());
                                dispatch(openModalUpsell());

                            }}>Pular</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Container style={{
                height: '100%',
                padding: '20px',
            }}>
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column"
                     style={{
                         height: '100%',
                     }}>
                    <Container
                        style={{
                            maxWidth: '80%'
                        }}
                    >
                        <Typography variant="body1" align="center">
                            Seu vale possui 101 fotos e voce adicionou 12 fotos. Deseja adicionar mais
                            89 fotos ou avançar? Você não podrá adicionar mais fotos nesse pedido.
                        </Typography>
                    </Container>
                    <Box mt={2}>
                        <Button
                            style={{
                                backgroundColor: '#31BFFF',
                                color: 'white',
                                padding: '10px',
                                width: '300px'
                            }}
                            onClick={() => {
                                dispatch(closeModalVales());
                                dispatch(setModalOpen());
                            }}
                        > <Typography variant="caption">Fazer upload</Typography> </Button>
                    </Box>
                </Box>
            </Container>
        </Dialog>
    );
}
export default ModalValesComponent;
