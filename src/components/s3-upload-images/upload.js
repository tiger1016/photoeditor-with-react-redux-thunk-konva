import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectImages, setImages, setIsUpload} from '../modal-upload-images/uploadSlicer'
import axios from 'axios'
import {config} from './config'
import {sha256} from '../../utils/sha256'
import {ImageUploadAPI} from '../../services/db/models/imageUploadAPI';
import {ProjectAPI} from '../../services/db/models/projectAPI';
import {setPercent, setIsUploading} from "../ui/progress-bar/progressBarSlice";
const imageUploadAPI = new ImageUploadAPI(); 
const projectAPI = new ProjectAPI(); 

const msg_exit = 'Gostaria mesmo de sair desta página?';
const base_api = 'http://localhost:9025/';

let images_upload = 1;
let images_upload_length = 0;
let imgs_send = [];
let pop_exit = false;


export const S3Upload = function(){
    const dispatch = useDispatch();
    const files = useSelector(selectImages);

        React.useEffect(() => {
            

           images_upload_length = files.length;

        }, [files]);

        React.useEffect(() => {
            initUpload();
            window.onbeforeunload = function(){
                if(pop_exit){
                    return msg_exit;
                }
            };
        }, []);

      function uploadSlide(){   
        dispatch(setIsUploading());
        dispatch(setIsUpload(true));

        const percent = Math.round((images_upload / images_upload_length) * 100);
            dispatch(setPercent({'total': percent}));
            if (percent >= 100) {
                dispatch(setIsUpload(false));
                pop_exit = false;
            }else{
                pop_exit = true;
            }
            images_upload++;
        }

         function setUploadImage(imageApi,is_upload) {
            imageApi.uploaded = is_upload;
            if(is_upload){
                imageApi.blob_original = '';
            }
             imageUploadAPI.save(imageApi).catch((exception)=>{
                console.log("exception new",exception);
            });  
        }
        
         function initUpload() {
             projectAPI.getActive().then(project => {
            //    listImagesLocalDb(project.uuid);
           });        
        }
        
         function listImagesLocalDb(project_uuid) {
            const imageApi = new ImageUploadAPI();
            imageApi.listByProject(project_uuid).then(res => {
                const images_to_upload = [];
                res.each((obj) => {
                    if(!obj.uploaded){        
                        images_to_upload.push(obj);                           
                    }
                }).then(()=>{
                                
                    if(images_to_upload.length > 0){
                        images_to_upload.forEach((obj)=>{
                            uploadImageS3(obj, project_uuid);
                        });
                    }
                });
            });
        }
        
         function uploadImageS3(obj, project_uuid) {
            if(!in_array(obj.uuid, imgs_send)){
                imgs_send.push(obj.uuid);
        
                let bodyParameters = new FormData();
                bodyParameters.append('project_uuid', project_uuid);
                bodyParameters.append('file', obj.blob_original);
                bodyParameters.append('channel', 'manual');
                bodyParameters.append('hash', '123');
                bodyParameters.append('channel_uuid', obj.uuid);

                axios.post(base_api+'api/image/upload?lang=pt-br&brand_id=1', bodyParameters, config)
                .then((resp) => {
                    setUploadImage(obj,true);
                    uploadSlide();
                    console.log(resp);
                }).catch((err) => {
                    console.log(err);
                }); 

            
            }
        }
        
        function in_array(needle, haystack) {
            for(var i in haystack) {
                if(haystack[i] == needle) return true;
            }
            return false;
        }


 return [];
}




export default [S3Upload];