import db from '../db';
import Ajv from 'ajv';
import image_upload_schema from "../../../jsons/schemas/image_upload.json";
import {v4 as uuidv4} from 'uuid';
import {BaseAPI} from './baseAPI';

export class ImageUploadAPI extends BaseAPI {

    constructor() {
        super(image_upload_schema);
    }

    async listByProject(project_uuid) {
        const result = await db.images_upload.where("project_uuid").equals(project_uuid);
        return result;
    }

    async new(image_upload_json) {

        image_upload_json.uuid = uuidv4();
        //await this.isValid(image_upload_json);

        let imageUploadId = await db.images_upload.add(image_upload_json);

        return imageUploadId;
    }

    async get(imageUploadId) {
        let imageUpload = await db.images_upload.get(imageUploadId);

        return imageUpload;
    }

    async save(imageUpload) {

        /*await this.isValid(imageUpload).catch((e)=>{
            console.log("e",e);
        });*/
        await db.images_upload.update(imageUpload.uuid, imageUpload);

    }

    async update(uuid, imageUpload) {

        /*await this.isValid(imageUpload).catch((e)=>{
            console.log("e",e);
        });*/
        await db.images_upload.update(uuid, imageUpload);

    }

    async getImageByUUID(image_uuid) {

        return await db.images_upload.get(image_uuid);
    }

    async deleteByImageByUUID(image_uuid) {

        return await db.images_upload.delete(image_uuid);
    }

}

