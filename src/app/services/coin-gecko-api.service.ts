import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { tap, concatMap } from "rxjs/operators";

import { Coin } from '../components/table-crypto-currency/coin';
import { CurrencyService } from './currency.service';

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoApiService {
  
  constructor(
    private _http: HttpClient,
    private _currencyService: CurrencyService) { }
  
  public getCoins(): Observable<Coin[]> {
    let currency = this._currencyService.getCurrentCurrency();
    let per_page = 250;
    let page = 1;
    // for (let i=1; i <= 5; i ++) {
    return this._http.get<Coin[]>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=false`);
    // }
  }
  
  // public callAPICoinGuecko(currency: string): void {
  //   for (let i=1; i <= 5; i ++) {
  //     this._http.get<Coin[]>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=2&page=${i}&sparkline=false`).subscribe(
  //       (res) => {
  //         this.coins = this.coins.concat(res);
  //         this.coins = this.coins.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
  //         this.filteredCoints = this.coins;
  //       },
  //       (err) => console.error(err)
  //     );
  //   }
  // }
  // public numberCoin: number = 4900;
  // public perPage: number = 0;
  // public page: number = 1;
  // public numberOfCoins(): void {
  //   if (this.numberCoin < 250) {
  //     this.perPage = this.numberCoin;
  //   } else {
  //     this.perPage = this.numberCoin%250;
  //     this.page = Math.floor(this.numberCoin/250);
  //   }
  // }

}
