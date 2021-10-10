import { Component } from '@angular/core';

@Component({
  selector: 'app-switch-currency',
  templateUrl: './switch-currency.component.html',
  styleUrls: ['./switch-currency.component.css']
})
export class SwitchCurrencyComponent {
  
  public currency: string[] = ['usd', 'eur'];
  public currentCurrency: string = 'usd';

  constructor() { }
  
  public getCurrentCurrency(): string {
    return this.currentCurrency;
  }

  // Switch currency
  public switchCurrency(currency: string) {
    this.currentCurrency = currency;
    console.log(this.currentCurrency);
  }

}
