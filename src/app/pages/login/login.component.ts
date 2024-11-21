import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  fb = inject(FormBuilder);
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    })
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res.success) {
          alert("Login success");
          localStorage.setItem('userId', res.data._id);
          localStorage.setItem('username', res.data.firstName);
          this.authService._isUserLoggedIn.next(true);
          this.authService._loggedInUsername.next(res.data.firstName);
          this.router.navigateByUrl('/home');
          this.loginForm.reset();
        }
      },
      error: (error) => {
        console.log({ component: "Login", error });
        alert(error.error.message);
      }
    })
  }
}
