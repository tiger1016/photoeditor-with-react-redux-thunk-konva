import db from '../db';
import project_schema from "../../../jsons/schemas/project.json";
import {Project} from './project';
import {BaseAPI} from './baseAPI';

import {v4 as uuidv4} from 'uuid';

import _ from 'lodash';

import {ImageUploadAPI} from './imageUploadAPI';
const imageUploadAPI = new ImageUploadAPI();

export class ProjectAPI extends BaseAPI {

    constructor() {
        super(project_schema);
    }

    async listActive() {
        return await db.projects.where("status").equals(1);
    }

    async new(template) {

        let project = new Project(JSON.parse(JSON.stringify(template)));

        this.initTemplateUUIDs(project);

        //await this.isValid(project);

        let projectId = await db.projects.add(project);
        project = await this.get(projectId); //return with id

        return project;
    }

    /*
    async new(template) {

        let project = new Project(JSON.parse(JSON.stringify(template)));

        this.initTemplateUUIDs(project);

        await this.isValid(project);

        let projectId = await db.projects.add(project);
        project = await this.get(projectId); //return with id

        return project;
    }*/

    async get(projectId) {
        let project = await db.projects.get(projectId);

        return project;
    }


    async getActive() {
        return await db.projects.where("active").equals(1).first();
    }


    async save(project) {

        /*await this.isValid(project).catch((ex)=>{
            console.log(ex);
        });*/

        await db.projects.update(project.id, project).catch((ex)=>{
            console.log(ex);
        });

        return true;
    }

    async setActiveProject(project) {
        project = _.cloneDeep(project);

        let updates = [];

        await db.projects.where("active").equals(1).modify({active: 0});

        project.active = 1;

        await db.projects.update(project.id, {active: 1});

        return project;
    }

    initTemplateUUIDs(project) {

        project.uuid = uuidv4();

        project.containers.forEach((container) => {
            container.uuid = uuidv4();
            container.items.forEach((item) => {
                item.uuid = uuidv4();
            });
        })
    }

    addContainer(project, new_container, clone_before) {

        if(typeof clone_before == undefined || clone_before){
            project = _.cloneDeep(project); 
        }

        if (!new_container.uuid) {
            new_container.uuid = uuidv4();
        }
        project.containers.push(new_container);


        return project;
    }

    removeContainer(project, container_uuid_to_remove) {
        project = _.cloneDeep(project);

        let index_to_remove = this.findContainerByUUID(project, container_uuid_to_remove);

        if (index_to_remove !== null) {
            project.containers.splice(index_to_remove, 1)
        } else {
            throw "Container not found";
        }

        return project;
    }

    updateContainer(project, container_to_update) {

        project = _.cloneDeep(project);

        let index_to_update = this.findContainerByUUID(project, container_to_update.uuid);

        if (index_to_update !== null) {
            project.containers.splice(index_to_update, 1, container_to_update);
        } else {
            throw "Container not found";
        }

        return project;
    }

    getItemImageUUID(project, item_uuid) {
        let indexes = this.findContainerByItemUUID(project, item_uuid);

        let item = project.containers[indexes.container_index].item[indexes.item_index];

        return item.image_meta.image_uuid;
    }

    addItem(project, container_uuid, new_item) {

        project = _.cloneDeep(project);

        let container_index = this.findContainerByUUID(project, container_uuid);

        new_item.uuid = uuidv4();
        project.containers[container_index].items.push(new_item);

        return project;
    }

    removeItem(project, item_uuid, remove_container) {

        project = _.cloneDeep(project);

        let indexes = this.findContainerByItemUUID(project, item_uuid);
        console.log("indexes", indexes);
        if (indexes.container_index === null) {
            throw "Container not found";
        }

        if (indexes.item_index === null) {
            throw "Item not found";
        }

        project.containers[indexes.container_index].items.splice(indexes.item_index, 1);

        /*if(remove_container){
            if(project.containers[indexes.container_index].items.length == 0){
                project.containers.splice(indexes.container_index,1);
            }
        }*/

        return project;
    }

    updateItem(project, item_to_update) {
        project = _.cloneDeep(project);

        let indexes = this.findContainerByItemUUID(project, item_to_update.uuid);
        if (indexes.container_index === null) {
            throw "Container not found";
        }

        if (indexes.item_index === null) {
            throw "Item not found";
        }

        project.containers[indexes.container_index].items.splice(indexes.item_index, 1, item_to_update);

        return project;
    }

