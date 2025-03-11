import { Component  } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { OnInit , EventEmitter , Output , OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit , OnDestroy  {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth  = false;  
  authSubscription: Subscription = new Subscription;  //remove !

  constructor(private authService : AuthService){}

  ngOnInit(): void {
    this.authSubscription =  this.authService.authChange.subscribe(
      authStatus=>{
        this.isAuth=authStatus;
      }
    )
  }


  ontoggleSidenav(){
    this.sidenavToggle.emit();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
    
  }

}
