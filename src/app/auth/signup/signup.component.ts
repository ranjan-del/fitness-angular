import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule  } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatError } from '@angular/material/form-field';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  imports: [
    MatButtonModule ,
    MatFormFieldModule , 
    MatInputModule , 
    FlexLayoutModule,
    FormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatError,
    MatCheckboxModule,
    FlexLayoutServerModule,
    
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  maxDate = new Date();

  constructor(public authService : AuthService) { 

  }

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm){
    this.authService.registerUser({
      email : form.value.email,
      password : form.value.password,
    });
  }
}
