import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Covid } from '../Models/covid.model';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  public covidChartList = new Array();
  private hubConnection:signalR.HubConnection;
  constructor() { }

  private startInvoke(){
    this.hubConnection.invoke("GetCovidList").catch((err) => console.log(err));
  }

  startConnection(){
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl("https://localhost:44309/CovidHub").build();

    this.hubConnection
    .start()
    .then(() => {
      this.startInvoke();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  startListener(){
    this.hubConnection.on("ReceiveCovidList", (covidChart:Covid[]) => {
      this.covidChartList = [];
      covidChart.forEach((item) => {
        this.covidChartList.push([item.covidDate, item.counts[0], item.counts[1], item.counts[2], item.counts[3], item.counts[4]])
      });
    });
  }
}
