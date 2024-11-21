import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirm-password-validator';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  fb = inject(FormBuilder);
  resetForm!: FormGroup;

  token: string = "";

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.token = params['token'];
    });

    this.resetForm = this.fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.required],
    },
      { validator: confirmPasswordValidator('password', 'confirmPassword') }
    );
  }

  reset() {
    if (this.resetForm.invalid) {
      return;
    }

    this.authService.resetPassword({
      token: this.token,
      password: this.resetForm.value.password
    }).subscribe({
      next: (res: any) => {
        if (res.success) {
          alert(res.message);
          this.resetForm.reset();
          this.router.navigateByUrl('/login');
        }
      },
      error: (error) => {
        console.log({ component: "Reset Password", error });
      }
    })
  }
}
