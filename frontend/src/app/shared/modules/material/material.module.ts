import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'
import { MatListModule } from '@angular/material/list'
import {MatCardModule} from '@angular/material/card'

const materialModules = [
  MatIconModule,
  MatSelectModule,
  MatListModule,
  MatCardModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialModules

  ],
  exports: [
    ...materialModules
  ]
})
export class MaterialModule { }
