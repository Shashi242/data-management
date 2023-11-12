import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { CommonService } from '../common.service';

@Component({
  selector: 'app-data-manage',
  templateUrl: './data-manage.component.html',
  styleUrls: ['./data-manage.component.css'],
})
export class DataManageComponent implements OnInit {
  // variables for dropDown

  dropdownList: any = []
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {}

  columndropdown: IDropdownSettings = {}
  columnDropdownList: any = []
  columnSelectedItems: any = [];


  // variables for pagination

  page: number = 1
  count: number = 0
  tableSize: number = 7
  tableSizes: any = [5, 10, 15, 20]

  onTableDataChange(event: any) {
    console.log("pageChange", event);
    this.page = event
  }
  onTableSizeChange(event: any) {
    this.tableSize = event.target.value
    this.page = 1
  }


  // allDatas: any[] = []; // Your data array
  dataTypee = 'All'; // Current data type ('All' or 'Deleted')


  private apiUrl = 'https://6548ea34dd8ebcd4ab23dfaf.mockapi.io/tendercuts';

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private commonService: CommonService) { }

  editedData: any = {
    name: String,
    contact: String,
    age: Number,
    dob: String
  }

  editName(name: any) {
    this.editedData = {
      ...this.editedData,
      name: name
    }
  }
  editCon(con: any) {
    this.editedData = {
      ...this.editedData,
      contact: con
    }
  }
  editAge(age: any) {
    this.editedData = {
      ...this.editedData,
      age: age
    }
  }
  editDob(dob: any) {
    this.editedData = {
      ...this.editedData,
      dob: dob
    }
  }

  async datapost(postdata: any) {
    try {
      const response = await this.http.put(`${this.apiUrl}/${postdata.id}`, this.editedData).toPromise();
      console.log('Data updated successfully:', response);
    } catch (error) {
      console.error('Error updating data:', error);
    }
    fetch("https://6548ea34dd8ebcd4ab23dfaf.mockapi.io/tendercuts").then(async (res) => {
      const data = await res.json();
      this.allDatas = data;
    });

  }

  allData2: any;

  ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 0,
      allowSearchFilter: true
    };

    this.columndropdown = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 0,
      allowSearchFilter: true
    }

    this.loadData();

  }

  rowsCount: any = []
  rowsNum: any = 1;

  newData: any
  async loadData() {
    try {
      const response = await fetch("https://6548ea34dd8ebcd4ab23dfaf.mockapi.io/tendercuts");
      const data = await response.json();
      this.allData2 = data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    this.allDatas = [];
    this.allData2.map((data: any) => {
      if (data.delete === false) {
        this.allDatas.push(data);
        this.rowsCount.push(this.rowsNum++);
        this.dropdownList = [
          ...this.dropdownList,
          {
            item_id: data.id,
            item_text: data.name,
            age: data.age
          }
        ]
      }
    });

    this.columnDropdownList = [
      {
        item_id: 1,
        item_text: "Contact",
      },
      {
        item_id: 2,
        item_text: "Age",
      },
      {
        item_id: 3,
        item_text: "Date of Birth",
      },
    ]

    this.commonService.commonMessage.subscribe(data => {
      if (Array.isArray(data)) {
        this.allDatas = data;
      }
      else {
        console.log("new user added 1...");
        this.newData = data;
        this.allDatas = this.allDatas.map((val: any) => {
          if (val.id === this.newData.id) {
            return this.newData
          }
          else {
            return val
          }
        })
      }
    });
  };

  changeRows(val: any) {

    if (val !== "Rows") {

      if (this.dataTypee === "All") {
        let countnum = 0;
        this.allDatas = [];
        this.allData2.map((data: any) => {
          if (countnum < parseInt(val) && data.delete === false) {
            countnum++;
            this.allDatas.push(data);
          }
        })
      }
      else if (this.dataTypee === "Deleted") {
        let countnum = 0;
        this.allDatas = [];
        this.allData2.map((data: any) => {
          if (countnum < parseInt(val) && data.delete === true) {
            countnum++;
            this.allDatas.push(data);
          }
        })
      }

    }
    else{

      if (this.dataTypee === "All"){
        this.allDatas = [];
        this.allData2.map((data: any) => {
          if (data.delete === false){
            this.allDatas.push(data);
          }
        })
      }
      else if (this.dataTypee === "Deleted"){
        this.allDatas = [];
        this.allData2.map((data: any) => {
          if (data.delete === true){
            this.allDatas.push(data);
          }
        })
      }

    }

  }

  newArray: any = [];
  selectedName: any = [];

  onItemSelect(item: any) {
    // console.log("lauu... "+ JSON.stringify(item));
    this.allData2.map((data2: any) => {
      if (data2.id === item.item_id) {
        this.newArray = [
          ...this.newArray,
          data2
        ]
      }
    })
    console.log("Selected Items" + JSON.stringify(this.newArray));
    this.allDatas = this.newArray;
    console.log("all Data: " + JSON.stringify(this.allDatas));
  }
  deSelect(item: any) {
    console.log("Working....")
    this.newArray = this.newArray.filter((data: any) => data.name !== item.item_text);
    this.allDatas = this.newArray;
    if (this.newArray.length === 0) {

      if (this.dataTypee === "All") {
        this.allDatas = []
        this.allData2.map((data: any) => {
          if (data.delete === false) {
            this.allDatas.push(data);
          }
        });
      }
      else if (this.dataTypee === "Deleted") {
        this.allDatas = []
        this.allData2.map((data: any) => {
          if (data.delete === true) {
            this.allDatas.push(data);
          }
        });
      }

    }
  }
  deSelectAll() {
    this.newArray = [];
  }

  onSelectAll(items: any) {
    if (this.dataTypee === "All") {
      this.allDatas = []
      this.allData2.map((data: any) => {
        if (data.delete === false) {
          this.allDatas.push(data);
        }
      });
    }
    else if (this.dataTypee === "Deleted") {
      this.allDatas = []
      this.allData2.map((data: any) => {
        if (data.delete === true) {
          this.allDatas.push(data);
        }
      });
    }
  }


  myName: any = "Shashi Raj";

  isTrue: boolean = true;


  dataPage() {
    this.isTrue = true
  }

  aboutUsPage() {
    this.isTrue = false
  }

  changeName() {
    this.myName = "Banty Raj";
  }

  allDatas: any = []

  dltedData: any = {}


  async dltData(data: any) {

    this.dltedData = {
      delete: true
    }

    try {
      const response = await this.http.put(`${this.apiUrl}/${data.id}`, this.dltedData).toPromise();
      console.log('Data updated successfully:', response);
    } catch (error) {
      console.error('Error updating data:', error);
    }

    fetch("https://6548ea34dd8ebcd4ab23dfaf.mockapi.io/tendercuts").then(async (res) => {
      const data = await res.json();
      this.allData2 = data;
      this.allDatas = [];
      data.map((data: any) => {
        if (data.delete === false) {
          this.allDatas.push(data);
        }
      })
      // this.allDatas = data;
    });

  }

  // dataTypee:string = "All";

  dltDataStr: any
  allDataStr: any
  showData(val: any) {
    this.dataTypee = val;
    if (val === "Deleted") {
      this.dropdownList = [];
      this.allDatas = [];
      this.selectedItems = [];
      this.rowsNum = 1;
      this.rowsCount = [];

      this.allData2.map((data: any) => {
        if (data.delete === true) {
          this.rowsCount.push(this.rowsNum++);
          this.allDatas.push(data);
          this.dropdownList = [
            ...this.dropdownList,
            {
              item_id: data.id,
              item_text: data.name,
            }
          ]
        }
      });
    }
    else if (val === "All") {
      this.dropdownList = [];
      this.allDatas = [];
      this.selectedItems = [];
      this.rowsNum = 1;
      this.rowsCount = [];

      this.allData2.map((data: any) => {
        if (data.delete === false) {
          this.rowsCount.push(this.rowsNum++);
          this.allDatas.push(data);
          this.dropdownList = [
            ...this.dropdownList,
            {
              item_id: data.id,
              item_text: data.name,
              age: data.age
            }
          ]
        }
      });
    }
  }

  editWin: boolean = false
  editDataObj: any = {}

  editFun(data: any) {

    console.log("data sending: " + data);
    this.commonService.senData(data);

    this.editWin = true;
    this.editDataObj = data;
    console.log(this.editDataObj)
  }

  async addNewData() {
    try {
      const response = await this.http.post(`${this.apiUrl}`, this.editedData).toPromise();
      console.log('Data updated successfully:', response);
    } catch (error) {
      console.error('Error updating data:', error);
    }
    fetch("https://6548ea34dd8ebcd4ab23dfaf.mockapi.io/tendercuts").then(async (res) => {
      const data = await res.json();
      this.allDatas = data;
    });
  }

  // hide columns
  hideContact: boolean = true
  hideAge: boolean = true
  hideDob: boolean = true

  onColumnSelect(data: any) {
    if (data.item_id === 1) {
      this.hideContact = false
    }
    else if (data.item_id === 2) {
      this.hideAge = false
    }
    else if (data.item_id === 3) {
      this.hideDob = false
    }
  }

  deSelectColumn(data: any) {
    if (data.item_id === 1) {
      this.hideContact = true
    }
    else if (data.item_id === 2) {
      this.hideAge = true
    }
    else if (data.item_id === 3) {
      this.hideDob = true
    }
  }

  onSelectAllColumn(data: any) {
    this.hideContact = false
    this.hideAge = false
    this.hideDob = false
  }

  deSelectAllColumn() {
    this.hideContact = true
    this.hideAge = true
    this.hideDob = true
  }
}
