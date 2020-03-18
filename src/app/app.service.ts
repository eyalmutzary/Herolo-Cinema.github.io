import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

export interface ResponseData{
  date: Date, 
  severity: string, 
  type: string, 
  sourceType: string,
  networkType: string
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  dataArr = new Subject<ResponseData[]>();
  riskScore = new Subject<Number>();


  constructor(private http: HttpClient) { }


  
  fetchData() {
    this.http.get<ResponseData[]>('./assets/data.json').subscribe(
      resData => {
        // resData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        // resData = resData.slice(0,300);
        this.dataArr.next(resData);
      }
    );
  }


  sortSourceType(dataArr: ResponseData[], webCategory: string){
    let count = 0;
    let sources = {
        "application stores" : 0,
        "social media" : 0,
        "hacking forums" : 0,
        "paste sites" : 0,
        "others" : 0,
    };
    dataArr.forEach(data => {
      if(data.networkType == webCategory)
      {
        count++;
        switch(data.sourceType){
          case 'ApplicationStores': sources['application stores']++; break;
          case 'SocialMedia': sources['social media']++; break;
          case 'HackingForums': sources['hacking forums']++; break;
          case 'PasteSites': sources['paste sites']++; break;
          default: sources['others']++;
        }
      } 
    });
    if(webCategory == "ClearWeb"){
      count -= sources['hacking forums'];
      delete sources['hacking forums'];
      sources["social media"] /= (count / 100);
    }
    else { 
      count -= sources['social media'];
      delete sources['social media']
      sources["hacking forums"] /= (count / 100);
    }
    sources["application stores"] /= (count / 100);
    sources['paste sites'] /= (count / 100);
    sources['others'] /= (count / 100);
    
    return sources;
  }

  sortSeverities(dataArr: ResponseData[], webCategory: string){
    let count = 0;
    let severities = {
      "High": 0,
      "Medium": 0,
      "Low": 0
    };
    dataArr.forEach(data => {
      if(data.networkType == webCategory)
      {
        count++;
        severities[data.severity]++;
      } 
    });
    this.riskScore.next((severities['High'] * 100 + severities['Medium'] * 70 + severities['Low'] * 40)/count);
    return severities;
  }


  sortTypes(dataArr: ResponseData[], webCategory: string){
    let count = 0;
    let types = {
      "AttackIndication": 0,
      "DataLeakage": 0,
      "Phishing": 0,
      "BrandSecurity": 0,
      "ExploitableData": 0,
      "vip": 0
    };
    dataArr.forEach(data => {
      if(data.networkType == webCategory)
      {
        count++;
        types[data.type]++;
      } 
    });
    let riskScore = (types['AttackIndication'] * 80 +
      types['DataLeakage'] * 20 +
      types['Phishing'] * 10 +
      types['BrandSecurity'] * 40 +
      types['ExploitableData'] * 60 +
      types['vip'] * 100) / count;
    this.riskScore.next(riskScore);
    return types;
  }
  

}
