import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { Book } from './schema/book.schema';
import { BookService } from './book.service';
import { UpdateBookArgs } from './arguments/update.book.args';
import { AddBookArgs } from './arguments/addbook.args';
import { Book as BookModel } from '../graphql';

@Resolver((of) => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}
  @Query((returns) => [Book], { name: 'books' })
  getAllBooks(): Promise<BookModel[]> {
    return this.bookService.findAllBooks();
  }

  @Mutation((returns) => String, { name: 'updateBook' })
  updateBookById(
    @Args('updateBookArgs')
    updateBookArgs: UpdateBookArgs,
  ): Promise<string> {
    return this.bookService.updateBook(updateBookArgs);
  }

  @Mutation((returns) => String, { name: 'addBook' })
  addBook(
    @Args('addBookArgs')
    addBookArgs: AddBookArgs,
  ): Promise<string> {
    return this.bookService.addBook(addBookArgs);
  }

  @Mutation((returns) => String, { name: 'deleteBook' })
  deleteBookById(
    @Args({ name: 'bookId', type: () => Int }) bookId: number,
  ): Promise<string> {
    return this.bookService.deleteBookById(bookId);
  }

  @Query((returns) => Book, { name: 'bookById', nullable: true })
  getBookById(
    @Args({ name: 'bookId', type: () => Int }) bookId: number,
  ): Promise<BookModel> {
    return this.bookService.findBookById(bookId);
  }
}
