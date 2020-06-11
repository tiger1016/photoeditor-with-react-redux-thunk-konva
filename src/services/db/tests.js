import {ProductAPI} from './models/productAPI';
import {ProjectAPI} from './models/projectAPI';
import {ImageUploadAPI} from './models/imageUploadAPI';

let template = {
    "status": 1,
    "title": "Fotos Premium 15x20",
    "description": "Descriçao do produto",
    "width": 900,
    "height": 1200,
    "margin": 0,
    "aspect_ratio": "4 / 3",
    "type_product": "photos",
    "min_resize": {
        "width": 900,
        "height": 1200
    },
    "max_resize": {
        "width": 900,
        "height": 1200
    },
    "print_area": {
        "width": 900,
        "height": 1200
    },
    "background": {
        "type": "color",
        "color": "#FFFFFF",
        "url": ""
    },
    "spine": "Fashion book design",
    "containers": []
};


/*
{
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
            "items": [
                {
                    "width": 380,
                    "height": 400,
                    "x": 120,
                    "y": 4.5,
                    "rotation": 0,
                    "type": "image",
                    "image_meta": {
                        "source": "https://images.unsplash.com/photo-1568251723346-462c2abfd420?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=932&q=80",
                        "transformation_data": {
                            "crop_x": 0,
                            "crop_y": 0,
                            "rotation": 0,
                            "filters": ""
                        }
                    },
                    "border": {
                        "size": {
                            "left": 2,
                            "right": 2,
                            "top": 2,
                            "bottom": 2
                        },
                        "color": "#FFF",
                        "radius": ""
                    }
                },
                {
                    "width": 14,
                    "height": 5,
                    "x": 0.5,
                    "y": 12,
                    "rotation": 0,
                    "type": "text",
                    "text_meta": {
                        "font": "Arial",
                        "font_size": 18,
                        "font_color": "#FFFFFF",
                        "text": "My fashion style"
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
            ]
        }
*/

