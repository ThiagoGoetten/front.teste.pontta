
import { Component, OnInit } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { Router, ActivatedRoute, RouterModule } from '@angular/router';  
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';  
import { UserService } from '../user.service';  
import { UserDTO } from '../user.dto';  

@Component({  
  selector: 'app-edit-customer',  
  standalone: true,  
  imports: [CommonModule, ReactiveFormsModule, RouterModule],  
  templateUrl: './edit-customer.component.html',  
  styleUrls: ['./edit-customer.component.css']  
})  
export class EditCustomerComponent implements OnInit {  
  customerForm: FormGroup;  
  userId: number;  
  
  constructor(  
    private fb: FormBuilder,  
    private userService: UserService,  
    private router: Router,  
    private route: ActivatedRoute  
  ) {  
    this.customerForm = this.fb.group({  
      name: ['', Validators.required],  
      email: ['', [Validators.required, Validators.email]],  
      dateOfBirth: ['', Validators.required]  
    });  
    
    this.userId = 0;  
  }  
  
  ngOnInit(): void {  
   
    this.route.params.subscribe(params => {  
      this.userId = +params['id'];  
      this.loadCustomerData();  
    });  
  }  
  
  loadCustomerData(): void {  
    this.userService.getUserById(this.userId).subscribe({  
      next: (customer: UserDTO) => {  
         
        const formattedDate = customer.dateOfBirth.split('T')[0];  
        
        this.customerForm.patchValue({  
          name: customer.name,  
          email: customer.email,  
          dateOfBirth: formattedDate  
        });  
      },  
      error: (err) => {  
        console.error('Erro ao carregar dados do cliente:', err);  
        alert('Erro ao carregar dados do cliente');  
        this.router.navigate(['/list-customer']);  
      }  
    });  
  }  
  
  updateCustomer(): void {  
    if (this.customerForm.valid) {  
      const updatedCustomer: UserDTO = {  
        id: this.userId,  
        name: this.customerForm.value.name,  
        email: this.customerForm.value.email,  
        dateOfBirth: new Date(this.customerForm.value.dateOfBirth).toISOString().split('T')[0]  
      };  
      
      this.userService.updateUser(updatedCustomer).subscribe({  
        next: () => {  
          alert('Cliente atualizado com sucesso!');  
          this.router.navigate(['/list-customer']);  
        },  
        error: (err) => {  
          console.error('Erro ao atualizar cliente:', err);  
          alert('Erro ao atualizar cliente: ' + (err.error?.message || 'Erro desconhecido'));  
        }  
      });  
    } else {  
      alert('Por favor, preencha todos os campos corretamente.');  
    }  
  }  
  
  cancelEdit(): void {  
    this.router.navigate(['/list-customer']);  
  }  
}