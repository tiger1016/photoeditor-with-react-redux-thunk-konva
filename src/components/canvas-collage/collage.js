import React, { useEffect, useState, useRef } from 'react'
import { Rect, Path } from 'react-konva'
import { UserImageX, UserImageY } from './userimage'
import UserText from './usertext'

import {ImageUploadAPI} from '../../services/db/models/imageUploadAPI';
const imageUploadAPI = new ImageUploadAPI();

const phase = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];

const Collage = ({photoes, cur, plusCur, stage, layer}) => {
  const rect = useRef();
  const path = useRef();

  const [photoList, setPhotoList] = useState([]);

  useEffect(() => {     
    setPhotoList([]);

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
  }, [photoes]);

  return (
    <>
      {
        photoList.length === 3 
        &&  
        <>
          <Rect 
            x={0}
            y={0}
            width={600}
            height={420}
            fill={'#f1acac'}
            ref={rect}
          />
          <UserImageX
            url={photoList[phase[cur][0]].url}
            x={15}
            y={15}
            width={370}
            height={150}
          />
          <UserImageX
            url={photoList[phase[cur][1]].url}
            x={15}
            y={180}
            width={370}
            height={150}
          />
          <UserImageY
            url={photoList[phase[cur][2]].url}
            x={400}
            y={15}
            width={185}
            height={315}
          />
          <Path
            data={'M0, 420L20, 440L620, 440L620, 20L600, 0L600, 420L0, 420'}
            fill={'#C49D9D'}
            ref={path}
          />
          <UserText 
            text="Write here to text"
            fontSize={30}
            x={15}
            y={370}
            width={570}
            height={90}
            align={'center'}
            wrap={'char'}
            stage={stage}
            layer={layer}
          />
        </>
      }
    </>
    )
}


export default Collage;