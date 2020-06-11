import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const MenuIconComponent = ({children,title,subtitle}) => {

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
                {children}
            </Grid>
            <Grid item>
                <Typography variant="subtitle2" color="textSecondary">{title}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="caption" color="textSecondary">{subtitle}</Typography>
            </Grid>
        </Grid>
    );
}
export default MenuIconComponent;
