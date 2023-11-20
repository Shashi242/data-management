import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { CommonService } from '../common.service';
import { Store, select } from '@ngrx/store';
import * as apiActions from '../store/actions';
import { Observable } from 'rxjs';
import { AppState, selectLoading } from '../store/reducer';

@Component({
  selector: 'app-data-manage',
  templateUrl: './data-manage.component.html',
  styleUrls: ['./data-manage.component.css'],
})
export class DataManageComponent implements OnInit {

  loading$: any;

  // hide columns
  hideContact: boolean = true
  hideAge: boolean = true
  hideDob: boolean = true
  hiddenColumns: any = []

  // variables for dropDown
  dropdownList: any = []
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {}

  columndropdown: IDropdownSettings = {}
  columnDropdownList: any = []
  columnSelectedItems: any = [];

  // all datas
  allDatas: any = []
  allData2: any;
  dltedData: any = {}

  newArray: any = [];
  selectedName: any = [];
  table1: boolean = false;

  numOfleads: Number = 0;
  numOfdeletedLeads: Number = 0;

  dataTypee = 'All';
  apiData: any


  // variables for pagination
  page: number = 1
  count: number = 0
  tableSize: number = 9
  tableSizes: any = [5, 10, 15, 20]


  constructor(private commonService: CommonService, private store: Store<any>, private store2: Store<AppState>,) {
    this.loading$ = this.store2.pipe(select(selectLoading));
    console.log("Loading data are there...", this.loading$.actionsObserver);
  }


