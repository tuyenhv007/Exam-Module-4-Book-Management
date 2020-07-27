import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IBook} from "../../ibook";
import {BookService} from "../../services/book.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  formEdit: FormGroup;
  book: IBook;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.formEdit = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]]
    });
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBookById(id).subscribe(data => {
      this.book = data;
      this.formEdit.patchValue(this.book);
    }, error => {
      console.log(error);
      this.book = null;
    })
  }

  onSubmit() {
    if (this.formEdit.valid) {
      const {value} = this.formEdit;
      const data = {
        ...this.book,
        ...value
      };
      this.bookService.updateBook(data).subscribe(data => {
        this.router.navigate(['']);
      }, error => {
        console.log(error);
      })
    }
  }

  get title() {
    return this.formEdit.get('title');
  }

  get author() {
    return this.formEdit.get('author');
  }

  get description() {
    return this.formEdit.get('description');
  }

}
