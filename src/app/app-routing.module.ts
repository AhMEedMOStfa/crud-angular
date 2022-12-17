import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NotFoundComponent } from './components/NotFound/NotFound.component';
import { TableComponent } from './Modules/employee/components/EmployeeTable/Table.component';

const routes: Routes = [
  {path:'',component:MainLayoutComponent , children:[
    {path:'',redirectTo:'employee' , pathMatch:'full'},
    {path:'employee' , loadChildren:()=>import('./Modules/employee/employee.module').then((m)=>m.EmployeeModule)}
  ]},
  {path:'auth' , loadChildren:()=>import('./Modules/auth/auth.module').then((m)=>m.AuthModule)},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
