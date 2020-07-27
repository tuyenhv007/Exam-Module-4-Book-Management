import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListBookComponent} from "./components/list-book/list-book.component";
import {AddBookComponent} from "./components/add-book/add-book.component";
import {EditBookComponent} from "./components/edit-book/edit-book.component";
import {DetailBookComponent} from "./components/detail-book/detail-book.component";


const routes: Routes = [
  {path: '', component: ListBookComponent},
  {path: 'book/detail/:id', component: DetailBookComponent},
  {path: 'book/add', component: AddBookComponent},
  {path: 'book/edit/:id', component: EditBookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
