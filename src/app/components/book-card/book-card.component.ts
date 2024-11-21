import { Component, Input } from '@angular/core';
import { IBook } from '../../utils/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  @Input({ required: true }) book!: IBook;
}
