import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ProjectAPI} from '../../services/db/models/projectAPI';
import {ImageUploadAPI} from '../../services/db/models/imageUploadAPI';
import {v4 as uuidv4} from 'uuid';

const imageUploadAPI = new ImageUploadAPI();
const projectAPI = new ProjectAPI();


export const setImages = createAsyncThunk(
    'project/setImages',
    async (payload, thunkAPI) => {
        /*
        const project = await projectAPI.get(payload.project.id);

        const json_image = {
            "project_uuid": project.uuid,
            "blob_original": payload.image.source_medium.blob,
            "blob_medium": payload.image.source_medium.blob,
            "blob_medium_modified": null,
            "blob_thumb": payload.image.source_thumb.blob,
            "blob_thumb_modified": null,            
            "modified":false,
            "uploaded": false
        };

        const image_upload = await imageUploadAPI.new(json_image).catch((exception) => {
            console.log("exception new", exception);
        });

        const container_uuid = uuidv4();
        const container = {
            "uuid": container_uuid,
            "background": {
                "type": "color",
                "color": "#000000",
                "url": ""
            },
            "width": 15,
            "height": 19,
            "radius": 0,
            "margins": {
                "left": 0,
                "right": 0,
                "top": 0,
                "bottom": 0
            },
            "cover": 0,
            "items": []
        };


        const new_item = {
            "container_uuid": container_uuid,
            "uuid": uuidv4(),
            "quantity": 1,
            'modified': null,
            'isKeeping': false,
            "width": payload.image.source_medium.width,
            "height": payload.image.source_medium.height,
            "quality": payload.image.source_medium.quality,
            "x": 0,
            "y": 0,
            "rotation": 0,
            "type": "image",
            "image_meta": {
                "image_uuid": image_upload.uuid,
                "transformation_data": []
            },
            "border": {
                "size": {
                    "left": 0,
                    "right": 0,
                    "top": 0,
                    "bottom": 0
                },
                "color": "#FFF",
                "radius": ""
            }
        }

        container.items.push(new_item);

        const updated_project = projectAPI.addContainer(project, container);

        await projectAPI.save(updated_project).catch((error) => {
            console.log("error_project", error);
        });
        */

        //return new_item
    },
)


//TODO: add pagination
export const loadImageFromProject = createAsyncThunk(
    'image/loadImageFromProject',
    async (payload, thunkAPI) => {

        const project = await projectAPI.get(payload.project.id);

        let items = [];

        project.containers.forEach((container) => {
            container.items.forEach((item) => {
                items.push(item)
            });
        });


        return items;
    }
);

/*
export const loadImageBas64 = createAsyncThunk(
    'image/loadImageBas64',
    async (payload, thunkAPI) => {
        console.log("LOAD BASE64");
        const images_db = await imageUploadAPI.listByProject(payload.project.uuid);
        const images = [];
        await images_db.each((a) => {
            images.push(a);
        });

        return {images}
    }
);
*/

/*
export const loadImageBas64 = createAsyncThunk(
    'image/loadImageBas64',
    async (payload, thunkAPI) => {
        const image_db = await imageUploadAPI.getImageByUUID(payload.image.image_meta.image_uuid);

        return {image: payload.image, image_db}

    }
);
*/

export const updateImage = createAsyncThunk(
    'image/updateImage',
    async (payload, thunkAPI) => {

        const project = await projectAPI.get(payload.project.id);
        project.containers.forEach((container) => {
            container.items.forEach((item) => {
                if (payload.image.uuid == item.uuid) {
                    item.image_meta.transformation_data.push(payload.transform);
                }
            });
        });

        /*
        const image_db = await imageUploadAPI.getImageByUUID(payload.image.image_meta.image_uuid);

        image_db.modified = true;
        image_db.blob_medium_modified = payload.modified;
        //resize to thumb
        image_db.blob_thumb_modified = payload.modified_thumb;

        console.log("image_db_uodate",image_db);

        await imageUploadAPI.save(image_db);
        */

        await imageUploadAPI.update(payload.image.image_meta.image_uuid, {
            blob_medium_modified: payload.modified,
            blob_thumb_modified: payload.modified_thumb,
            modified: true
        });

        await projectAPI.save(project);

        return {image_uuid: payload.image.image_meta.image_uuid, transform: payload.transform}

    }
);