let json_image = {
    "project_uuid": 1,
    "base64_original": "iVBORw0KGgoAAAANSUhEUgAAASwAAADIBAMAAACg8cFmAAAAG1BMVEXMzMyWlpaqqqqcnJyxsbG+vr7FxcWjo6O3t7eLfgyYAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACl0lEQVR4nO3Wy2/aQBAG8OFhmyPjtYEjVqWcWRG1PYKiJD1iqVV7NI0UrnHVRj1Cmz7+7M6ssUMlkELVLT18PwmQrZX2Yx+zSwQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/T8inTrDX/xpreuoE8DTZhKhriH7wZ6Jl332W/dWA3NoKuWfP6a05k8dr+1FfPhsuuNi29yeXAFFMETOPm1gD28TaMD8wS+6OtHhOdMOcSqy2a+9PayRJUsqGD2XSxIr5vo4VFyXfB3ZGWfJmHhOV8RcjsebDV2XqMVZbutr0A57JABR1LHmqY00ol6Ga35Fd62SHvKCci5DlaegxVk+KUzZuaxd21owWNbHW1EpkqvuhDFHApA0lv4tkC3+x9O/bdUemUoakjpU+xiqolbqXt+4vRCP9KdoSlcqFv1hUzqTvli7xzaRZ8r/FGlRbNHyXMXVSfV9EZjqdykj6M7+TGdFuZaaaAvEYi+pY72XvsRs6iaXbkqsV6MlyECVPiBVa/vCtGi2S0XWxxh5jdUbS784k5vtjRWahT7q2dLRGHhM53Tif0M6S3+yPpd+6ExP9KSJd8rc+YwUmm1FdIKTvbH8sfddl6hlXIKr2a5+5rJSIbTmVBR3ygdGS8cyrQiblNNBy6vc6lhn9codPZIqbA7Eivnxt+DtlsRyRhZxBP8vEa6xca3p1VAds+MDaCvWktok2TCTWyvNGrA7r+qKysp8O1i17Xnx9SXRhrvRic2G8XmxcRTjOv7njZ+MjGgeX5Hajd+FRR1tPKkPk80az1bZH/feQz4LSe4nX2nhcJ6VswYmnLDu6ZnZUe7nLG5/3rD8UXr+4OnUGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPDrFzA9aE+E7NnSAAAAAElFTkSuQmCC",
    "base64": "iVBORw0KGgoAAAANSUhEUgAAASwAAADIBAMAAACg8cFmAAAAG1BMVEXMzMyWlpaqqqqcnJyxsbG+vr7FxcWjo6O3t7eLfgyYAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACl0lEQVR4nO3Wy2/aQBAG8OFhmyPjtYEjVqWcWRG1PYKiJD1iqVV7NI0UrnHVRj1Cmz7+7M6ssUMlkELVLT18PwmQrZX2Yx+zSwQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/T8inTrDX/xpreuoE8DTZhKhriH7wZ6Jl332W/dWA3NoKuWfP6a05k8dr+1FfPhsuuNi29yeXAFFMETOPm1gD28TaMD8wS+6OtHhOdMOcSqy2a+9PayRJUsqGD2XSxIr5vo4VFyXfB3ZGWfJmHhOV8RcjsebDV2XqMVZbutr0A57JABR1LHmqY00ol6Ga35Fd62SHvKCci5DlaegxVk+KUzZuaxd21owWNbHW1EpkqvuhDFHApA0lv4tkC3+x9O/bdUemUoakjpU+xiqolbqXt+4vRCP9KdoSlcqFv1hUzqTvli7xzaRZ8r/FGlRbNHyXMXVSfV9EZjqdykj6M7+TGdFuZaaaAvEYi+pY72XvsRs6iaXbkqsV6MlyECVPiBVa/vCtGi2S0XWxxh5jdUbS784k5vtjRWahT7q2dLRGHhM53Tif0M6S3+yPpd+6ExP9KSJd8rc+YwUmm1FdIKTvbH8sfddl6hlXIKr2a5+5rJSIbTmVBR3ygdGS8cyrQiblNNBy6vc6lhn9codPZIqbA7Eivnxt+DtlsRyRhZxBP8vEa6xca3p1VAds+MDaCvWktok2TCTWyvNGrA7r+qKysp8O1i17Xnx9SXRhrvRic2G8XmxcRTjOv7njZ+MjGgeX5Hajd+FRR1tPKkPk80az1bZH/feQz4LSe4nX2nhcJ6VswYmnLDu6ZnZUe7nLG5/3rD8UXr+4OnUGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPDrFzA9aE+E7NnSAAAAAElFTkSuQmCC",
    "uploaded": false
};
let imageUploadAPI = new ImageUploadAPI();

async function init_product() {
    let productAPI = new ProductAPI();


    let new_product = {
        "external_product_id": 1,
        "name": "Fotos Premium 15x20cm",
        "status": 1
    }

    let product = await productAPI.new(new_product, template).catch((exception) => {
        console.log("exception new", exception);
    });

    let new_product2 = {
        "external_product_id": 2,
        "name": "Fotos Premium 15x10cm",
        "status": 1
    }

    let product2 = await productAPI.new(new_product2, template).catch((exception) => {
        console.log("exception new", exception);
    });


    let new_menu_json = {
        external_product_id: 1,
        icon: "photo_filter",
        title: "Papel",
        subtitle: "Crystal Brilho",
        action: "changePaper"
    }
    let new_menu = await productAPI.newMenu(new_menu_json).catch((exception) => {
        console.log("exception new", exception);
    });


    let new_menu_json2 = {
        external_product_id: 1,
        icon: "photo_size_select_large",
        title: "Tamanho",
        subtitle: "10x15cm",
        action: "changeSize"
    }
    let new_menu2 = await productAPI.newMenu(new_menu_json2).catch((exception) => {
        console.log("exception new", exception);
    });

    let new_menu_json3 = {
        external_product_id: 1,
        icon: "assistant",
        title: "Otimização",
        subtitle: "Ligado",
        action: "optimizer"
    }
    let new_menu3 = await productAPI.newMenu(new_menu_json3).catch((exception) => {
        console.log("exception new", exception);
    });

}

