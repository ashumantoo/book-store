import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  isLoggedIn = false;
  username = ""

  ngOnInit(): void {
    this.authService._isUserLoggedIn.subscribe({
      next: (data) => {
        this.isLoggedIn = this.authService.isUserLoggedIn()
      }
    });
    this.authService._loggedInUsername.subscribe({
      next: (data) => {
        this.username = this.authService.getLoggedInUsername();
      }
    })
  }

  logout() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.authService._isUserLoggedIn.next(false);
    this.authService._loggedInUsername.next("");
  }
}
