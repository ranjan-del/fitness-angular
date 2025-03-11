import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule  } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FormsModule } from '@angular/forms'; //ngmodel
import { NgForm } from '@angular/forms'; //form
import { CommonModule } from '@angular/common'; //ngif
import {FlexLayoutServerModule} from '@ngbracket/ngx-layout/server';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,FlexLayoutServerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  

  constructor(public authService : AuthService , 
    
  ){}

  

  onSumbit(form: NgForm){
    this.authService.login({
      email : form.value.email,
      password : form.value.password,
    });
  }

  

}
