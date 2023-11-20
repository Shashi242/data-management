import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataManageComponent } from './data-manage/data-manage.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {path: "", component: DataManageComponent},
  {path: "update/:id", component: UpdateDataComponent},
  {path: "addnewuser/:id", component: UpdateDataComponent},
  {path: "maps", component: MapComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
