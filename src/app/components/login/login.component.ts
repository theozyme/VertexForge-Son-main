import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CardModule,
    ButtonModule,
    HttpClientModule,
    ToastModule
  ],
  providers: [AuthService, MessageService],
  templateUrl: './login.component.html',
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    sifre: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) { }

  get email() {
    return this.loginForm.controls['email'];
  }
  get sifre() {
    return this.loginForm.controls['sifre'];
  }

  loginUser() {
    const { email, sifre } = this.loginForm.value;
    this.authService.login({ email, sifre: sifre }).subscribe(
      (response: any) => {
        if (response.token) {
          localStorage.setItem('access_token', response.token);
          this.router.navigate(['/home']);
        } else {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Email or Password is wrong' });
        }
      },
      error => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    );
  }
}
