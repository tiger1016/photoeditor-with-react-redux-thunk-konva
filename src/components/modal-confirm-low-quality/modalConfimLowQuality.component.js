import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";

import {useDispatch, useSelector} from "react-redux";
import {openModalReview} from "../modal-review-photos/modalReviewPhotosSilice";
import {openModalVales} from "../modal-vales/modalValesSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalConfirmLowQualityComponent = ({closeAlert}) => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleNext = () => {
        closeAlert();
        setOpen(false);
        dispatch(openModalVales());
    }

    return (
        <React.Fragment>
            <Button
                style={{
                    width: '300px',
                    padding: '15px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    color: '#31bfff',
                }}
                onClick={() => setOpen(true)}>Continuar sem revisão</Button>
            <Dialog
                PaperProps={{
                    style: {
                        minHeight: '400px'
                    }
                }}
                fullWidth maxWidth="md" aria-labelledby="simple-dialog-title"
                TransitionComponent={Transition}
                open={open} onClose={() => {
                setOpen(false);
            }}>
                <Container style={{
                    minHeight: '500px'
                }}>
                    <Grid style={{
                        minHeight: '500px'
                    }} p={4} spacing={2} container direction="column" justify="center" alignItems="center" alignContent="center">
                        <Grid item>
                            <Box width={1/2} style={{
                                textAlign: "center",
                                margin: 'auto'
                            }}>
                                <Typography variant="body1" align="center">
                                    As fotos com qualidade baixa identificadas podem não ter uma boa impressão.
                                    Essas fotos não podem ser trocadas mesmo se a impressão estiver ruim.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Button
                                style={{
                                    width: '300px',
                                    padding: '15px',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    color: '#31bfff',
                                }}
                                onClick={() => {
                                    setOpen(false);
                                    closeAlert();
                                    dispatch(openModalReview());
                                }}
                            > Revisar fotos identificadas</Button>
                        </Grid>
                        <Grid item>
                            <Button
                                style={{
                                    width: '300px',
                                    padding: '15px',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    color: '#31bfff',
                                }}
                                onClick={handleNext}
                            > Aceitar e avançar</Button>
                        </Grid>
                    </Grid>
                </Container>
            </Dialog>
        </React.Fragment>
    );

}
export default ModalConfirmLowQualityComponent;
