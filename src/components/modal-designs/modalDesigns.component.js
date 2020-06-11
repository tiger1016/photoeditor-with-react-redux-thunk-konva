import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TextField from '@material-ui/core/TextField';


import Logo from '../../assets/image/logo.png';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalDesignsComponent = ({modalOpen}) => {
    const [open, setOpen] = React.useState(modalOpen);

    return (
        <Dialog
            fullScreen aria-labelledby="modal-designs"
            TransitionComponent={Transition}
            open={open} onClose={() => {
            setOpen(false);
        }}>
            <Toolbar style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #ccc"
            }}>
                <img src={Logo} alt="" width="100"/>
                <IconButton edge="end" color="inherit" onClick={() => {
                    setOpen(false);
                }} aria-label="close">
                    <Typography color="textSecondary" variant="body1">Pular</Typography>
                </IconButton>
            </Toolbar>

            <Container>
                <Box mt={4} display="flex" alignItems="center" justifyContent="space-between">
                    <Grid item xs={8}>
                        <Typography color="textSecondary" align="center" variant="h6">Escolha o design</Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <form noValidate autoComplete="off">
                            <TextField fullWidth id="search_design" label="Procure o design" variant="outlined"/>
                        </form>
                    </Grid>
                </Box>

                <Box mt={4}>
                    <Typography color="textSecondary" color="textSecondary" variant="subtitle1">Só fotos</Typography>
                    <Box component="div" display="block">
                        <Grid container spacing={2}>
                            {
                                [...Array(6)].map((el,index) => (
                                    <Grid key={index} item xs={2}>
                                        <Box style={{
                                            width: "100%",
                                            height: "120px",
                                            backgroundColor: "#999"
                                        }}></Box>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                </Box>

                <Box mt={4}>
                    <Typography color="textSecondary" variant="subtitle1">Fotos e texto</Typography>
                    <Box component="div" display="block">
                        <Grid container spacing={2}>
                            {
                                [...Array(6)].map((el,index) => (
                                    <Grid key={index} item xs={2}>
                                        <Box style={{
                                            width: "100%",
                                            height: "120px",
                                            backgroundColor: "#999"
                                        }}></Box>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                </Box>


                <Box mt={4}>
                    <Typography color="textSecondary" variant="subtitle1">Aniversário</Typography>
                    <Box component="div" display="block">
                        <Grid container spacing={2}>
                            {
                                [...Array(6)].map((el,index) => (
                                    <Grid key={index} item xs={2}>
                                        <Box style={{
                                            width: "100%",
                                            height: "120px",
                                            backgroundColor: "#999"
                                        }}></Box>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                </Box>

            </Container>

        </Dialog>
    );
}

export default ModalDesignsComponent;
