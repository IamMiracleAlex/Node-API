import {Field} from "../models/field";

import { 
    Body, 
    Delete, 
    Get, 
    Patch, 
    Path, 
    Post, 
    Query, 
    Route, 
    Tags, 
    Controller,
    SuccessResponse, 
} from "tsoa";
import {
  ICreateFieldRequest,
  FieldRequest,
  FieldService,
} from "../services/fieldService";

@Route("fields")
export class FieldController extends Controller {
    @Get("{domain}")
    public async getFields(@Path() domain: string): Promise<FieldRequest[]> {
        return this.service.getFieldByDomain(domain);
    }

    // /**
    //  * @isInt id id must be a positive integer
    //  * @minimum id 1
    // */
    // @Get("{id}")
    // public async GetFieldById(@Path() id: number): Promise<Field> {
    //     return this.service.getFieldById(id);
    // }

    @SuccessResponse("201", "Created")
    @Post()
    public async CreateField(@Body() requestBody: FieldRequest): Promise<FieldRequest> {
        return this.service.createField(requestBody);
    }

    /**
    * @isInt id id must be a positive integer
    * @minimum id 1
    */
    @Delete("{id}")
    public async DeleteField(@Path() id: number) {
        return this.service.deleteField(id);
    }

    @Patch("{id}")
    public async UpdateField(
        @Path() id: number,
        @Body() requestBody): Promise<FieldRequest> {
        return this.service.updateField(id, requestBody);
    }

    private get service() {
        return new FieldService();
    }
    
}
