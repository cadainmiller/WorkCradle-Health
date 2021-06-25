import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ViewDocComponent } from './view-doc/view-doc.component';

@NgModule({
  declarations: [LoadingSpinnerComponent, ViewDocComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [LoadingSpinnerComponent],
  schemas: [],
})
export class SharedModule {}
