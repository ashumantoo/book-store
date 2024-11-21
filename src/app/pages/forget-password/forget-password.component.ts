import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  fb = inject(FormBuilder);
  forgetPasswordForm!: FormGroup;

  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

  submit() {
    if (this.forgetPasswordForm.invalid) {
      return
    }
    this.authService.forgetPassword(this.forgetPasswordForm.value).subscribe({
      next: (res: any) => {
        if (res.success) {
          alert(res.message);
          this.forgetPasswordForm.reset();
        }
      },
      error: (error) => {
        console.log({ component: "Forget Password", error });
      }
    })
  }
}
