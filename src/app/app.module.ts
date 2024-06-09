import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { RouterModule } from '@angular/router';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from 'primeng/button';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule, provideAnimations } from "@angular/platform-browser/animations";
import { MessageService } from "primeng/api";
import { AuthService } from './services/auth.service';
import { RegisterKurumsalComponent } from "./components/registerkurumsal/registerkurumsal.component";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./components/navbar/navbar.component";

@NgModule({
    declarations: [
        //AppComponent
        // Standalone bileşenler burada olmamalıdır
    ],

    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        LoginComponent,
        HomeComponent,
        AppComponent,
        RegisterComponent,
        RegisterKurumsalComponent,
        TaskListComponent,
        InputTextareaModule,
        ReactiveFormsModule,
        ButtonModule,
        ToastModule,
        CommonModule,
        BrowserAnimationsModule,
        NavbarComponent,
        HttpClientModule
        
    ],
    providers: [
        MessageService,
        AuthService,          
    ],
    //bootstrap :[AppComponent]
    // önceden çalışıyodu ama hata verdiği için chatgptnin sözü ile kapattım
    
})

export class AppModule{}