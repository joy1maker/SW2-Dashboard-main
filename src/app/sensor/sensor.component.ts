import { Component, OnInit } from '@angular/core';
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc
} from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { dbservice } from '../Services/db.service';
import { Firestore } from '@angular/fire/firestore'
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

  constructor(private db: dbservice, private firestore: AngularFirestore) {

  }

  ngOnInit(): void {


  }
  public HRSensorReading: any;                      // form input of new sensor value
  public BPSensorReading: any;

  public historicalHeartRate?: any[];                       // stored data from Firebase (or hardcoded for testing)

  public currentSensorReadings: any;                      // current sensor readings for a given collection


  insertData() {
    let docNameCurrent = 'curReading';
    this.firestore.collection('senses').doc(docNameCurrent)
      .set({
        'hr': this.HRSensorReading,
        'bp': this.BPSensorReading,

      });

  }

}
