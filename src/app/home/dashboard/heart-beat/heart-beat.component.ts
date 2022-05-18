import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CanvasElement, NgCanvasElement, NgCanvas } from 'angular-canvas';


@Component({
  selector: 'app-heart-beat',
  templateUrl: './heart-beat.component.html',
  styleUrls: ['./heart-beat.component.css'],

})
export class HeartBeatComponent implements OnInit {

  public canvasHeartRate: any;                             // HTML canvas
  public ctxHeartRate: any;                                // context for the HTML canvas
  public chartHeartRate: any;                              // chart object for Chart.js
  public heartRateSensorReading: any;                      // form input of new sensor value
  public data = [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 86, 82, 78, 74, 78, 82, 86, 90, 94, 98, 102, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 140, 130, 120, 110, 100, 90, 80, 85, 90, 95, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 86, 82, 78, 74, 78, 82, 86, 90, 94, 98, 102, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 140, 130, 120, 110, 100, 90, 80, 85, 90, 95, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 86, 82, 78, 74, 78, 82, 86, 90, 94, 98, 102, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 140, 130, 120, 110, 100, 90, 80, 85, 90, 95, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 86, 82, 78, 74, 78, 82, 86, 90, 94, 98, 102, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 140, 130, 120, 110, 100, 90, 80, 85, 90, 95, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 86, 82, 78, 74, 78, 82, 86, 90, 94, 98, 102, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 140, 130, 120, 110, 100, 90, 80, 85, 90, 95, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 86, 82, 78, 74, 78, 82, 86, 90, 94, 98, 102, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 140, 130, 120, 110, 100, 90, 80, 85, 90, 95, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90];
  public fps: number = 60;
  n = 1;
  ngOnInit(): void {
    this.initHeartRateChart();

  }

  initHeartRateChart() {
    this.canvasHeartRate = document.getElementById('canvas');
    this.ctxHeartRate = this.canvasHeartRate.getContext('2d');
    this.ctxHeartRate.fillStyle = "#dbbd7a";
    this.ctxHeartRate.fill();
    this.drawWave();
  }
  drawWave = () => {
    setTimeout(() => {
      requestAnimationFrame(this.drawWave);
      this.ctxHeartRate.lineWidth = "2";
      this.ctxHeartRate.strokeStyle = this.getCoulor();
      this.n += 1;
      if (this.n >= this.data.length) {
        this.n = 1;
      }
      this.ctxHeartRate.beginPath();
      this.ctxHeartRate.moveTo(this.n - 1, this.data[this.n - 1]);
      this.ctxHeartRate.lineTo(this.n, this.data[this.n]);
      this.ctxHeartRate.stroke();

      this.ctxHeartRate.clearRect(this.n + 1, 0, 10, this.canvasHeartRate.height);

    }, 1000 / this.fps);
  }
  getCoulor() {
    const val = localStorage.getItem("graph");
    if (val) {
      return val;
    }
    return "green";
  }
}
