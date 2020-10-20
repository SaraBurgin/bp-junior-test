import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  inputs: ['cryptoItems', 'metalItems', 'fiatItems', 'indexItems']
})
export class AppComponent {
  title = 'my-app';
  url = `https://api.bitpanda.com/v1/masterdata`;
  cryptoItems = [];
  metalItems = [];
  fiatItems = [];
  indexItems = [];


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


        // CRYPTOCURRENCIES
        cryptocoins.forEach((cryptocoin) => {
          let cryptocoinAttributes = cryptocoin['attributes'];
          let keys = Object.keys(cryptocoinAttributes);
          let values = Object.values(cryptocoinAttributes);

          let logo;
          let name;
          let symbol;
          let color;
          let avgPrice;
          let changesAmount;
          let percentage;
          let newPercentage;

          for (var i = 0; i < keys.length; i++) {
            if (keys[i] === 'logo') {
              logo = values[i];
            }
            if (keys[i] === 'name') {
              name = values[i];
            }
            if (keys[i] === 'symbol') {
              symbol = values[i];
            }
            if (keys[i] === 'color') {
              color = values[i];
            }
            if (keys[i] === 'avg_price') {
              avgPrice = values[i];
            }
            if (keys[i] === 'change_24h_amount') {
              changesAmount = (values[i]);
            }
            percentage = changesAmount / (avgPrice - changesAmount);
            newPercentage = percentage.toFixed(3);
          }
          this.cryptoItems.push({
            logo: logo,
            name: name,
            symbol: symbol,
            color: color,
            averagePrice: avgPrice,
            changes24h: changesAmount,
            percentage: newPercentage,
          })
        });

        // COMMODITIES -> METALS
        commodities.forEach((metal) => {
          let metalAttributes = metal['attributes'];
          let keys = Object.keys(metalAttributes);
          let values = Object.values(metalAttributes);

          let logo;
          let name;
          let symbol;
          let color;
          let avgPrice;
          let changesAmount;
          let percentage;
          let newPercentage;

          for (var i = 0; i < keys.length; i++) {
            if (keys[i] === 'logo') {
              logo = values[i];
            }
            if (keys[i] === 'name') {
              name = values[i];
            }
            if (keys[i] === 'symbol') {
              symbol = values[i];
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
            newPercentage = percentage.toFixed(3);
          }

          this.metalItems.push({
            logo: logo,
            name: name,
            symbol: symbol,
            color: color,
            averagePrice: avgPrice,
            changes24h: changesAmount,
            percentage: newPercentage,
          })
        })

        // FIAT ITEMS
        fiats.forEach((fiat) => {
          let fiatAttributes = fiat['attributes'];
          let keys = Object.keys(fiatAttributes);
          let values = Object.values(fiatAttributes);

          let name;
          let logo;
          let minWithdraw;
          let newMinWithdraw;
          let symbol;

          for (var i = 0; i < keys.length; i++) {
            if (keys[i] === 'name') {
              if (values[i] === 'Australian dollar') {
                return;
              } else if (values[i] === 'Gold') {
                return;
              } else if (values[i] === 'Canadian dollar') {
                return;
              } else {
                name = values[i];
              }
            }
            if (keys[i] === 'logo_color') {
              logo = values[i];
            }
            if (keys[i] === 'min_withdraw_euro') {
              minWithdraw = values[i];
              newMinWithdraw = parseInt(minWithdraw).toFixed(2);
            }
            if (keys[i] === 'symbol_character') {
              symbol = values[i];
            }
          }

          this.fiatItems.push({
            name: name,
            logo: logo,
            minimumWithdraw: newMinWithdraw,
            symbol: symbol,
          })
          console.log(this.fiatItems);

        })

        // INDEXES
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
            }
            if (keys[i] === 'name') {
              name = values[i];
            }
            if (keys[i] === 'avg_price') {
              avgPrice = values[i];
            }
            if (keys[i] == 'change_24h_amount') {
              changesAmount = values[i];
            };
            if (keys[i] == 'index_original_fiat_symbol') {
              fiatSymbol = values[i];
            }
          }
          this.indexItems.push({
            logo: logo,
            name: name,
            averagePrice: avgPrice,
            changes24h: changesAmount,
            currency: fiatSymbol,
          })
        })
      }
    })
  }
}

/* The above function: when our AppComponent is created it's going to immediatly request the data from our URL endpoint and then console.log it*/

/* The reason to call toPromise is because get returns an observable so there is no real point in observing a get request. You are just getting the data once so you may as well turn it to a promise. */

/* To show the values in JSON in our HTML we create an array indexItems, iterate over every key in data to make sure that that key is actually a real property of the data and push these indexItems to array */