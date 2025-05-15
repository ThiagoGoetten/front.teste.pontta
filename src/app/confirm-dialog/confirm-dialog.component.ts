
import { Component } from '@angular/core';  
import { MatDialogRef } from '@angular/material/dialog';   
import { CommonModule } from '@angular/common';  
import { MatDialogModule } from '@angular/material/dialog';  

@Component({  
  selector: 'app-confirm-dialog',  
  standalone: true,  
  imports: [CommonModule, MatDialogModule],
  template: `  
    <h2 mat-dialog-title>Confirmação</h2>  
    <mat-dialog-content>  
      <p>Você tem certeza que deseja deletar este cliente?</p>  
    </mat-dialog-content>  
    <mat-dialog-actions>  
      <button mat-button (click)="onNoClick()">Cancelar</button>  
      <button mat-button cdkFocusInitial (click)="onConfirm()">Deletar</button>  
    </mat-dialog-actions>  
  `,  
})  
export class ConfirmDialogComponent {  
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}  

  onNoClick(): void {  
    this.dialogRef.close();  
  }  

  onConfirm(): void {  
    this.dialogRef.close(true); 
  }  
}