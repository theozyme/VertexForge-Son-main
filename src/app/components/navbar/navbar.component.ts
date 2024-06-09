import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button'; // ButtonModule'ü ekleyin

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonModule], // DragDropModule'ü burada ekleyin
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) { }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

 }

