import { 
    Body, 
    Delete, 
    Get, 
    Patch, 
    Path, 
    Post, 
    Route, 
    Controller,
    SuccessResponse, 
} from "tsoa";

import { BookService } from "../services/BookService";
import {Book} from "../models/books";


@Route("books")
export class BookController extends Controller {
    @Get()
    public async getBooks(): Promise<Book[]> {
        return this.service.getBooks();
    }

    /**
     * @isInt id id must be a positive integer
     * @minimum id 1
    */
    @Get("{id}")
    public async GetBookById(@Path() id: number): Promise<Book> {
        return this.service.getBookById(id);
    }

    @SuccessResponse("201", "Created")
    @Post()
    public async CreateBook(@Body() requestBody): Promise<Book> {
        console.log(requestBody)
        return this.service.createBook(requestBody);
    }

    /**
    * @isInt id id must be a positive integer
    * @minimum id 1
    */
    @Delete("{id}")
    public async DeleteBook(@Path() id: number) {
        return this.service.deleteBook(id);
    }

    @Patch("{id}")
    public async UpdateBook(
        @Path() id: number,
        @Body() requestBody): Promise<Book> {
        return this.service.updateBook(id, requestBody);
    }

    private get service() {
        return new BookService();
    }
    
}