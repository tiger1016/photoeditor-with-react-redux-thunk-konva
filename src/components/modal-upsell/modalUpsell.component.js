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
import {selectIsOpen, closeModalUpsell} from './modalUpsellSlice';
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
const ModalUpsellComponent = () => {
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
                dispatch(closeModalUpsell());
            }}>
            <AppBar elevation={0} className={classes.appBar}>
                <Toolbar>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button>Pular Ofertas</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Container style={{
                height: '100%',
                padding: '20px',
            }}>
                <Box display="flex" justifyContent="space-around" alignItems="center" flexDirection="column"
                     style={{
                         height: '100%',
                     }}>
                    <Container
                        style={{
                            maxWidth: '80%'
                        }}
                    >
                        <Typography variant="body1" align="center">
                            Gostaria de fazer o upgrade para Foto Premium(Diamond)
                        </Typography>
                            <ul>
                                <li>Papel profissional</li>
                                <li>Gramatura? 250/m2</li>
                                <li>Cores mais vibrantes</li>
                                <li>Disponível em brilho ou fosco</li>
                            </ul>
                        <Typography variant="body1" align="center" color="textSecondary">
                            R$ 0,15 a mais por foto
                        </Typography>
                    </Container>
                    <Box>
                        <Button
                            onClick={() => {
                                dispatch(closeModalUpsell());
                                dispatch(setModalOpen());
                            }}
                        > Sim, eu quero </Button>
                        <Button
                            onClick={() => {
                                dispatch(closeModalUpsell());
                                dispatch(setModalOpen());
                            }}
                        > Não, Obrigado</Button>
                    </Box>
                </Box>
            </Container>
        </Dialog>
    );
}
export default ModalUpsellComponent;
