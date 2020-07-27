import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BookService} from "../../services/book.service";
import {IBook} from "../../ibook";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  formAdd: FormGroup;
  bookList: IBook[] = [];
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private bookService: BookService
  ) {
  }

  ngOnInit(): void {
    this.formAdd = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
    })
  }

  onSubmit() {
    if (this.formAdd.valid) {
      const {value} = this.formAdd;
      this.bookService.createBook(value).subscribe(data => {
        this.bookList.unshift(data);
        this.formAdd.reset();
      }, error => {
        console.log(error);
        this.router.navigate(['']);
      });
      this.message = 'Thêm sách thành công!';
    }
  }

  get title() {
    return this.formAdd.get('title');
  }

  get author() {
    return this.formAdd.get('author');
  }

  get description() {
    return this.formAdd.get('description');
  }

}
