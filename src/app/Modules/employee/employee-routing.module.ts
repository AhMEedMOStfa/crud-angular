import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardGuard } from 'src/app/guard/login-guard.guard';
import { TableComponent } from './components/EmployeeTable/Table.component';

const routes: Routes = [
  
  {path:'',redirectTo:'Home',pathMatch:'full'},
  {path:'Home',component:TableComponent , canActivate:[LoginGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
