import { Component, AfterViewInit, ViewChildren, ElementRef, QueryList, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { google } from "google-maps";
import * as apiActions from '../store/actions';


declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit {

  randomLocation: any
  mapOptions: any

  apiData: any
  allUsers: any

  allUserCoordinates = [[1]];
  randomVals = [1];

  indiaCoordinates = [
    [12.9716, 77.5946],
    [12.9279, 77.6271],
    [13.0229, 77.6123],
    [12.9545, 77.3507],
    [12.9714, 77.6505],
    [13.1015, 77.592],
    [12.8723, 77.4875],
    [12.966, 77.5877],
    [12.9166, 77.6101],
    [13.0291, 77.5407],
    [13.0611, 77.5933],
    [12.9719, 77.6412],
    [12.992, 77.7156],
    [12.9719, 77.5946],
    [13.0674, 77.6309],
    [12.9545, 77.6006],
    [12.9141, 77.6351],
    [12.9373, 77.6309],
    [12.9668, 77.6485],
    [12.9717, 77.5946]
  ];

  map!: google.maps.Map | undefined;

  constructor(private store: Store<any>) {
    this.apiData = store.select('api');
  }

  ngOnInit(): void {
    this.store.dispatch(apiActions.loadAPIData());
    this.apiData.subscribe((data: any) => {
      this.allUsers = data.data;
    })

    setTimeout(() => {
      this.loadMap();
    }, 1500);
  }

  ngAfterViewInit() {
    setInterval(() => {
      this.loadMap();
    }, 500000);
  }

  loadMap() {

    this.randomVals = [];
    this.allUserCoordinates = [];

    this.allUsers.map((data: any) => {

      let randomIndex = Math.floor(Math.random() * this.indiaCoordinates.length);

      while (this.randomVals.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * this.indiaCoordinates.length);
      }
      this.randomVals.push(randomIndex);

      const randomCoordinates = this.indiaCoordinates[randomIndex];
      this.allUserCoordinates.push(randomCoordinates);

      this.randomLocation = { lat: randomCoordinates[0], lng: randomCoordinates[1] };

      this.mapOptions = google.maps.MapOptions = {
        center: this.randomLocation,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(
        document.getElementById(data.id) as HTMLElement,
        this.mapOptions
      );
      new google.maps.Marker({
        position: this.randomLocation,
        map: this.map,
        title: 'Random Location'
      });

    })

    const randomIndex = Math.floor(Math.random() * this.indiaCoordinates.length)
    const randomCoordinates = this.indiaCoordinates[randomIndex];
    this.randomLocation = { lat: randomCoordinates[0], lng: randomCoordinates[1] };
    this.mapOptions = google.maps.MapOptions = {
      center: this.randomLocation,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(
      document.getElementById("newmap") as HTMLElement,
      this.mapOptions
    );


    this.allUserCoordinates.map((data: any,index) => {
      this.randomLocation = {lat: data[0], lng: data[1]};
      new google.maps.Marker({
        position: this.randomLocation,
        map: this.map,
        title: 'Random Location',
        icon: {
          url: this.allUsers[index].image,
          scaledSize: new google.maps.Size(20, 20),
        },
      });


    })

  }

}
