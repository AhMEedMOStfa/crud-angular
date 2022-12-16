import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/Header/Header.component';
import { NotFoundComponent } from './components/NotFound/NotFound.component';
import { TableComponent } from './components/EmployeeTable/Table.component';
import { EmployeeFormComponent } from './components/EmployeeForm/EmployeeForm.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from "./components/UpdateForm/Details.component";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        TableComponent,
        NotFoundComponent,
        EmployeeFormComponent,
        DetailsComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
    ]
})
export class AppModule { }
