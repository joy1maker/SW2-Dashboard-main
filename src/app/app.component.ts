import { Component, Injectable, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  afterLogin: boolean = false;

  ngOnInit(): void {
    const loginStatus = localStorage.getItem("loggedIn");
    console.log(loginStatus);
    if (loginStatus) {
      this.afterLogin = true;
    }
  }

  openSensor() {
    window.open(window.location.href + "/sensor", "_blank");
  }

}
