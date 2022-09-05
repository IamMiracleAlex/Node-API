import { Pick6 } from "../models/pick6";
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
  ICreatePick6Request,
  Pick6Request,
  Pick6Service,
} from "../services/pick6Service";
import { isEmail } from "class-validator";

@Route("pick6/registration")
export class Pick6Controller extends Controller {
    @Get()
    public async getPick6s(
        @Query() id?: number,
        @Query() showCompleted?: boolean
    ): Promise<Pick6Request[]> {
        return this.service.getPick6(id, showCompleted);
    }

    // /**
    //  * @isInt id id must be a positive integer
    //  * @minimum id 1
    // */
    // @Get("{id}")
    // public async GetPick6ById(@Path() id: number): Promise<Pick6Request> {
    //     return this.service.getPick6ById(id);
    // }

    @SuccessResponse("201", "Created")
    @Post()
    public async CreatePick6(@Body() requestBody: ICreatePick6Request): Promise<Pick6Request> {
        return this.service.createPick6(requestBody);
    }

    /**
    * @isInt id id must be a positive integer
    * @minimum id 1
    */
    @Delete("{id}")
    public async DeletePick6(@Path() id: number) {
        return this.service.deletePick6(id);
    }

    @Patch("{id}")
    public async UpdatePick6(
        @Path() id: number,
        @Body() requestBody): Promise<Pick6Request> {
        return this.service.updatePick6(id, requestBody);
    }

    private get service() {
        return new Pick6Service();
    }
    
}