  ngOnInit(): void {
    // storing data from api to redux

    console.log("ng OnInit called.....");
    this.store.dispatch(apiActions.loadAPIData());

    this.apiData = this.store.select('api');

    this.apiData.subscribe((data: any) => {


      this.allData2 = data.data;

      this.allDatas = [];
      let dltedLeads = 0;
      let notDlted = 0;
      this.dropdownList = [];


      if (this.allData2) {

        if (this.dataTypee === "All Leads") {

        if (this.selectedItems.length !== 0) {
          let count = 0;
          this.allData2.map((data: any) => {
            if (data.delete === false) {
              this.selectedItems.map((item: any) => {
                if (item.item_id === data.id) {
                  this.allDatas.push(data);
                }
              })
              count++;
            }
          })

          this.numOfleads = count;
          this.numOfdeletedLeads = this.allData2.length - count;
          return;
        }

      }

        // if (this.dataTypee === "Deleted") {
        //   console.log("asasasas",this.columnSelectedItems);

        //   if (this.columnSelectedItems.length !== 0){

        //     let count = 0;
        //     this.allData2.map((data: any) => {
        //       if (data.delete === true){
        //         this.columnSelectedItems.map((item: any) => {
        //           if (item.item_id === data.id) {
        //             this.allDatas.push(data);
        //           }
        //         })
        //         count++;
        //       }
        //     })
        //     this.numOfdeletedLeads = count; 
        //     this.numOfleads = this.allData2.length - count;
        //     return;

        //   }

        // }


        this.allData2.map((data: any) => {
          if (data.delete === true) {
            dltedLeads++;
          }
          else if (data.delete == false) {
            notDlted++;
          }

          if (this.dataTypee === "All") {
            if (data.delete === false) {
              this.allDatas.push(data);
              // this.rowsCount.push(this.rowsNum++);
              this.dropdownList = [
                ...this.dropdownList,
                {
                  item_id: data.id,
                  item_text: data.name,
                }
              ]
            }
          }
          else if (this.dataTypee === "Deleted") {
            if (data.delete === true) {
              this.allDatas.push(data);
              // this.rowsCount.push(this.rowsNum++);
              this.dropdownList = [
                ...this.dropdownList,
                {
                  item_id: data.id,
                  item_text: data.name,
                }
              ]
            }
          }

        });

      }

      this.numOfleads = notDlted;
      this.numOfdeletedLeads = dltedLeads;

    })

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
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

  loadData() {
    this.columnDropdownList = [
      {
        item_id: 1,
        item_text: "Primary Number",
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
    this.columnSelectedItems = [...this.columnDropdownList];
  };


  onTableDataChange(event: any) {
    this.page = event
  }
  onTableSizeChange(event: any) {
    this.tableSize = event.target.value
    this.page = 1
  }


  changeRows(val: any) {
    this.page = 1;

    if (val !== "All") {
      this.tableSize = val;
    }
    else if (val === "All") {
      this.tableSize = this.allDatas.length;
    }
    else {
      this.tableSize = 10;
    }

  }



  onItemSelect(item: any) {
    // this.table1 = true;
    this.allData2.map((data2: any) => {
      if (data2.id === item.item_id) {
        this.newArray = [
          ...this.newArray,
          data2
        ]
      }
    })
    this.allDatas = this.newArray;
    this.page = 1;
    // this.tableSize = this.allDatas.length;
  }


  deSelect(item: any) {
    this.newArray = this.newArray.filter((data: any) => data.name !== item.item_text);
    this.allDatas = this.newArray;
    this.tableSize = this.allDatas.length;

    if (this.newArray.length === 0) {
      // this.table1 = false;
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
    this.tableSize = 9;
    // this.table1 = false
  }

  onSelectAll(items: any) {

    // this.table1 = true;


    if (this.dataTypee === "All") {
      this.allDatas = []
      this.allData2.map((data: any) => {
        if (data.delete === false) {
          this.allDatas.push(data);
        }
      });
      this.newArray = this.allDatas
      this.page = 1;
      this.tableSize = this.allDatas.length;
    }
    else if (this.dataTypee === "Deleted") {
      this.allDatas = []
      this.allData2.map((data: any) => {
        if (data.delete === true) {
          this.allDatas.push(data);
        }
      });
      this.newArray = this.allDatas;
      this.page = 1;
      this.tableSize = this.allDatas.length;
    }

    this.tableSize = this.allDatas.length;

  }





  dltData(data: any) {

    this.selectedItems = this.selectedItems.filter((item: any) => item.item_id !== data.id);
    // this.allDatas = this.allDatas.filter((item:any) => item.id !== data.id);


    // this.selectedItems = [];

    this.dltedData = {
      delete: true
    }

    this.store.dispatch(apiActions.putItem({ id: data.id, item: this.dltedData }));

  }

  reStore(data: any) {

    // this.columnSelectedItems = this.columnSelectedItems.filter((item: any) => item.item_id !== data.id);
    // console.log("kkkkkkk",this.columnSelectedItems)

    this.dltedData = {
      delete: false
    }

    this.store.dispatch(apiActions.putItem({ id: data.id, item: this.dltedData }));


    // setTimeout(() => {
    //   this.store.dispatch(apiActions.loadAPIData());
    // }, 1500)

  }

  // dataTypee:string = "All";
  showData(val: any) {
    this.dataTypee = val;
    if (val === "Deleted") {
      this.page = 1
      this.dropdownList = [];
      this.allDatas = [];
      this.selectedItems = [];

      this.allData2.map((data: any) => {

        if (data.delete === true) {
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
      this.page = 1;
      this.dropdownList = [];
      this.allDatas = [];
      this.selectedItems = [];


      this.allData2.map((data: any) => {
        if (data.delete === false) {
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


  }


  editFun(data: any) {
    this.commonService.senData(data);
  }



  onColumnSelect(data: any) {

    this.hideContact = false
    this.hideAge = false
    this.hideDob = false

    if (!this.hiddenColumns.includes(data.item_id)) {
      this.hiddenColumns.push(data.item_id);
    }
    if (this.hiddenColumns.includes(1)) {
      this.hideContact = true;
    }
    if (this.hiddenColumns.includes(2)) {
      this.hideAge = true;
    }
    if (this.hiddenColumns.includes(3)) {
      this.hideDob = true;
    }

  }

  deSelectColumn(data: any) {

    if (data.item_id === 1) {
      this.hideContact = false
      this.hiddenColumns.splice(this.hiddenColumns.indexOf(data.item_id), 1);
    }
    else if (data.item_id === 2) {
      this.hideAge = false
      this.hiddenColumns.splice(this.hiddenColumns.indexOf(data.item_id), 1);
    }
    else if (data.item_id === 3) {
      this.hideDob = false
      this.hiddenColumns.splice(this.hiddenColumns.indexOf(data.item_id), 1);
    }
  }

  onSelectAllColumn(data: any) {
    this.hideContact = true;
    this.hideAge = true;
    this.hideDob = true;

  }

  onUnselectAllColumn() {
    this.hideContact = false;
    this.hideAge = false;
    this.hideDob = false;

  }

}
