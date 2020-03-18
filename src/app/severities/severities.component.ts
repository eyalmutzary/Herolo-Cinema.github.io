import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-severities',
  templateUrl: './severities.component.html',
  styleUrls: ['./severities.component.css']
})
export class SeveritiesComponent implements OnInit {

  @ViewChild('red',{ static: false }) redElement;
  @ViewChild('orange',{ static: false }) orangeElement;
  @ViewChild('blue',{ static: false }) blueElement;
  @Input() networkType: string;
  subscription: Subscription;
  severitiesData = {
    "High": 0,
    "Medium": 0,
    "Low": 0
  };
  severitiesPercents;

  constructor (private appService: AppService){}

  ngOnInit() {
    this.subscription = this.appService.dataArr.subscribe((value) => {
      this.severitiesData = this.appService.sortSeverities(value, this.networkType);
      let totalSev = this.severitiesData.High + this.severitiesData.Medium + this.severitiesData.Low;
      this.severitiesPercents = [
        this.severitiesData.High / totalSev * 100,
        this.severitiesData.Medium / totalSev * 100,
        this.severitiesData.Low / totalSev * 100
      ]
      
      this.setCircle();
    })
  }

  setCircle(){
    this.redElement.nativeElement.attributes["stroke-dasharray"].value = this.severitiesPercents[0] + " " + (100-this.severitiesPercents[0]);
    this.orangeElement.nativeElement.attributes["stroke-dasharray"].value = this.severitiesPercents[1] + " " + (100-this.severitiesPercents[1]);
    this.blueElement.nativeElement.attributes["stroke-dasharray"].value = this.severitiesPercents[2] + " " + (100-this.severitiesPercents[2]);
    this.orangeElement.nativeElement.attributes["stroke-dashoffset"].value = 100 - this.severitiesPercents[0] + 25;
    this.blueElement.nativeElement.attributes["stroke-dashoffset"].value = 100 - this.severitiesPercents[0] - this.severitiesPercents[1] + 25;

  }

}
