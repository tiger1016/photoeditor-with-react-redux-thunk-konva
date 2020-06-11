import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

import {useSelector} from "react-redux";
import {getPercent, getIsloading} from "./progressBarSlice";

const ProgressBarComponent = () => {
    const _totalPercent = useSelector(getPercent);
    const _isLoading = useSelector(getIsloading);

    const ColorLinearProgress = withStyles({
        colorPrimary: {
            backgroundColor: '#bedbfc',
        },
        barColorPrimary: {
            backgroundColor: '#32BEFC',
        },
    })(LinearProgress);
    return (
        <React.Fragment>
            {
                _isLoading ?
                    <Box style={{
                        width: "100%",
                        position: "absolute",
                        top: "60px",
                        zIndex: "1300",
                        left: '0'
                    }}>
                        <ColorLinearProgress variant="determinate"  value={_totalPercent}/>
                    </Box>
                    : ''
            }
        </React.Fragment>
    );
}
export default ProgressBarComponent;
