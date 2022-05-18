import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { get } from '../Models/get';


@Injectable({
  providedIn: 'root'
})
export class dbservice {

  firebaseConfig = {
    projectId: 'swe2-b7d3c',
    appId: '1:708513393646:web:f169c8867c707966aefcff',
    storageBucket: 'swe2-b7d3c.appspot.com',
    locationId: 'us-west2',
    apiKey: 'AIzaSyCOaHzGnlJtlCHqOQK3g3crivHsdZ86lqo',
    authDomain: 'swe2-b7d3c.firebaseapp.com',
    messagingSenderId: '708513393646',
  }

  constructor(private db: Firestore) { }
  getReading() {
    return collection(this.db, "senses");
  }
  getUser() {
    return collection(this.db, "users");
  }
  getHospital() {
    return collection(this.db, "hospitals")
  }
}
