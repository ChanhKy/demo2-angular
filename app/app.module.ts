import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatNativeDateModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatTableDataSource, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './general/header/header.component';
import { MenuComponent } from './general/menu/menu.component';
import { GeneralModule } from './general/general.module';
import { ToastrModule } from 'ngx-toastr';
import { SweetalertComponent } from './general/sweetalert/sweetalert.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { SalaryComponent } from './salary/salary.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SalaryComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GeneralModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),



  ],
  exports: [
    HeaderComponent,
    MenuComponent,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
