import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../validators/confirm-password-validator';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  fb = inject(FormBuilder);
  registrationForm!: FormGroup;

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.required],
    },
      { validator: confirmPasswordValidator('password', 'confirmPassword') }
    );
  }

  register() {
    if (!this.registrationForm.valid) {
      return;
    }
    const newUserData = {
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    };
    this.authService.registerUser(newUserData).subscribe({
      next: (res: any) => {
        if (res.success) {
          console.log("User registration", res);
          alert(res.message);
          this.router.navigateByUrl('/login');
          this.registrationForm.reset();
        }
      },
      error: (error) => {
        console.log({ component: "Register", error });
      }
    });
  }
}
