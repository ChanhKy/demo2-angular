import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './general/dashboard/dashboard.component';
import { SalaryComponent } from './salary/salary.component';


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./general/general.module').then(module => module.GeneralModule)
  },
  {
    path: 'department',
    loadChildren: () => import('./department/department.module').then(module => module.DepartmentModule),
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(module => module.EmployeeModule),
  },
  {
    path: 'salary',
    component: SalaryComponent
  },
  {
    path: 'login' , component: LoginComponent
  },
  {
    path: 'register' , component: RegisterComponent
  },
  {
    path: 'profile' , component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
