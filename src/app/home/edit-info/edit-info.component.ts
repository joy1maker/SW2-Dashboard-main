import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { User } from 'src/app/Models/user.model';
import { dbservice } from 'src/app/Services/db.service';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {

  user: User = new User();
  editStatus = false;
  s: boolean = true;
  constructor(private db: dbservice, private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    const username = localStorage.getItem("username");
    if (username) {
      this.user.username = username;

    }
  }


  @ViewChild("f") signupForm: any;



  onSubmit() {
    this.user.password = this.signupForm.value.password;
    this.user.realitvenumber = this.signupForm.value.realitvenumber;
    this.user.country = this.signupForm.value.country;
    let user = this.user;

    this.firestore.collection('users').doc(user.username).set({
      'realtivenumber': user.realitvenumber,

      'password': user.password,
      'country': user.country
    });
    this.editStatus = true;
    localStorage.setItem("realtivenumber", this.signupForm.value.realitvenumber);
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
