import { AfterViewInit, Component , OnDestroy, OnInit , ViewChild} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MaterialModule } from '../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Excerise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  imports: [MaterialModule],
  templateUrl: './past-training.component.html',
  styleUrl: './past-training.component.css'
})
export class PastTrainingComponent implements OnInit , AfterViewInit ,OnDestroy {  

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Excerise>();
  private exChangedSubscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private trainingService: TrainingService){

  
  }

  ngOnInit(){
    this.exChangedSubscription = this.trainingService.finishedExcerisesChanged.subscribe((excersies: Excerise[])=>{
      this.dataSource.data = excersies;
    })
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  

  doFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    if(this.exChangedSubscription){
      this.exChangedSubscription.unsubscribe();
    }
  }  

}
