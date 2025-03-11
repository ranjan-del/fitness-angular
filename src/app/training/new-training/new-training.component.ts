import { Component, OnInit ,OnDestroy } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TrainingService } from '../training.service';
import { Excerise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable , Subscription } from 'rxjs';
@Component({
  selector: 'app-new-training',
  imports: [MaterialModule],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css'
})
export class NewTrainingComponent implements OnInit{

  excerises!: Excerise[];
  exerciseSubscription!: Subscription;

  constructor(
    private trainingService: TrainingService,
  ){}


  ngOnInit() {
    this.exerciseSubscription = this.trainingService.excersiesChanged.subscribe(
      excersies => {
        this.excerises = excersies;
      }
    );
    this.trainingService.fetchAvailableExcerises();
  }
  onstartTraining(form: NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

  onDestroy(){
    if(this.exerciseSubscription)
      this.exerciseSubscription.unsubscribe();
  }
}

