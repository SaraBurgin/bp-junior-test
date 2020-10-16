import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  inputs: ['items']
})
export class AppComponent {
  title = 'my-app';
  url = `https://api.bitpanda.com/v1/masterdata`;
  items = [];

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
        // console.log(indexes);

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
              // this.items.push({ logo: logo });
            }
            if (keys[i] === 'name') {
              name = values[i];
              // this.items.push({ name: name });
            }
            if (keys[i] === 'avg_price') {
              avgPrice = values[i];
              // this.items.push({ averagePrice: avgPrice });
            }
            if (keys[i] == 'change_24h_amount') {
              changesAmount = values[i];
              // this.items.push({ changes24h: changesAmount });
            };
            if (keys[i] == 'index_original_fiat_symbol') {
              fiatSymbol = values[i];
              // this.items.push({ currency: fiatSymbol });
            }
          }
          this.items.push({
            logo: logo,
            name: name,
            averagePrice: avgPrice,
            changes24h: changesAmount,
            currency: fiatSymbol,
          })
          console.log(this.items);
        })
      }
    });
  }
}
/* The above function: when our AppComponent is created it's going to immediatly request the data from our URL endpoint and then console.log it*/

/* The reason to call toPromise is because get returns an observable so there is no real point in observing a get request. You are just getting the data once so you may as well turn it to a promise. */

/* To show the values in JSON in our HTML we create an array items, iterate over every key in data to make sure that that key is actually a real property of the data and push these items to array */