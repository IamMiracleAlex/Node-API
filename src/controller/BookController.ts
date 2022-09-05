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

    @Get("{uuid}")
    public async GetBookById(@Path() uuid: string): Promise<Book> {
        return this.service.getBookById(uuid);
    }

    @SuccessResponse("201", "Created")
    @Post()
    public async CreateBook(@Body() requestBody): Promise<Book> {
        console.log(requestBody)
        return this.service.createBook(requestBody);
    }

    @Delete("{uuid}")
    public async DeleteBook(@Path() uuid: string) {
        return this.service.deleteBook(uuid);
    }

    @Patch("{uuid}")
    public async UpdateBook(
        @Path() uuid: string,
        @Body() requestBody): Promise<Book> {
        return this.service.updateBook(uuid, requestBody);
    }

    private get service() {
        return new BookService();
    }
    
}