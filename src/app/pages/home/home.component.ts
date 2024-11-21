import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { BookCardComponent } from "../../components/book-card/book-card.component";
import { IBook } from '../../utils/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BookCardComponent, BookCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private bookService = inject(BookService);
  books: IBook[] = [];

  ngOnInit(): void {
    this.getBooks()
  }

  getBooks() {
    this.bookService.getBooks().subscribe({
      next: (res) => {
        console.log("Books data", res);
        if (res.data) {
          this.books = res.data;
        }
      },
      error: (error) => {
        console.log({ component: "Home: Fetching books", error });
      }
    })
  }
}
