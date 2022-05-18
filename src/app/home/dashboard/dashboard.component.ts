import { Component, OnInit } from '@angular/core';
import { collectionSnapshots } from '@angular/fire/firestore';


import { map } from 'rxjs';
import { Hospital } from 'src/app/Models/hospital.model';
import { dbservice } from 'src/app/Services/db.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lat: any;
  lng: any;
  heartRate: Number = 0;
  bloodPressure: Number = 0;
  usersList?: any;
  documentsList: any[] = [];
  relativeNum?: any;
  message: String = "";
  msgStatus: boolean = false;
  HospitalList?: any;
  nearestHospitalName?: any;
  username: string = "sayed";

  constructor(private db: dbservice) { }

  getCurUser() {
    const val = localStorage.getItem("username");
    if (val) {
      this.username = val;
    }
  }
  ngOnInit(): void {

    this.getCurUser();
    const cordnatiesPromise = new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      })
    })

    cordnatiesPromise.then(result => {
      console.log(result);
      let data: any = result;
      this.lat = data.lat;
      this.lng = data.lng;
    })

    const hospitalPromise = new Promise(resolve => {
      collectionSnapshots(this.db.getHospital()).pipe(
        map((listOfDoc: any) => {

          return listOfDoc.map((document: any) => {
            return ({ id: document.id, ...document.data() })
          })
        })
      ).subscribe(data => {
        resolve(data);
      });
    })
    hospitalPromise.then(result => {
      this.HospitalList = result;
    }).then(() => {
      this.getNearstHospital();
    }).then(() => {
      this.setMsg();

      collectionSnapshots(this.db.getReading()).pipe(
        map((listOfDoc: any) => {
          return listOfDoc.map((document: any) => {
            return ({ id: document.id, ...document.data() })
          })
        })
      ).subscribe(data => {
        this.documentsList = data;
        this.heartRate = this.documentsList[0].hr;
        this.bloodPressure = this.documentsList[0].bp;
        this.emergency();
      });
    })




  }
  emergency() {
    if ((100 < this.heartRate || 40 > this.heartRate) || (this.bloodPressure >= 140)) {
      this.msgStatus = true;
      localStorage.setItem("graph", "red");
    }
    else {
      this.msgStatus = false;
      localStorage.setItem("graph", "green");
    }
  }


  getNearstHospital() {
    let mn = this.distance(this.lat, this.lng, this.HospitalList[0].lng, this.HospitalList[0].lng, "K");
    this.nearestHospitalName = this.HospitalList[0].id;
    for (let i = 1; i < this.HospitalList.length; i++) {
      let d = this.distance(this.lat, this.lng, this.HospitalList[i].lng, this.HospitalList[i].lng, "K");
      if (d < mn) {
        this.nearestHospitalName = this.HospitalList[i].id;
        mn = d;
      }
    }
    console.log(this.nearestHospitalName);
  }
  distance(lat1: any, lon1: any, lat2: any, lon2: any, unit: any) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") { dist = dist * 1.609344 }
      if (unit == "N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  onLogOut() {
    localStorage.clear();
    window.location.reload();
  }
  setMsg() {
    const val = localStorage.getItem("realtiveNumber");
    console.log(val);
    if (val) {
      console.log("this is realtiveNumber : " + val);
      this.relativeNum = val;

    }
    this.message = "You are in danger the ambulance is coming from " + this.nearestHospitalName + " and we are calling your relative number " + this.relativeNum;
  }

}
