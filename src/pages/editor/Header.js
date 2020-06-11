import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles/makeStyles";
import Paper from '@material-ui/core/Paper';

const styles = {
    headerOption:{
        float: 'right'
    }
};


function Header(props) {
    return(
        <Paper style={styles.paper}>
            <div style={{borderWidth: 3, borderBottom: '5px solid skyblue'}}>
                <img width={120} height={50} src={require('../../assets/image/logo.png')}/>
                <span style={{float: 'right'}}>Header options</span>
            </div>
        </Paper>
    )
}

export default Header
