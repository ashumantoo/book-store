import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IBook } from '../../utils/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  private bookService = inject(BookService);
  private activatedRoute = inject(ActivatedRoute);

  bookId: string = "";
  book?: IBook;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.bookId = params['id'];
    });
    this.getBook();
  }

  getBook() {
    this.bookService.getBook(this.bookId).subscribe({
      next: (res) => {
        this.book = res.data;
      },
      error: (err) => {
        console.log("Error while fetch book details--", err);
      }
    });
  }

  buyNow(book: IBook) {

  }

  addToCart(book: IBook) {

  }
}
