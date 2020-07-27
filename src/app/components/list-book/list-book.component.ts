import {Component, OnInit} from '@angular/core';
import {IBook} from "../../ibook";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  bookList: IBook[] = [];
  message: string = '';

  constructor(
    private bookService: BookService
  ) {
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(data => {
      this.bookList = data;
    }, error => {
      console.log(error);
    });
  }

  deleteProduct(index) {
    const book = this.bookList[index];
    if (confirm("Bạn có chắc chắn muốn xóa sách này?")) {
      this.bookService.deleteBook(book.id).subscribe(data => (
        this.bookList = this.bookList.filter(name => name.id !== book.id))
      );
      this.message = 'Xóa sách thành công!';
    }
  }

}
