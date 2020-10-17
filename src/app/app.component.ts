import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  inputs: ['dataItems', 'cryptoItems']
})
export class AppComponent {
  title = 'my-app';
  url = `https://api.bitpanda.com/v1/masterdata`;
  cryptoItems = [];
  dataItems = [];


  constructor(private http: HttpClient) {
    this.http.get(this.url).toPromise().then(data => {
      // console.log(data);


      for (let attributes in data) {
        let dataAttributes = data[attributes];
        let key = Object.keys(dataAttributes)[1];
        let val = Object.values(dataAttributes)[1];

        let cryptocoins = val['cryptocoins'];
        let commodities = val['commodities'];
        let fiats = val['fiats'];
        let indexes = val['indexes'];

        cryptocoins.forEach((cryptocoin) => {
          let cryptocoinAttributes = cryptocoin['attributes'];
          let keys = Object.keys(cryptocoinAttributes);
          let values = Object.values(cryptocoinAttributes);

          let logo;
          let name;
          let color;
          let avgPrice;
          let changesAmount;
          let percentage;

          for (var i = 0; i < keys.length; i++) {
            if (keys[i] === 'logo') {
              logo = values[i];
            }
            if (keys[i] === 'name') {
              name = values[i];
            }
            if (keys[i] === 'color') {
              color = values[i];
            }
            if (keys[i] === 'avg_price') {
              avgPrice = values[i];
            }
            if (keys[i] === 'change_24h_amount') {
              changesAmount = values[i];
            }
            percentage = changesAmount / (avgPrice - changesAmount);
          }
          this.cryptoItems.push({
            logo: logo,
            name: name,
            color: color,
            averagePrice: avgPrice,
            changes24h: changesAmount,
            percentage: percentage,
          })
        })

        indexes.forEach((index) => {
          let indexAttributes = index['attributes'];
          let keys = Object.keys(indexAttributes);
          let values = Object.values(indexAttributes);

          let logo;
          let name;
          let avgPrice;
          let changesAmount;
          let fiatSymbol;

          for (var i = 0; i < keys.length; i++) {
            if (keys[i] === 'logo') {
              logo = values[i];
              // this.dataItems.push({ logo: logo });
            }
            if (keys[i] === 'name') {
              name = values[i];
              // this.dataItems.push({ name: name });
            }
            if (keys[i] === 'avg_price') {
              avgPrice = values[i];
              // this.dataItems.push({ averagePrice: avgPrice });
            }
            if (keys[i] == 'change_24h_amount') {
              changesAmount = values[i];
              // this.dataItems.push({ changes24h: changesAmount });
            };
            if (keys[i] == 'index_original_fiat_symbol') {
              fiatSymbol = values[i];
              // this.dataItems.push({ currency: fiatSymbol });
            }
          }
          this.dataItems.push({
            logo: logo,
            name: name,
            averagePrice: avgPrice,
            changes24h: changesAmount,
            currency: fiatSymbol,
          })
          // console.log(this.dataItems);
        })
      }
    });
  }
}
/* The above function: when our AppComponent is created it's going to immediatly request the data from our URL endpoint and then console.log it*/

/* The reason to call toPromise is because get returns an observable so there is no real point in observing a get request. You are just getting the data once so you may as well turn it to a promise. */

/* To show the values in JSON in our HTML we create an array dataItems, iterate over every key in data to make sure that that key is actually a real property of the data and push these dataItems to array */