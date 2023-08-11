import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    PageHeaderComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    PageHeaderComponent
  ]
})
export class SharedModule { }
