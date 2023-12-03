
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddUserArgs {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
}

export interface UpdateBookArgs {
    id: number;
    title: string;
    price: number;
}

export interface AddBookArgs {
    title: string;
    price: number;
}

export interface Book {
    id: number;
    title: string;
    price?: Nullable<number>;
}

export interface IQuery {
    index(): string | Promise<string>;
    securedAdminData(): string | Promise<string>;
    securedNormalUserData(): string | Promise<string>;
    login(emailId: string, password: string): string | Promise<string>;
    books(): Book[] | Promise<Book[]>;
    bookById(bookId: number): Nullable<Book> | Promise<Nullable<Book>>;
}

export interface IMutation {
    registerUser(addUserArgs: AddUserArgs): string | Promise<string>;
    updateBook(updateBookArgs: UpdateBookArgs): string | Promise<string>;
    addBook(addBookArgs: AddBookArgs): string | Promise<string>;
    deleteBook(bookId: number): string | Promise<string>;
}

type Nullable<T> = T | null;
