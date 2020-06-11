import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Skeleton from '@material-ui/lab/Skeleton';


import ModalCropperComponent from "../modal-cropper/modalCropper.component";
import AlertQuantityComponent from "../alert-quantity/alertQuantity.component";
import ImageLoader from "../photos/imageLoader.component";

import InfiniteScroll from 'react-infinite-scroller';


import {useSelector, useDispatch} from 'react-redux';
import {
    selectImages,
    increment,
    decrement,
    remove, clearImages, loadImageFromProject, loadImageBas64, getQuantity
} from '../../components/modal-upload-images/uploadSlicer';
import {editImage} from '../../slices/editImageSlicer';
import {getProject} from "../../slices/projectSlice";

const LoaderComponent = () => {
    return (
        <React.Fragment>
            <Box display="flex">
                {
                    Array.from(new Array(3)).map((item, index) => (
                        <Box key={index} width={210} height={118}>
                            <Skeleton variant="rect" width={210} height={118}/>
                            <Skeleton/>
                            <Skeleton width="60%"/>
                        </Box>
                    ))
                }
            </Box>
        </React.Fragment>
    )
}


const PhotosComponent = () => {
    const project = useSelector(getProject);
    const photos = useSelector(selectImages);
    const [open, setOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = React.useState(0);
    const [hasMore, setHasMore] = React.useState(true);
    const [images, setImages] = React.useState([]);
    const [isLoad, setIsLoad] = React.useState(false);

    React.useEffect(() => {
        if (project.id) {
            dispatch(clearImages());
            dispatch(loadImageFromProject({project}));

        }
    }, [project.uuid]);
    
    //
    // React.useEffect(() => {
    //     if (photos.length > 0) {
    //         getPage(Math.floor((images.length / 30)));
    //     }
    // }, [photos]);

    const handleEditImage = (el) => {
        setSelectedImage(el);
        dispatch(editImage(el));
        setOpen(true);
    }
    const handleCloseEditImage = () => {
        setSelectedImage(null);
        setOpen(false);
    }
    const handleCloseAlert = (el) => {
        setSelectedImage(null);
        setAlertOpen(false);
    }
    const decrementQuantity = (el) => {
        setSelectedImage(el);
        if (el.quantity === 1) {
            setAlertOpen(true);
            return;
        }
        dispatch(decrement({item: el, project}));
    }
    const incrementQuantiy = (el) => {
        dispatch(increment({item: el, project}));
    }

    const removeImage = () => {
        dispatch(remove({project, image: selectedImage})).then((e) => {
            setAlertOpen(false);
        });
    }

    //
    // function getPage(p) {
    //     if (images.length === photos.length) {
    //         setHasMore(false);
    //     } else {
    //         setCurrentPage(currentPage + 1);
    //         setHasMore(true);
    //         const page = Math.floor((images.length / 30));
    //         setImages([...new Set([...images, ...photos.slice(page * 30, (page + 1) * 30)])]);
    //     }
    // }

    return (
        <React.Fragment>
            <ModalCropperComponent isOpen={open} handleClose={handleCloseEditImage} image={selectedImage}/>
            <AlertQuantityComponent isOpen={alertOpen} handleClose={handleCloseAlert}
                                    handleRemove={() => removeImage(selectedImage)}/>
            {
                photos.length > 0 ?

                    // <InfiniteScroll
                    //     pageStart={1}
                    //     loadMore={getPage}
                    //     hasMore={hasMore}
                    //     loader={<LoaderComponent key={0}/>}
                    //     useWindow={true}
                    //     initialLoad={false}
                    //     threshold={0}
                    // >
                        <Grid container spacing={2}>    
                        {
                            photos.map((el, index) => (
                                <Grid key={index} item xs={12} md={6} lg={2} style={{
                                    marginBottom: '20px'
                                }}>
                                    <Box display="flex" flexDirection="column" mb={2}>

                                        <Box onClick={() => handleEditImage(el) }>
                                            <ImageLoader image_uuid={el.image_meta.image_uuid} modified={el.image_meta.modified} />
                                        </Box>
                                        <Box mt={1}>
                                            <Box display="flex" justifyContent="center" alignItems="center">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => decrementQuantity(el)}><RemoveIcon/></IconButton>

                                                <input
                                                    style={{
                                                        textAlign: "center",
                                                        padding: "4px",
                                                        border: "1px solid #ccc",
                                                        borderRadius: "2px",
                                                        marginLeft: "4px",
                                                        marginRight: "4px"
                                                    }}
                                                    onChange={() => {
                                                    }}
                                                    type="text" size="3" value={el.quantity}/>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => incrementQuantiy(el)}><AddIcon/></IconButton>
                                            </Box>
                                        </Box>

                                    </Box>
                                </Grid>
                            ))
                        }
                        </Grid>
                    : ''
            }

            {
                photos.length === 0 ? (<Box p={4}>Nenhuma foto encontrada</Box>) : ''
            }
        </React.Fragment>
    );
};

export default PhotosComponent