async function testeImage() {
    /*

  */


    //console.log(image_upload);
}


async function testeProject() {

    let image_upload = await imageUploadAPI.new(json_image).catch((exception) => {
        console.log("exception new", exception);
    });

    // Populate a contact
    let projectAPI = new ProjectAPI();
    let project = await projectAPI.new(template).catch((exception) => {
        console.log("exception new", exception);
    });

    //project.log();


    project.title = "titulo alterado";
    projectAPI.addContainer(project, {
        "background": {
            "type": "colorteste",
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
        "items": [
            {
                "width": 380,
                "height": 400,
                "x": 120,
                "y": 4.5,
                "rotation": 0,
                "type": "image",
                "image_meta": {
                    "source": "",
                    "image_uuid": image_upload.uuid,
                    "transformation_data": {
                        "crop_x": 0,
                        "crop_y": 0,
                        "rotation": 0,
                        "filters": ""
                    }
                },
                "border": {
                    "size": {
                        "left": 2,
                        "right": 2,
                        "top": 2,
                        "bottom": 2
                    },
                    "color": "#FFF",
                    "radius": ""
                }
            },
            {
                "width": 14,
                "height": 5,
                "x": 0.5,
                "y": 12,
                "rotation": 0,
                "type": "text",
                "text_meta": {
                    "font": "Arial",
                    "font_size": 18,
                    "font_color": "#FFFFFF",
                    "text": "My fashion style"
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
        ]
    });


    /*
    project.updateContainer({

    });
    */

    let project2 = await projectAPI.save(project).catch((exception) => {
        console.log("exception update", exception);
    });

    console.log("project2", project2);

    //project.removeContainer(project.containers[1].uuid);

    projectAPI.addItem(project, project.containers[1].uuid, {
        "width": 380,
        "height": 400,
        "x": 120,
        "y": 4.5,
        "rotation": 0,
        "type": "image",
        "image_meta": {
            "source": "",
            "image_uuid": "204c37fb-6107-4bc9-98b3-abb41fb6811d",
            "transformation_data": {
                "crop_x": 0,
                "crop_y": 0,
                "rotation": 0,
                "filters": ""
            }
        },
        "border": {
            "size": {
                "left": 2,
                "right": 2,
                "top": 2,
                "bottom": 2
            },
            "color": "#FFF",
            "radius": ""
        }
    });


    let testenoref = JSON.parse(JSON.stringify(project.containers[1]));
    testenoref.background.type = "aeee";

    projectAPI.updateContainer(project, testenoref);

    let project3 = await projectAPI.save(project).catch((exception) => {
        console.log("exception update", exception);
    });


    //console.log(await imageTeste2.count());
    //let imageTeste = await project.getImageByUUID(project.containers[1].items[2].uuid);
    //console.log(project.containers[1].items[2].image_meta.image_uuid);
    /*let imageTeste = await imageUploadAPI.getImageByUUID(project.containers[1].items[2].image_meta.image_uuid).catch((erro)=>{
      console.log("erro",erro);
    });*/

    //console.log("imageTeste",imageTeste);


    //console.log("imageTeste",imageTeste);

    //console.log("project3",project3);

    let project_list = await projectAPI.listActive();
    let count = await project_list.count();
    console.log(count);

    project_list.each((a) => {
        console.log(a);
    });

    /*
    let getprojecttest = await projectAPI.get(15);
    console.log("getprojecttest",getprojecttest);


    let imageUploadAPI = new ImageUploadAPI();

    let imageUpload = await imageUploadAPI.new(json_image);
    console.log("imageUpload",imageUpload);
    */
}

//testeImage();
//testeProject();

//setTimeout(testeProject,10000);
//init_product();
//testeProject();
