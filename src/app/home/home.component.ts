import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  loginstatus = false;
  ngOnInit(): void {
    const val = localStorage.getItem("loggedIn");
    if (val) {
      this.loginstatus = true;

    }
  }
  name: string = "test";
  onLogin(user: User) {
    this.name = user.username!;
  }

}
