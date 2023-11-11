import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataManageComponent } from './data-manage/data-manage.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateDataComponent } from './update-data/update-data.component';
import {NgxPaginationModule} from "ngx-pagination";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    DataManageComponent,
    AboutUsComponent,
    UpdateDataComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
    // NgMultiSelectDropDownModule.forRoot(),
    // FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
