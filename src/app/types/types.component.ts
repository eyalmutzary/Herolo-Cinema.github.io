import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {
  @Input() networkType: string;
  subscription: Subscription;
  
  types = {
    "AttackIndication": 0,
    "DataLeakage": 0,
    "Phishing": 0,
    "BrandSecurity": 0,
    "ExploitableData": 0,
    "vip": 0
  };


  constructor(private appService: AppService) { }

  ngOnInit() {
    this.subscription = this.appService.dataArr.subscribe((value) => {
      this.types = this.appService.sortTypes(value, this.networkType);
    })
  }

}
