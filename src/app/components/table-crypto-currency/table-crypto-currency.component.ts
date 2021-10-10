import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwitchCurrencyComponent } from '../switch-currency/switch-currency.component';
import { CoinGeckoApiService } from '../../services/coin-gecko-api.service';
import { Coin } from './coin';

@Component({
  selector: 'app-table-crypto-currency',
  templateUrl: './table-crypto-currency.component.html',
  styleUrls: ['./table-crypto-currency.component.css']
})
export class TableCryptoCurrencyComponent implements OnInit {
  public coins: Coin[] = [];
  public filteredCoints: Coin[] = [];
  public searchText: string = '';
  // public numberCoin: number = 4900;
  public perPage: number = 0;
  public page: number = 1;
  public titles: string[] = [
    '#', 
    'TABLE.COIN', 
    'TABLE.PRICE',  
    'TABLE.PRICE_CHANGE', 
    'TABLE.24H_VOLUME', 
    'TABLE.MARKET_CAP', 
    'TABLE.CIRCULATING_SUPPLY', 
    'TABLE.MAX_SUPPLY'];
  
  constructor(
    private _http: HttpClient,
    private _coinGeckoApiService: CoinGeckoApiService) { }

  ngOnInit(): void {
    // this.numberOfCoins();
    // let currency = this._switchCurrencyComponent.getCurrentCurrency();
    this.callAPICoinGuecko('usd');
    // this.coins = this._coinGeckoApiService.getCoins();
  }
  
  // public numberOfCoins(): void {
  //   // calculer le nombre de page pour l'appelle de l'api
  //   if (this.numberCoin < 250) {
  //     this.perPage = this.numberCoin;
  //   } else {
  //     this.perPage = this.numberCoin%250;
  //     this.page = Math.floor(this.numberCoin/250);
  //   }
  // }

  public callAPICoinGuecko(currency: string): void {
    for (let i=1; i <= 5; i ++) {
      this._http.get<Coin[]>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=2&page=${i}&sparkline=false`).subscribe(
        (res) => {
          this.coins = this.coins.concat(res);
          this.coins = this.coins.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
          this.filteredCoints = this.coins;
        },
        (err) => console.error(err)
      );
    }
  }

  public searchCoin(): void {
    this.filteredCoints = this.coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  
}
