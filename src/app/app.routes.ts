import { Routes } from '@angular/router';  
import { HomeComponent } from './home/home.component';  
import { AddCustomerComponent } from './add-customer/add-customer.component';  
import { ListCustomerComponent } from './list-customer/list-customer.component';  
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

export const routes: Routes = [  
  { path: '', component: HomeComponent },  
  { path: 'add-customer', component: AddCustomerComponent },  
  { path: 'list-customer', component: ListCustomerComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent }   
];
