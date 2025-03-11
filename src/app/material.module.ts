import {NgModule} from '@angular/core'
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule  } from '@angular/material/form-field'; 
import { CommonModule } from '@angular/common'; //ngif
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule }  from '@angular/material/snack-bar';
@NgModule({
    
    imports: [MatButtonModule , MatSnackBarModule ,  MatPaginatorModule , MatSortModule , MatTableModule ,  MatSelectModule , MatDialogModule , MatProgressSpinnerModule , MatTabsModule , MatCardModule ,  FlexLayoutServerModule , MatListModule , MatButtonModule , MatToolbarModule , MatSidenavModule ,  FlexLayoutModule , CommonModule , MatFormFieldModule , MatIconModule , FormsModule , MatDatepickerModule , MatNativeDateModule , MatInputModule],
    exports: [MatButtonModule ,  MatSnackBarModule , MatPaginatorModule , MatSortModule , MatTableModule ,  MatSelectModule , MatDialogModule , MatProgressSpinnerModule , MatTabsModule , MatCardModule ,  FlexLayoutServerModule , MatListModule , MatButtonModule , MatToolbarModule , MatSidenavModule , FlexLayoutModule , CommonModule , MatFormFieldModule , MatIconModule , FormsModule , MatDatepickerModule , MatNativeDateModule , MatInputModule],
    providers: []
})

export class MaterialModule{}

// function Component(arg0: { selector: string; imports: any[]; templateUrl: string; styleUrl: string; }): (target: typeof MaterialModule) => void | typeof MaterialModule {
//     throw new Error('Function not implemented.');
// }
