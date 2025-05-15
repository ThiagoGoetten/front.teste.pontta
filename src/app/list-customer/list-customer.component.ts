// src/app/list-customer/list-customer.component.ts  
import { Component, OnInit } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { Router } from '@angular/router'; // Adicionada importação do Router  
import { UserService } from '../user.service';  
import { MatDialog } from '@angular/material/dialog';  
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';  
import { MatTableDataSource } from '@angular/material/table';   
import { UserDTO } from '../user.dto';   
import { MatTableModule } from '@angular/material/table';   
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({  
  selector: 'app-list-customer',  
  standalone: true,  
  imports: [  
  CommonModule,   
  MatTableModule,   
  MatFormFieldModule,   
  MatInputModule,   
  MatIconModule 
],
  templateUrl: './list-customer.component.html',  
  styleUrls: ['./list-customer.component.css'],  
})  
export class ListCustomerComponent implements OnInit {  
  displayedColumns: string[] = ['id', 'name', 'email', 'dateOfBirth', 'actions'];  
  dataSource = new MatTableDataSource<UserDTO>();  

  constructor(  
    private userService: UserService,   
    private dialog: MatDialog,  
    private router: Router   
  ) {}  

  ngOnInit() {  
    this.fetchCustomers();  
  }  

  fetchCustomers() {  
    this.userService.fetchUsers().subscribe(  
      (data: UserDTO[]) => {  
        this.dataSource.data = data;  
      },  
      (error) => {  
        console.error('Erro ao buscar clientes:', error);  
      }  
    );  
  }  

  getUserById(id: number) {  
    this.userService.getUserById(id).subscribe(  
      (user) => {  
        console.log('Usuário encontrado:', user);  
      },  
      (error) => {  
        console.error('Erro ao buscar o usuário:', error);  
      }  
    );  
  }  

  addUser(user: UserDTO) {  
    this.userService.addUser(user).subscribe(  
      (createdUser) => {  
        console.log('Usuário criado:', createdUser);  
        this.fetchCustomers(); 
      },  
      (error) => {  
        console.error('Erro ao adicionar usuário:', error);  
      }  
    );  
  }  

 
  editCustomer(customer: UserDTO) {  
  this.router.navigate(['/edit-customer', customer.id]);  
}      

deleteCustomer(id: number) {  
  this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe((result) => {  
    if (result) {  
      this.userService.deleteUser(id).subscribe({  
        next: () => {  
          console.log('Cliente deletado com ID:', id);  
          
          
          const currentData = this.dataSource.data;  
          this.dataSource.data = currentData.filter(item => item.id !== id);  
          
          
          setTimeout(() => this.fetchCustomers(), 100);  
        },  
        error: (error) => {  
          console.error('Erro ao deletar cliente:', error);  
        }  
      });  
    }  
  });  
} 

  applyFilter(event: Event) {  
  const filterValue = (event.target as HTMLInputElement).value;  
  this.dataSource.filterPredicate = (data: UserDTO, filter: string) => {  
    return data.name.toLowerCase().includes(filter.toLowerCase());  
  };  
  this.dataSource.filter = filterValue.trim().toLowerCase();  
}  

  goToHome() {  
  this.router.navigate(['/']);   
}  

}