export const redefineImage = createAsyncThunk(
    'image/redefineImage',
    async (payload, thunkAPI) => {
        console.log("payload.image", payload.image);
        const project = await projectAPI.get(payload.project.id);
        project.containers.forEach((container) => {
            container.items.forEach((item) => {
                if (payload.image.uuid == item.uuid) {
                    item.image_meta.transformation_data = []
                }
            });
        });

        await imageUploadAPI.update(payload.image.image_meta.image_uuid, {
            blob_medium_modified: null,
            blob_thumb_modified: null,
            modified: false
        });

        await projectAPI.save(project);

        return {image_uuid: payload.image.image_meta.image_uuid}

    }
);

export const remove = createAsyncThunk(
    'image/remove',
    async (payload, thunkAPI) => {        
        let updated_project = await projectAPI.get(payload.project.id);
        updated_project.containers.forEach((container2) => {
            container2.items.forEach((item) => {
                if (item.image_meta.image_uuid == payload.image.image_meta.image_uuid) {
                    updated_project = projectAPI.removeItem(updated_project, item.uuid, true);
                }
            });
        });

        await projectAPI.save(updated_project);

        await imageUploadAPI.deleteByImageByUUID(payload.image.image_meta.image_uuid);

        return {image_uuid: payload.image.image_meta.image_uuid}
    }
);


export const increment = createAsyncThunk(
    'image/increment',
    async (payload, thunkAPI) => {
        console.log('increment');
        let updated_project = await projectAPI.get(payload.project.id);

        updated_project.containers.forEach((container2) => {
            container2.items.forEach((item) => {

                if (item.uuid == payload.item.uuid) {
                    item.quantity += 1;
                }
            });
        });

        await projectAPI.save(updated_project);


        return {item: payload.item}

    }
);

export const decrement = createAsyncThunk(
    'image/decrement',
    async (payload, thunkAPI) => {

        let updated_project = await projectAPI.get(payload.project.id);

        updated_project.containers.forEach((container2) => {
            container2.items.forEach((item) => {

                if (item.uuid == payload.item.uuid) {
                    item.quantity -= 1;
                }
            });
        });

        await projectAPI.save(updated_project);
        return {item: payload.item}

    }
);

/*


    */

