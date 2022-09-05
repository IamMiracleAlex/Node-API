import { Book } from "../models/books";
import { getRepository } from "typeorm";
import { getMongoRepository } from "typeorm";


export class BookService {
    private BookRepository = getMongoRepository(Book);

    public async getBooks(): Promise<Book[]> {
        return this.BookRepository.find();
    }

    public async getBookById(id: number): Promise<Book> {
        return this.BookRepository.findOneOrFail(id);
    }

    public async createBook(requestBody) {
        return this.BookRepository.save(requestBody);
    }

    public async deleteBook(id: number): Promise<void> {
        let BookToRemove = await this.BookRepository.findOne(id);
        if (!BookToRemove) throw new Error('Not found');
        await this.BookRepository.remove(BookToRemove);
    }

    public async updateBook(id: number, requestBody): Promise<Book> {          
        // try {
        //     let book = this.BookRepository.findOneOrFail(id)
        //     console.log(book);

        //     await this.BookRepository.update({id: id}, requestBody);
            
        //     return this.BookRepository.findOneOrFail(id);
        //     // let updatedBook = await this.BookRepository.findOneOrFail(requestBody);
        //     // return updatedBook;
        // } catch (err) {
        //     console.log(err);
        //     throw new Error("Invalid Input");
        // }

        try {
            await this.BookRepository.update({id: id}, requestBody);
            let updatedBook = await this.BookRepository.findOneOrFail(requestBody);
            return updatedBook;
        } catch (err) {
            console.log(err);
            throw new Error("Invalid Input");
        }
    }
    
}
