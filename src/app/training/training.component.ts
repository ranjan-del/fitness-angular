import { Component ,OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { PastTrainingComponent } from './past-training/past-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-training',
  imports: [MaterialModule ,  PastTrainingComponent , NewTrainingComponent , CurrentTrainingComponent],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent implements OnInit {

  ongoingTraining = false;
  excersieSubscription : Subscription = new Subscription();

  constructor(
    private trainingService : TrainingService,
    private router: Router,
    private auth: Auth
  ) {
    // Authentication is handled by the AuthGuard
    console.log('TrainingComponent initialized');
  }

  ngOnInit() : void {
    console.log('TrainingComponent ngOnInit');

    this.excersieSubscription = this.trainingService.excersieChanged.subscribe(
      excerise => {
      if(excerise){
        this.ongoingTraining = true;
      }else{
        this.ongoingTraining = false;
      }
    });
  }

}
