import { Component, OnInit, Input } from '@angular/core';

import { AppService } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.css']
})
export class SourcesComponent implements OnInit {

  @Input() networkType: string;
  subscription: Subscription;
  objectKeys = Object.keys;
  items = {
    "application stores" : 0,
    "social media" : 0,
    "paste sites" : 0,
    "others" : 0,
  }

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.subscription = this.appService.dataArr.subscribe((value) => {
      this.items = this.appService.sortSourceType(value, this.networkType);
    })
  }

}
