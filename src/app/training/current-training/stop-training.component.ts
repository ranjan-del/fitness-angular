import { Component, InjectionToken } from '@angular/core';
import { MaterialModule } from "../../material.module";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";
@Component({
    selector: 'app-stop-training',
    imports: [MaterialModule],
    template:`
        <h1 mat-dialog-title>Are you sure?</h1>
        <mat-dialog-content>
            <p>You already got {{ passedData.progress }}%</p>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button [mat-dialog-close]="true">Yes</button>
            <button mat-button [mat-dialog-close]="false">No</button>
        </mat-dialog-actions>
        
    `
})

export class StopTrainingComponent{
    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any){}
}

    
