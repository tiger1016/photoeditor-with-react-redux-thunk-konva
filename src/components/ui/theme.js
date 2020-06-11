import orange from '@material-ui/core/colors/orange';
import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: "#fff",
            dark: "#fff",
            contrastText: '#999',
        },
        secondary: {
            light: '#ff7961',
            main: '#FB9F01',
            dark: '#ba000d',
            contrastText: '#FFF',
        },
    },
    typography : {
        allVariants : {
            fontFamily: "Roboto', sans-serif",
        }
    }
});

export default theme;
