  
import { Injectable } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { UserDTO } from './user.dto'; 

@Injectable({  
  providedIn: 'root',  
})  
export class UserService {  
  private apiUrl = 'http://localhost:8080/api/users'; 

  constructor(private http: HttpClient) {}  

  // Método para buscar todos os usuários  
  fetchUsers(): Observable<UserDTO[]> {  
    return this.http.get<UserDTO[]>(this.apiUrl);  
  }  

  // Método para buscar um usuário por ID  
  getUserById(id: number): Observable<UserDTO> {  
    return this.http.get<UserDTO>(`${this.apiUrl}/${id}`);  
  }  

  // Método para adicionar um novo usuário  
  addUser(user: UserDTO): Observable<UserDTO> {  
    return this.http.post<UserDTO>(this.apiUrl, user);  
  }  

  // Método para atualizar um usuário  
  updateUser(user: UserDTO): Observable<UserDTO> {  
    return this.http.put<UserDTO>(`${this.apiUrl}/${user.id}`, user);  
  }  

  // Método para deletar um usuário  
  deleteUser(id: number): Observable<void> {  
    return this.http.delete<void>(`${this.apiUrl}/${id}`);  
  }  
}