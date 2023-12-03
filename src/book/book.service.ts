import { UpdateBookArgs } from './arguments/update.book.args';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entity/book.entity';
import { Repository } from 'typeorm';
import { AddBookArgs } from './arguments/addbook.args';
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    public readonly bookRepo: Repository<BookEntity>,
  ) {}
  async findAllBooks(): Promise<BookEntity[]> {
    return await this.bookRepo.find();
  }

  async findBookById(id: number): Promise<BookEntity> {
    return await this.bookRepo.findOne({ where: { id: id } });
  }

  async deleteBookById(id: number): Promise<string> {
    await this.bookRepo.delete(id);
    return 'Book has been deleted';
  }

  async addBook(addBookArgs: any): Promise<string> {
    let book: BookEntity = new BookEntity();
    book.title = addBookArgs.title;
    book.price = addBookArgs.price;
    await this.bookRepo.save(book);
    return 'Book created successfully';
  }

  async updateBook(updateBookArgs: UpdateBookArgs): Promise<string> {
    let book: BookEntity = await this.bookRepo.findOne({
      where: { id: updateBookArgs.id },
    });
    if (!book) return 'Book not found';
    book.title = updateBookArgs.title;
    book.price = updateBookArgs.price;
    await this.bookRepo.save(book);
    return 'Book updated successfully';
  }
}
