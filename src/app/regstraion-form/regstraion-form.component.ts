import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionSnapshots } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { User } from '../Models/user.model';
import { dbservice } from '../Services/db.service';

@Component({
  selector: 'app-regstraion-form',
  templateUrl: './regstraion-form.component.html',
  styleUrls: ['./regstraion-form.component.css']
})
export class RegstraionFormComponent {
  users: any;
  user?: User;
  errStatus: boolean = false;
  errMsg: string = "";
  regStatus = false;
  s: boolean = true;
  formOb = {
    id: "",
    username: "",
    password: "",
    realitvenumber: "",
    country: "",
  }
  @ViewChild("f") signupForm: any;


  constructor(private db: dbservice, private firestore: AngularFirestore) {

  }
  ngOnInit(): void {

    const promise = new Promise(resolve => {
      collectionSnapshots(this.db.getUser()).pipe(
        map((listOfUsers: any) => {

          return listOfUsers.map((document: any) => {
            return ({ id: document.id, ...document.data() })
          })
        })
      ).subscribe(data => {
        resolve(data);
      });

    })

    promise.then(
      result => {
        this.users = result;
        console.log(this.users);
      }
    )

  }





  checkDublcation(user: User) {

    for (let i = 0; i < this.users.length; i++) {
      console.log(this.users[i].username)
      if (this.users[i].username == user.username) {
        this.errMsg = "this username already exist";
        this.errStatus = true;
        return;
      }
    }
    this.errStatus = false;
  }

  onSubmit() {

    this.formOb.username = this.signupForm.value.username;
    this.formOb.password = this.signupForm.value.password;
    this.formOb.realitvenumber = this.signupForm.value.realitvenumber;
    this.formOb.country = this.signupForm.value.country;

    let user: User = new User();
    user = this.formOb;
    this.checkDublcation(user);
    if (this.errStatus) {
      return;
    }
    this.firestore.collection('users').doc(user.username).set({
      'realtivenumber': user.realitvenumber,

      'password': user.password,
      'country': user.country
    });
    this.errStatus = false;
    this.regStatus = true;
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  whenClicked() {

    this.signupForm.setValue({
      username: "jojo",
      password: "123",
      realitvenumber: "011486565",
      counrty: 1
    });


  }
  onlyNumberKey(evt: any): boolean {
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
      console.log(ASCIICode);
      return false;
    }
    return true;
  }
}
