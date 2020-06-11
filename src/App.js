import React from 'react';
import {Switch, Route} from "react-router-dom";
import './App.scss';
import LoginPage from './pages/login/login.page';
import HomePage from "./pages/home/home.page";

import ProjectsPage from "./pages/projects/projects.page";
import ProductPage from "./pages/products/products.page";
import EditorPage from './pages/editor/editor.page';
import ProgressBarComponent from "./components/ui/progress-bar/progressBar.component";
import {S3Upload} from "./components/s3-upload-images/upload"

function App() {
    
    return (
        <React.Fragment>

            <ProgressBarComponent/>
            <S3Upload/> 
            <Switch>
                <Route exact path='/' component={ProjectsPage}/>
                <Route exact path='/products' component={ProductPage}/>
                <Route exact path='/home' component={HomePage}/>
                <Route exact path='/login' component={LoginPage}/>
                <Route exact path='/editor' component={EditorPage}/>
            </Switch>
        </React.Fragment>

    );
}

export default App;
