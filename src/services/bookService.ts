import { Book } from "../models/books";
import { getMongoRepository } from "typeorm";


export class BookService {
    private BookRepository = getMongoRepository(Book);

    public async getBooks(): Promise<Book[]> {
        return this.BookRepository.find();
    }

    public async getBookById(id: string): Promise<Book> {
        return this.BookRepository.findOneOrFail(id);
    }

    public async createBook(requestBody) {
        return this.BookRepository.save(requestBody);
    }

    public async deleteBook(id: string): Promise<void> {
        let BookToRemove = await this.BookRepository.findOne(id);
        if (!BookToRemove) throw new Error('Not found');
        await this.BookRepository.remove(BookToRemove);
    }

    public async updateBook(id: string, requestBody): Promise<Book> {          
        try {
        
            await this.BookRepository.update(id, requestBody);

            return this.BookRepository.findOneOrFail(id);
        
        } catch (err) {
            console.log(err);
            throw new Error("Invalid Input");
        }

   
    }
    
}
