var i = 0;

export const resizeImage = (file, medium_width, medium_height, thumb_width = 250, thumb_height = 250) => {
    return new Promise(function (resolve, rej) {
        console.timeLog("resize",1);

        let img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = function () {
            console.timeLog("resize","ONLOAD");

            URL.revokeObjectURL(img.src);

            Promise.all([
                resize(img, medium_width, medium_height),
                resize(img, thumb_width, thumb_height),
            ]).then((sources) => {
                
                console.timeLog("resize","PROMISE ALL RESIZES");
                resolve({
                    source_medium:sources[0],
                    source_thumb:sources[1]
                });
            });                          
        }
    });
}

const resize = (img, resized_width, resized_height) => {
    return new Promise((res, rej) => {

        console.timeLog("resize","BEFORE CANVAS");
        const canvas = document.createElement("canvas");
        console.timeLog("resize","AFTER CREATE CANVAS");
        let imageBlob = null;

        let width = img.width;
        let height = img.height;
        let ratio = null;

        if (width > height) {
            ratio = Math.min(resized_height / width, resized_width / height);
        } else {
            ratio = Math.min(resized_width / width, resized_height / height);
        }

        width = width * ratio;
        height = height * ratio;

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const quality = 1;
        
        canvas.toBlob(blob => {

            console.timeLog("resize","TO BLOB");
            res({
                blob,
                width,
                height,
                quality
            });
        }, img.type, 0.5);


    });
}
