import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectImages, setImages} from '../modal-upload-images/uploadSlicer'
import axios from 'axios'
import {config} from './config'
import {sha256} from '../../utils/sha256'


export const S3Download = function(){
    const dispatch = useDispatch();

    React.useEffect(() => {  // fazer a verificação se esta online e pegar img original
        if(!localStorage.getItem('images_db')) return;
        
        let fill_images = JSON.parse(localStorage.getItem('images_db'));
        Array.from(fill_images).map((file) => {
            dispatch(setImages(file));
        });
    }, []);

}

export default [S3Download];