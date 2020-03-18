import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-risk-meter',
  templateUrl: './risk-meter.component.html',
  styleUrls: ['./risk-meter.component.css']
})
export class RiskMeterComponent implements OnInit {
  percent = '0%';
  subscription: Subscription;
  riskCalc = [];
  
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.subscription = this.appService.riskScore.subscribe(value =>{
      this.riskCalc.push(value);
      if(this.riskCalc.length == 4){
        let sum = this.riskCalc.reduce((a, b) => a + b);
        this.percent = Math.round(sum/4) + '%';
      }
    })
  }

}
