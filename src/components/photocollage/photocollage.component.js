import React from 'react'
import Grid from "@material-ui/core/Grid";
import { useSelector } from 'react-redux';


import { selectImages, selectCur } from '../modal-upload-images/uploadSlicer'
import { makeStyles } from '@material-ui/core/styles';

import {ImageUploadAPI} from '../../services/db/models/imageUploadAPI';

const imageUploadAPI = new ImageUploadAPI();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridList: {
    width: 500,
    height: 530,
  },
}));

const phase = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];

const PhotoCollage = () => {
  const photoes = useSelector(selectImages);
  const [photoList, setPhotoList] = React.useState([]);

  const cur = useSelector(selectCur);

  React.useEffect(() => {     
    photoes.map((photo, index) => {
      const image_uuid = photo.image_meta.image_uuid;
      if(image_uuid){
        imageUploadAPI.getImageByUUID(image_uuid).then((image_db)=> {
            setPhotoList(photoList => [...photoList, 
              {
                url: (URL.createObjectURL(image_db.modified?image_db.blob_thumb_modified:image_db.blob_thumb)),
                title: 'image'
              }
            ]);
        });
      }
    })
  }, []);

  return <div>
    {
      photoList.length === 3 
      &&
      <Grid container>
        <Grid item xs={8} style={{marginTop: '10px'}}>
          <Grid item xs={12}>
            <img src={photoList[phase[cur][0]].url} alt={photoList[phase[cur][0]].title} style={{width: '100%', height: '160px', objectFit: "cover"}}/>
          </Grid>
          <Grid item xs={12} style={{marginTop: '5px'}}>
            <img src={photoList[phase[cur][1]].url}  alt={photoList[phase[cur][1]].title} style={{width: '100%', height: '160px', objectFit: "cover"}} />
          </Grid>
        </Grid>
        <Grid item xs={4} item style={{marginTop: '10px', paddingLeft: '10px'}}>
          <Grid item xs={12}>
            <img src={photoList[phase[cur][2]].url}  alt={photoList[phase[cur][2]].title} style={{width: '100%', height: '330px', objectFit: "cover"}} />
          </Grid>
        </Grid>
      </Grid>
    }
  </div>
}


export default PhotoCollage;