import { Component } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { Router } from '@angular/router';  
import { HttpClient } from '@angular/common/http';  
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';  

@Component({  
  selector: 'app-add-customer',  
  standalone: true,  
  imports: [CommonModule, ReactiveFormsModule],  
  templateUrl: './add-customer.component.html',  
  styleUrls: ['./add-customer.component.css']  
})  
export class AddCustomerComponent {  
  customerForm: FormGroup;  

  constructor(  
    private fb: FormBuilder,  
    private http: HttpClient,  
    private router: Router  
  ) {  
    
    this.customerForm = this.fb.group({  
      name: ['', Validators.required],  
      email: ['', [Validators.required, Validators.email]],  
      dateOfBirth: ['', Validators.required]  
    });  
  }  

   
  addCustomer() {  
    if (this.customerForm.valid) {  
      console.log('Formulário válido', this.customerForm.value);  
      console.log('Date Of Birth formatado:', new Date(this.customerForm.value.dateOfBirth).toISOString().split('T')[0]);
       console.log('Método addCustomer chamado'); 
      const customerData = {  
        name: this.customerForm.value.name,  
        email: this.customerForm.value.email,  
        dateOfBirth: new Date(this.customerForm.value.dateOfBirth).toISOString().split('T')[0]  
      };  

      console.log('Dados do usuário sendo enviados para o backend:', customerData); 

      this.http.post('http://localhost:8080/api/users', customerData).subscribe({  
        next: () => {  
          console.log('Usuário adicionado com sucesso!'); 
          alert('Cliente adicionado com sucesso!');  
          this.customerForm.reset();   
          this.router.navigate(['/']); 
        },  
        error: (err) => {  
          console.error('Erro ao adicionar cliente:', err);  
          alert('Erro ao adicionar cliente: ' + (err.error.message || 'Erro desconhecido.'));  
        }  
      });  
    } else {  
      console.warn('Erro na validação do formulário. Verifique os campos preenchidos.'); 
      alert('Por favor, preencha todos os campos corretamente.');  
    }  
  }  

    goToHome() {  
    this.router.navigate(['/']); 
  } 

}