import {Component, OnInit} from '@angular/core';
import {IBook} from "../../ibook";
import {BookService} from "../../services/book.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.css']
})
export class DetailBookComponent implements OnInit {
  book: IBook;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBookById(id).subscribe(data =>
        (this.book = data),
      error => {
        console.log(error);
        this.book = null;
      }
    )
  }

}
