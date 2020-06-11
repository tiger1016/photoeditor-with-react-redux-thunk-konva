import React from "react";
import Box from "@material-ui/core/Box";
import {ImageUploadAPI} from '../../services/db/models/imageUploadAPI';

const imageUploadAPI = new ImageUploadAPI();

const ImageLoader = ({image_uuid,modified}) => {
        
    const [imgurl, setImgurl] = React.useState(null);


    React.useEffect(() => {        
        if(image_uuid){
            imageUploadAPI.getImageByUUID(image_uuid).then((image_db)=>{
                setImgurl(URL.createObjectURL(image_db.modified?image_db.blob_thumb_modified:image_db.blob_thumb));
            });
        }
        
    }, [image_uuid,modified]);

    return (

        <React.Fragment> 
            
            <Box                
                style={{
                    cursor: "pointer",
                    width: "100%",
                    minHeight: "140px",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    position: "relative",
                    backgroundImage:`url(${imgurl})`
                }}>                    
                    
                </Box> 

        </React.Fragment>
    );
}

export default ImageLoader;
