import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router){}

  goToAddCustomer(){
    this.router.navigate(['/add-customer']);
  }

  goToListCustomers(){
    this.router.navigate(['/list-customer']);
  }

}
