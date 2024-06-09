import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { AuthService } from '../../services/auth.service';
import { User, UserKurumsal } from '../../interfaces/auth';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-register-kurumsal',
  standalone: true,
  imports: [CardModule, 
    ReactiveFormsModule, 
    ButtonModule, 
    RouterModule, 
    CommonModule,
    HttpClientModule
    
  ],
  templateUrl: './registerkurumsal.component.html',
  styleUrls: ["./registerkurumsal.component.scss"],
  providers: [AuthService, MessageService]
})
export class RegisterKurumsalComponent {

  registerKurumsalForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    surname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    department: ['', Validators.required],
    sifre: ['', [Validators.required]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  });

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private messageService: MessageService,
    private router: Router
  ) {}

  get name() {
    return this.registerKurumsalForm.controls['name'];
  }

  get surname() {
    return this.registerKurumsalForm.controls['surname'];
  }

  get email() {
    return this.registerKurumsalForm.controls['email'];
  }

  get phoneNumber() {
    return this.registerKurumsalForm.controls['phoneNumber'];
  }

  get department() {
    return this.registerKurumsalForm.controls['department'];
  }

  get sifre() {
    return this.registerKurumsalForm.controls['sifre'];
  }

  get confirmPassword() {
    return this.registerKurumsalForm.controls['confirmPassword'];
  }
  submitKurumsalDetails() {
    // Form değerlerinin kesin olarak string olmasını sağlamak
    const formValues = this.registerKurumsalForm.value;
    const postData: UserKurumsal = {
      name: formValues.name as string,
      surname: formValues.surname as string,
      email: formValues.email as string,
      phoneNumber: formValues.phoneNumber as string,
      department: formValues.department as string,
      sifre: formValues.sifre as string // `sifre`yi `password` olarak kullanıyoruz
    };
    
    // Optional alanı güvenle kaldırmak için kontrol ekleyin
    if (formValues.confirmPassword) {
      delete postData.confirmPassword;
    }
  
    this.authService.registerkurumsalUser(postData).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register Successfully' });
        this.router.navigate(['login']);
      },
      error => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    );
  }
  
}  