import { Component , OnInit , Output , EventEmitter } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
@Component({
  selector: 'app-current-training',
  imports: [MaterialModule],
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.css'
})
export class CurrentTrainingComponent implements OnInit {
  
  progress = 0;
  timer: any;

  

  constructor(private dialog: MatDialog  , private trainingService : TrainingService) { }
    
  

  ngOnInit() {
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    // Use optional chaining to safely access duration
    const runningExercise = this.trainingService.getRunningExercise();
    const step = (runningExercise?.duration ?? 0) / 100 * 1000;

    // Check if step is greater than 0 to avoid unnecessary setInterval
    if (step > 0) {
      this.timer = setInterval(() => {
        this.progress += 1;
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      }, step);
    }
  }

  onStop(){
    clearInterval(this.timer);
    const dialofRef = this.dialog.open(StopTrainingComponent , {data: {
      progress:this.progress
    }});

    dialofRef.afterClosed().subscribe(result =>{
      if(result){
        this.trainingService.cancelExercise(this.progress);
      }else{
        this.startOrResumeTraining();
      }
    })
  }

}
