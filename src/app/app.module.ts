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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { apiReducer } from './store/reducer';
import { ApiEffects } from './store/effects';
import { ApiService } from './api.service';
import { ToastrModule } from 'ngx-toastr';
import { MapComponent } from './map/map.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

@NgModule({
  declarations: [
    AppComponent,
    DataManageComponent,
    AboutUsComponent,
    UpdateDataComponent,
    MapComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    StoreModule.forRoot({api: apiReducer}),
    EffectsModule.forRoot([ApiEffects]),
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
