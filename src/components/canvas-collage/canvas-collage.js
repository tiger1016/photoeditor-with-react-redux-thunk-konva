import React, { useRef, useEffect, useContext, createContext, useState } from 'react'
import Konvas from 'konva'
import { Stage, Layer } from 'react-konva'

import {
  selectImages,
  selectCur,
  clearImages, loadImageFromProject, plusCur,
} from '../../components/modal-upload-images/uploadSlicer';
import {getProject} from "../../slices/projectSlice";
import {useSelector, useDispatch} from 'react-redux';
import Collage from './collage'

// const AppContext = createContext(null);
// const useAppContext = () => useContext(AppContext);

const App = () => {
  const project = useSelector(getProject);
  const photoes = useSelector(selectImages);
  const cur = useSelector(selectCur);
  
  const stage = useRef();
  const layer = useRef();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (project.id) {
  //       dispatch(clearImages());
  //       dispatch(loadImageFromProject({project}));
  //   }
  // }, [project.uuid]);
  
  const plusCur = () => {
    dispatch(plusCur);
  }

  return (
      <Stage ref={stage} width={window.innerWidth} height={window.innerHeight}>
        <Layer ref={layer}>
          <Collage photoes={photoes} cur={cur} plusCur={() => plusCur} stage={stage} layer={layer}/>
        </Layer>
      </Stage>
  )
}

export default App;