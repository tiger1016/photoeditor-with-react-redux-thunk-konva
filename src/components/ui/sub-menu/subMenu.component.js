import React from "react";
import Box from "@material-ui/core/Box";
import Slide from '@material-ui/core/Slide';
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import {useSelector, useDispatch} from "react-redux";
import {getIsOpen, setClose} from "./subMenuSlicer";
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";
import {makeStyles} from "@material-ui/core/styles";

import {getCurrent,setCurrent} from "./subMenuSlicer";


const useStyles = makeStyles((theme) => ({
    button: {
        borderRadius: '0px',
        width: '100% !important',
        "&:hover": {
            backgroundColor: "#f5f5f5",
        }
    },
    MenuItem: {
        width: '100%'
    }
}));

export const Menu = ({children, title, subtitle, caption}) => {
    const classes = useStyles();

    return (
        <IconButton className={classes.button}>
            <Grid spacing={2} container alignItems="center">
                <Grid item>
                    {children}
                </Grid>
                <Grid item xs>
                    <Grid container direction="column" alignItems="baseline" justify="space-between">
                        <Typography variant="caption" color="textPrimary">{title}</Typography>
                        <Typography variant="caption">{subtitle}</Typography>
                        <Typography variant="caption" color="textPrimary">{caption}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </IconButton>
    );
}


export const PaperMenu = () => {
    const classes = useStyles();
    return (
        <Grid container direction="column" spacing={2} alignItems="center">
            <Grid item className={classes.MenuItem}>
                <Menu title="Papel Crytal Brilho" subtitle="Detalhes aqui" caption="+ R$ 0,15 por foto">
                    <WallpaperOutlinedIcon style={{fontSize: 40}}/>
                </Menu>
            </Grid>
            <Grid item className={classes.MenuItem}>
                <Menu title="Papel Crytal Brilho" subtitle="Detalhes aqui" caption="+ R$ 0,15 por foto">
                    <WallpaperOutlinedIcon style={{fontSize: 40}}/>
                </Menu>
            </Grid>
            <Grid item className={classes.MenuItem}>
                <Menu title="Papel Crytal Brilho" subtitle="Detalhes aqui" caption="+ R$ 0,15 por foto">
                    <WallpaperOutlinedIcon style={{fontSize: 40}}/>
                </Menu>
            </Grid>
        </Grid>
    );
}

const SubMenuComponent = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(getIsOpen);
    const current = useSelector(getCurrent);

    const addEvent = function (e) {
        if (!document.getElementById('subMenu').contains(e.target)
            && !document.getElementById('sideBar').contains(e.target)) {
            dispatch(setClose());
            dispatch(setCurrent(null));
            window.removeEventListener("click", addEvent);
        }
    }

    const renderMenu = () => {
        switch (current) {
            case 'paper_type':
                return <PaperMenu/>
                break;
        }
    }

    return (
        <Slide
            onEntered={() => {
                window.addEventListener("click", addEvent);
            }} direction="right" in={isOpen}>
            <Box id="subMenu" style={{
                height: 'calc(100% - 64px)',
                width: '230px',
                position: 'absolute',
                zIndex: '999',
                backgroundColor: 'white',
                marginTop: '64px',
                borderRight: '1px solid rgba(0,0,0,0.12)',
                padding: '8px'
            }}>
                {renderMenu()}
            </Box>
        </Slide>
    );

}

export default SubMenuComponent;
