import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { TableComponent } from './components/EmployeeTable/Table.component';
import { EmployeeFormComponent } from './components/EmployeeForm/EmployeeForm.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TableComponent,
    EmployeeFormComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
  ]
})
export class EmployeeModule { }