export const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        value: [],
        discarded: 0,
        open: false,
        isReUploading: false,
        isUploading: false,
        page: 0,
        text: '',
        cur: 0,
        quantity: 0
    },
    reducers: {
        setKeep: (state, action) => {
            const _image = state.value.find(el => el.index === action.payload.index);
            _image.isKeeping = true;
        },
        setDiscarded: (state, action) => {
            const index = state.value.findIndex(el => el.index === action.payload.index);
            state.value.splice(index, 1);
            state.discarded += 1;
        },
        setModalClose: state => {
            state.open = false;
        },
        getQuantity: state => {
            var quans = state.value.map(e => e.quantity);
            console.log(quans)
            state.quantity = quans.reduce((acc, cur) => acc + cur);
        },
        setModalOpen: (state, action) => {
            state.isReUploading = action.payload || false;
            state.open = true;
        },
        plusCur: state => {
            var cur = ++ state.cur;
            if (cur > 5) cur = 0;
            state.cur = cur;
        },
        minusCur: state => {
            var cur = -- state.cur;
            if (cur < 0) cur = 5;
            state.cur = cur;
        },
        setText: (state, action) => {
            state.text = action.payload;
        },
        setIsUpload: (state, action) => {
            state.isUploading = action.payload
        },
        clearImages: (state, action) => {
            state.value = [];
        },
        setImage: (state, action) => {
            state.value = ([...state.value, ...action.payload]);
        }
    },
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        [setImages.fulfilled]: (state, action) => {
            if (state.isReUploading) {
                state.discarded = 0;
                state.isReUploading = false;
            }
            state.value = ([...state.value, {...action.payload}]);
        },
        [loadImageFromProject.fulfilled]: (state, action) => {

            state.value = action.payload;
        },
        /*[loadImageBas64.fulfilled]: (state, action) => {
            const _image = state.value.find(el => el.image_meta.image_uuid === action.payload.image.image_meta.image_uuid);
            _image.image_meta.source = action.payload.image_db.base64_medium;
            _image.image_meta.source_modified = action.payload.image_db.base64_medium_modified;            

        },*/
        /*[loadImageBas64.fulfilled]: (state, action) => {*/

        /*action.payload.images.forEach((a)=>{
            let _image = state.value.find(el => el.image_meta.image_uuid === a.uuid);
            _image.image_meta.source = a.base64_medium;
            _image.image_meta.source_modified = a.base64_medium_modified;

        });*/
        /*const _image = state.value.find(el => el.image_meta.image_uuid === action.payload.image.image_meta.image_uuid);
        _image.image_meta.source = action.payload.image_db.base64_medium;
        _image.image_meta.source_modified = action.payload.image_db.base64_medium_modified;
        */
        /*},
        [loadImageBas64.rejected]: (state, action) => {
            console.log("rejected loadbase64");
            console.log(state);
            console.log(action);
        },*/
        [updateImage.fulfilled]: (state, action) => {
            const _image = state.value.find(el => el.image_meta.image_uuid === action.payload.image_uuid);

            _image.image_meta.transformation_data.push(action.payload.transform);
            _image.image_meta.modified = true;
        },
        [redefineImage.fulfilled]: (state, action) => {
            const _image = state.value.find(el => el.image_meta.image_uuid === action.payload.image_uuid);
            _image.image_meta.transformation_data = [];
            _image.image_meta.modified = false;
        },
        [remove.fulfilled]: (state, action) => {
            
            const index = state.value.findIndex(el => el.image_meta.image_uuid === action.payload.image_uuid);
            state.value.splice(index, 1);
        },
        [increment.fulfilled]: (state, action) => {

            const _item = state.value.find(el => el.uuid === action.payload.item.uuid);
            _item.quantity += 1;
        },
        [decrement.fulfilled]: (state, action) => {

            const _item = state.value.find(el => el.uuid === action.payload.item.uuid);
            _item.quantity -= 1;
        },
        [redefineImage.rejected]: (state, action) => {
            console.log("rejected redefineImage");
            console.log(state);
            console.log(action);
        },
        [updateImage.rejected]: (state, action) => {
            console.log("rejected updateImage");
            console.log(state);
            console.log(action);
        },

        [setImages.rejected]: (state, action) => {
            console.log("rejected updateImage");
            console.log(state);
            console.log(action);
        },

    }
});

export const {
    setKeep, setDiscarded, setModalOpen, setModalClose, setIsUpload, clearImages, setImage, setText, plusCur, minusCur, getQuantity
} = uploadSlice.actions;

export const selectImages = state => state.upload.value.filter(el => el.quantity >= 1);

export const selectImagesPoorQuality = state => {
    return state.upload.value.filter(el => el.quality < 2 && el.isKeeping === false);
};
export const selectDiscarded = state => state.upload.discarded; 
export const selectIsOpen = state => state.upload.open;
export const selectCur = state => state.upload.cur;
export const getText = state => state.upload.text;
export const quantity = state => state.upload.quantity;
export const selectIsUploading = state => state.upload.isUploading;

export default uploadSlice.reducer;
