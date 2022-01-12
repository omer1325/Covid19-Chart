import { Component, OnInit } from '@angular/core';
import { CovidService } from './Services/covid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SignalRAngular';

  columNames = ["Date", "Istanbul", "Ankara", "Izmir", "Konya", "Antalya"]
  options:any = {curveType: 'function', legend: { position: 'bottom' }};

  constructor(public covidService:CovidService){}
  ngOnInit(): void {
    this.covidService.startConnection();
    this.covidService.startListener();
  }

  









}
