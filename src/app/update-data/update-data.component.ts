import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent implements OnInit {
  constructor(private commonService: CommonService, private http: HttpClient, private route: ActivatedRoute) { }

  private apiUrl = 'https://6548ea34dd8ebcd4ab23dfaf.mockapi.io/tendercuts';

  userDetail: any = {};
  allDatas: any

  updatedDetail: any

  checkData: any = "";

  updateName(val: any) {
    this.userDetail = {
      ...this.userDetail,
      name: val
    }
  }

  updateCon(val: any) {
    this.userDetail = {
      ...this.userDetail,
      contact: val
    }
  }

  updateAge(val: any) {
    this.userDetail = {
      ...this.userDetail,
      age: val
    }
  }

  updateDob(val: any) {
    this.userDetail = {
      ...this.userDetail,
      dob: val
    }
  }

  async submitFun() {

    if (this.urlID === "newuser") {
      try {
        const response = await this.http.post(`${this.apiUrl}`, this.userDetail).toPromise();
        console.log('Data updated successfully:', response);
      }catch(error){
        console.error('Error updating data:', error);
      }
      fetch("https://6548ea34dd8ebcd4ab23dfaf.mockapi.io/tendercuts").then(async (res) => {
        const data = await res.json();
        this.commonService.senData(data);
      });
      alert("New User Added...");
    }
    else {

      this.commonService.senData(this.userDetail);
      console.log(this.updatedDetail);
      try {
        const response = await this.http.put(`${this.apiUrl}/${this.userDetail.id}`, this.userDetail).toPromise();
        console.log('Data updated successfully:', response);
      } catch (error) {
        console.error('Error updating data:', error);
      }
      fetch("https://6548ea34dd8ebcd4ab23dfaf.mockapi.io/tendercuts").then(async (res) => {
        const data = await res.json();
        this.allDatas = data;
      });

      alert("Data Updated...")

    }
  }

  urlID:any

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.urlID = params['id'];
    });

    if (this.urlID !== "newuser") {
      this.commonService.commonMessage.subscribe(data => {
        console.log("kkk"+data);
        this.userDetail = data;
        this.checkData = data;
      });
    }
  }
}
