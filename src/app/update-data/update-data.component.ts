import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as apiActions from '../store/actions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { AppState } from '../store/reducer';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent implements OnInit {


  // form validation
  nameValidation: any
  ageValidation: any
  contactValidation: any
  cityValidation: any

  isLoggedIn: boolean = false;

  // user details
  userDetail: any = {};
  updatedDetail: any

  // url id
  urlID: any
  apidata: any

  constructor(private toastr: ToastrService, private commonService: CommonService, private route: ActivatedRoute, private store: Store<any>, private router: Router) {
    this.apidata = store.select('api');
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.urlID = params['id'];
    });

    if (this.urlID !== "newuser") {
      this.commonService.commonMessage.subscribe(data => {
        this.userDetail = data;
      });
    }

  }

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

    if (this.userDetail.contact.length === 10) {
      this.contactValidation = false;
    }
    else{
      this.contactValidation = true;
    }
    // console.log(this.userDetail.contact);
  }

  floatVal:boolean = false;
  floatvalArr:any = [];

  updateAge(val: any) {
    let valArr = val.split("");
    if(valArr.includes(".")){
      this.floatVal = true;
    }
    else{
      this.floatVal = false;
    }
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

  updateAdd(val: any) {
    this.userDetail = {
      ...this.userDetail,
      Address: val
    }
    if(this.userDetail.Address){
      this.cityValidation = false;
    }
  }

  imgSize:boolean = false
  uploadPic:boolean = false;

  onSubmit() {

    // if(this.dataSize >= 45000){
    //   this.imgSize = true;
    //   return;
    // }

    this.nameValidation = false;
    this.ageValidation = false;
    this.contactValidation = false;
    this.cityValidation = false;


    if(!this.userDetail.Address){
      this.cityValidation = true
    }
    if (!this.userDetail.name) {
      this.nameValidation = true;
    }

    if (!this.userDetail.age || this.floatVal || this.userDetail.age < 1 || this.userDetail.age > 100) {
      this.ageValidation = true;
    }

    if (!this.userDetail.contact || this.userDetail.contact.length !== 10 || !/^\d+$/.test(this.userDetail.contact)) {
      this.contactValidation = true;
    }

    if(!this.userDetail.Address){
      this.cityValidation = true;
    }

    if(!this.userDetail.image){
      this.uploadPic = true;
    }

    if (this.nameValidation || this.ageValidation || this.contactValidation || this.cityValidation || !this.userDetail.image)
     {
      console.log('Form validation failed. Please check the fields.');
      this.toastr.success('Form validation failed!', 'Failed');
      return;
    }

    this.isLoggedIn = true;

    if (this.urlID === "newuser") {

      this.store.dispatch(apiActions.postItem({ item: this.userDetail }));
      this.router.navigate(['/']);
    }
    else {

      this.store.dispatch(apiActions.putItem({ id: this.userDetail.id, item: this.userDetail }));
      this.router.navigate(['/']);

    }
  }

  

  selectedFileUrl:any;
  preview:boolean = false;

  dataSize = 0;


  async onFileSelected(event: Event){

    this.uploadPic = false;
    this.imgSize = false;
    this.preview = true;
    const target = event.target as HTMLInputElement;
  
    if (target?.files && target.files.length > 0) {
      const file = target.files[0];
  
      this.selectedFileUrl = await this.readFileAsync(file);

      this.dataSize = this.getFileSizeInBytes(this.selectedFileUrl);

      if(this.dataSize >= 45000){
        this.imgSize = true;
        return;
      }

      this.userDetail = {
        ...this.userDetail,
        image: this.selectedFileUrl
      };
      // console.log('File size:', this.dataSize, 'bytes');

    }
  }
  
  readFileAsync(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }


  getFileSizeInBytes(dataUrl: string): number {
    // Remove metadata prefix to get the base64-encoded data
    const base64Data = dataUrl.split(',')[1];
    // Calculate the size of the base64-encoded data in bytes
    const dataSize = (base64Data.length * 3) / 4 - this.countPaddingChars(base64Data);
    return dataSize;
  }
  
  countPaddingChars(base64String: string): number {
    const paddingChar = '=';
    let paddingCount = 0;
  
    // Count padding characters at the end of the string
    for (let i = base64String.length - 1; base64String.charAt(i) === paddingChar; i--) {
      paddingCount++;
    }
  
    return paddingCount;
  }
  

  // onFileSelected(event: any) {

  //   this.preview = true;
  //   if(event.target.files){
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);
  //     reader.onload = (event:any)=>{
  //       this.selectedFileUrl = event.target.result;

  //       this.userDetail = {
  //         ...this.userDetail,
  //         image: this.selectedFileUrl
  //       }

  //       // if (this.urlID === "newuser"){
  //       //   this.store.dispatch(apiActions.postItem({ item: this.userDetail }));
  //       // }
  //       // else{
  //       //   this.store.dispatch(apiActions.putItem({ id: this.userDetail.id, item: this.userDetail }));
  //       // }

  //     }
  //   }
  // }


  


}
