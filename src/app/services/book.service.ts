import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IBook} from "../ibook";

@Injectable({
  providedIn: 'root'
})
export class BookService {
private readonly API_URL = 'http://localhost:3000/books';
  constructor(private http: HttpClient) { }

  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL)
  }
  getBookById(id: number): Observable<IBook> {
    return this.http.get<IBook>(`${this.API_URL}/${id}`)
  }
  createBook(song: Partial<IBook>): Observable<IBook> {
    return this.http.post<IBook>(this.API_URL, song)
  }
  updateBook(song: Partial<IBook>): Observable<IBook> {
    return this.http.put<IBook>(`${this.API_URL}/${song.id}`, song)
  }
  deleteBook(id: number): Observable<any> {
    return this.http.delete<IBook>(`${this.API_URL}/${id}`)
  }
}
