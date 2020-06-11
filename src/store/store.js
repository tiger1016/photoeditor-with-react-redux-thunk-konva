import {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit';

import uploadReducer from '../components/modal-upload-images/uploadSlicer';
import editImageReducer from '../slices/editImageSlicer';
import modalReviewPhotosSlice from '../components/modal-review-photos/modalReviewPhotosSilice';
import modalValesSlice from '../components/modal-vales/modalValesSlice';
import modalUpsellSlice from '../components/modal-upsell/modalUpsellSlice';
import progressBarSlice from '../components/ui/progress-bar/progressBarSlice';
import subMenuSlice from '../components/ui/sub-menu/subMenuSlicer';
import projectReducer from '../slices/projectSlice';
import productReducer from '../slices/productSlicer';
/*
logger,
const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}
*/

const crashReporter = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        console.error('Caught an exception!', err)
       /* Raven.captureException(err, {
        extra: {
            action,
            state: store.getState()
        }
        })*/
        throw err
    }
}

export default configureStore({
    reducer: {
        upload: uploadReducer,
        editImage: editImageReducer,
        review: modalReviewPhotosSlice,
        vales: modalValesSlice,
        upsell: modalUpsellSlice,
        progressBar: progressBarSlice,
        subMenu: subMenuSlice,
        project: projectReducer,
        product: productReducer,
    }
    // middleware: [...getDefaultMiddleware(), crashReporter]
});
