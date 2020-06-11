import Compressor from 'compressorjs';

var i = 0;


export const resizeImage = (file, medium_width, medium_height, thumb_width = 250, thumb_height = 250) => {
    return new Promise(function (resolve, rej) {
    
        Promise.all([
            resize(file, medium_width, medium_height),
            //resize(file, thumb_width, thumb_height),
        ]).then((sources) => {
                            
            resolve({
                source_medium:sources[0],
                source_thumb:sources[0]
            });
        });                          
    });
}

const resize = (img, resized_width, resized_height) => {
    return new Promise((res, rej) => {

        new Compressor(img, {
            quality: 0.5,
            maxWidth:resized_width,
            maxHeight:resized_height,
            success(result) {
                console.log("result",result);
                res({
                    blob:result,
                    width:300,
                    height:300,
                    quality:1
                });
            },
            error(err) {
              console.log(err.message);
            },
          });       
    });
}
