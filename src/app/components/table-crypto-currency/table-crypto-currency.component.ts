import { Component, OnInit } from '@angular/core';
import { CoinGeckoApiService } from '../../services/coin-gecko-api.service';
import { CurrencyService } from '../../services/currency.service';
import { Coin } from './coin';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-crypto-currency',
  templateUrl: './table-crypto-currency.component.html',
  styleUrls: ['./table-crypto-currency.component.css']
})
export class TableCryptoCurrencyComponent implements OnInit {
  
  public clickEventSubscription: Subscription;
  public coins: Coin[] = [];
  public filteredCoints: Coin[] = [];
  public searchText: string = '';
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
    private _currencyService:CurrencyService, 
    private _coinGeckoApiService: CoinGeckoApiService) {
    this.clickEventSubscription = this._currencyService
      .getClickEvent()
      .subscribe(()=>{
        this.updateTable();
    })
  }
  
  ngOnInit(): void {
    this.getCoins();
  }

  public updateTable(): void {
    this.getCoins();
  }
  
  public getCoins(): void {
    this._coinGeckoApiService.getCoins()
    .subscribe(coins => {
      this.coins = coins;
      this.filteredCoints = coins;
    });
  }
  
  public searchCoin(): void {
    this.filteredCoints = this.coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  
}
