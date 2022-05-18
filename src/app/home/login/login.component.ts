import { Component, OnInit, ViewChild } from '@angular/core';
import { collectionSnapshots } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { User } from 'src/app/Models/user.model';
import { dbservice } from 'src/app/Services/db.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @ViewChild("f") loginForm: any;
  users: any;
  constructor(private db: dbservice) {

  }
  errStatus: boolean = false;
  errMsg: string = "";
  loginshow = true;

  ngOnInit() {
    const loginStatus = localStorage.getItem("loggedIn");
    if (loginStatus) {
      if (loginStatus == "t") {
        this.loginshow = false;
      }
    }
    let promise = new Promise((resolve, err) => {
      collectionSnapshots(this.db.getUser()).pipe(
        map((listOfUsers: any) => {

          return listOfUsers.map((document: any) => {
            return ({ id: document.id, ...document.data() })
          })
        })
      ).subscribe(data => {

        resolve(data);
      });
    });
    promise.then(results => {
      this.users = results;
      console.log(this.users);
    })

  }
  user: User = {
    id: "",
    username: "",
    password: "",
    realitvenumber: ""
  }



  fillInfo(user: any) {
    console.log(this.user)
    localStorage.setItem("username", user.username);
    localStorage.setItem("userpassword", user.password);
    localStorage.setItem("loggedIn", "t");
    localStorage.setItem("realtiveNumber", user.realitvenumber)
    window.location.reload();

  }
  onSubmit(user: User) {
    this.user = user;
    let found = false;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == this.user.username) {
        if (this.users[i].password == this.user.password) {
          this.errStatus = false;

          user.realitvenumber = this.users[i].realtivenumber;
          this.fillInfo(user);
          return;
        }
        else {
          this.errMsg = "login cardentials is false"
          this.errStatus = true;
          found = true;
        }
      }
    }
    if (!found) {
      this.errMsg = "username not found"
      this.errStatus = true;
    }
  }
}
