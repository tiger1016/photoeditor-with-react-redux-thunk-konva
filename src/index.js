import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import store from './store/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider} from '@material-ui/styles';

import {BrowserRouter} from "react-router-dom";
import theme from "./components/ui/theme"
import "./services/db/tests";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