    findContainerByUUID(project, uuid) {

        let index_found = null;

        project.containers.forEach((container, index) => {
            if (container.uuid == uuid) {
                index_found = index;
            }

        });

        return index_found;
    }


    findContainerByItemUUID(project, item_uuid) {

        let container_index_found = null;
        let item_index_found = null;
        console.log("project", project);
        project.containers.forEach((container, container_index) => {

            container.items.forEach((item, item_index) => {

                if (item.uuid == item_uuid) {
                    console.log(item.uuid + " == " + item_uuid);
                    container_index_found = container_index;
                    item_index_found = item_index;
                }
            });
        });

        return {
            container_index: container_index_found,
            item_index: item_index_found
        };
    }

    async addItemV2(_project_id,image){
        const project = await this.get(_project_id);

        const json_image = {
            "project_uuid": project.uuid,
            "blob_original": image.source_medium.blob,
            "blob_medium": image.source_medium.blob,
            "blob_medium_modified": null,
            "blob_thumb": image.source_thumb.blob,
            "blob_thumb_modified": null,            
            "modified":false,
            "uploaded": false
        };

        const image_upload_uuid = await imageUploadAPI.new(json_image).catch((exception) => {
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
        console.log("image_upload_uuid",image_upload_uuid);


        const new_item = {
            "container_uuid": container_uuid,
            "uuid": uuidv4(),
            "quantity": 1,
            'modified': null,
            'isKeeping': false,
            "width": image.source_medium.width,
            "height": image.source_medium.height,
            "quality": image.source_medium.quality,
            "x": 0,
            "y": 0,
            "rotation": 0,
            "type": "image",
            "image_meta": {                
                "image_uuid": image_upload_uuid,
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

        const updated_project = this.addContainer(project, container);

        await this.save(updated_project).catch((error) => {
            console.log("error_project", error);
        }); 
        
        return new_item;
    }  
    
    async addItemV3(project,image){
        const json_image = {
            "project_uuid": project.uuid,
            "blob_original": image.source_medium.blob,
            "blob_medium": image.source_medium.blob,
            "blob_medium_modified": null,
            "blob_thumb": image.source_thumb.blob,
            "blob_thumb_modified": null,            
            "modified":false,
            "uploaded": false
        };

        
        const image_upload_uuid = await imageUploadAPI.new(json_image).catch((exception) => {
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
            "width": image.source_medium.width,
            "height": image.source_medium.height,
            "quality": image.source_medium.quality,
            "x": 0,
            "y": 0,
            "rotation": 0,
            "type": "image",
            "image_meta": {                
                "image_uuid": image_upload_uuid,
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

        const updated_project = this.addContainer(project, container);

        return {updated_project,new_item};
    }
    
    async addItemV4(project,images){
        const json_images = [];
        const json_images_light = [];
        images.forEach((image)=>{

            const image_uuid = uuidv4();
            json_images_light.push({
                "uuid":image_uuid,
                "width":image.source_medium.width,
                "height":image.source_medium.height,
                "quality":image.source_medium.quality
            });

            json_images.push({
                "uuid":image_uuid,
                "project_uuid": project.uuid,
                "blob_original": image.source_medium.blob,
                "blob_medium": image.source_medium.blob,
                "blob_medium_modified": null,
                "blob_thumb": image.source_thumb.blob,
                "blob_thumb_modified": null,    
                "width":image.source_medium.width,
                "height":image.source_medium.height,
                "quality":image.source_medium.quality,
                "modified":false,
                "uploaded": false
            });    
        })
        


        
        let imageUploadIds = await db.images_upload.bulkAdd(json_images,null,{allKeys: true});
        console.log("imageUploadIds",imageUploadIds);

        /*
        const image_upload = await imageUploadAPI.new(json_image).catch((exception) => {
            console.log("exception new", exception);
        });*/

        const new_items = [];
        let updated_project = null;

        imageUploadIds.forEach((imageUploadId,index)=>{
                        

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
            const image_light = json_images_light.find(element => element.uuid == imageUploadId);

            const new_item = {
                "container_uuid": container_uuid,
                "uuid": uuidv4(),
                "quantity": 1,
                'modified': null,
                'isKeeping': false,
                "width": image_light.width,
                "height": image_light.height,
                "quality": image_light.quality,
                "x": 0,
                "y": 0,
                "rotation": 0,
                "type": "image",
                "image_meta": {                
                    "image_uuid": imageUploadId,
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
            new_items.push(new_item);
            
            updated_project = this.addContainer(project, container, false);
        });

        return {updated_project,new_items};
    }
}

