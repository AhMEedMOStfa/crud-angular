import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/NotFound/NotFound.component';
import { TableComponent } from './components/EmployeeTable/Table.component';
import { LoginGuardGuard } from 'src/guard/login-guard.guard';

const routes: Routes = [
  {path:'',redirectTo:'Home',pathMatch:'full'},
  {path:'Home',component:TableComponent , canActivate:[LoginGuardGuard]},
  {path:'auth' , loadChildren:()=>import('../Modules/auth/auth.module').then((m)=>m.AuthModule)},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
