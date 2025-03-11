import { Component , inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MaterialModule} from "./material.module";
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MaterialModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutServerModule,
    MatSidenavModule,
    MatToolbarModule,
    FlexLayoutModule,
    SidenavListComponent,
    HeaderComponent,
    
    
    
    
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent implements OnInit{
  
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.initAuthListener();
  }
    
  title = 'fitness-app';

  onToogle(){

  }
}
