import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/Header/Header.component';
import { NotFoundComponent } from './components/NotFound/NotFound.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        NotFoundComponent,
        MainLayoutComponent,
        
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
