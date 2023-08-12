import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { getPortuguesePaginatorIntl } from './config/paginator-pt-br';
import {MatMenuModule} from '@angular/material/menu';
import { LocaleDatePipe } from './pipes/locale-date.pipe';


@NgModule({
  declarations: [
    PageHeaderComponent,
    LocaleDatePipe
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule    
  ],
  exports: [
    PageHeaderComponent,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    LocaleDatePipe
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() }
  ]
})
export class SharedModule { }
