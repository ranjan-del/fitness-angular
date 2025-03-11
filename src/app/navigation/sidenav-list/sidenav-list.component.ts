import { Component ,OnInit , EventEmitter , Output ,OnDestroy } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  imports: [MaterialModule, RouterModule],
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.css'
})
export class SidenavListComponent implements OnInit , OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth = false;
  authSubscription = new Subscription;


  constructor(private authServie : AuthService){

  }

  ngOnInit(): void {
    this.authSubscription =this.authServie.authChange.subscribe(authStatus=>{
      this.isAuth=authStatus;
    })

  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onClose(){
    this.closeSidenav.emit()
  }

  onLogout(){
    this.onClose();
    this.authServie.logout();
    
    
  }

}
