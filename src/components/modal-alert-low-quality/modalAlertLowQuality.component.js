import React, {useEffect} from "react";
import Dialog from '@material-ui/core/Dialog';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import ModalConfirmLowQualityComponent from "../modal-confirm-low-quality/modalConfimLowQuality.component";

import {useSelector, useDispatch} from 'react-redux';
import { selectImagesPoorQuality} from '../../components/modal-upload-images/uploadSlicer';
import {openModalReview} from "../modal-review-photos/modalReviewPhotosSilice";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {closeModalVales} from "../modal-vales/modalValesSlice";
import {openModalUpsell} from "../modal-upsell/modalUpsellSlice";
import {makeStyles} from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
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
const ModalAlertLowQuality = ({openModal, handleClose}) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const poorQuality = useSelector(selectImagesPoorQuality);
    const dispatch = useDispatch();

    const handleReviewPhotos = () => {
        handleClose();
        dispatch(openModalReview());
    }

    React.useEffect(() => {
        setOpen(openModal);
    }, [openModal])

    return (
        <React.Fragment>
            <Dialog fullWidth maxWidth="md" aria-labelledby="simple-dialog-title"
                    TransitionComponent={Transition}
                    open={open}
                    onClose={handleClose}>
                <AppBar elevation={0} className={classes.appBar}>
                    <Toolbar>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={() => {
                                    handleClose();
                                }}>Voltar</Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                    <Box p={4}
                    style={{
                        minHeight: '400px',
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center"
                    }}
                    >

                        <Box mb={4}>
                            <Typography align="center">
                                Identificamos {poorQuality.length} fotos com qualidade baixa. O que deseja fazer?
                            </Typography>
                        </Box>
                        <Grid container direction="column" spacing={2} alignItems="center" alignContent="center">
                            <Grid item>
                                <Button
                                    style={{
                                        width: '300px',
                                        padding: '15px',
                                        border: '1px solid rgba(0,0,0,0.1)',
                                        color: '#31bfff',
                                    }}
                                    onClick={handleReviewPhotos}>Revisar fotos identificadas</Button>
                            </Grid>
                            <Grid item>
                                <ModalConfirmLowQualityComponent closeAlert={handleClose} />
                            </Grid>
                        </Grid>
                    </Box>
            </Dialog>
        </React.Fragment>
    )
}

export default ModalAlertLowQuality;
