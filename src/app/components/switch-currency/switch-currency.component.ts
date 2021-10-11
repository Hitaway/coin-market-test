import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
@Component({
  selector: 'app-switch-currency',
  templateUrl: './switch-currency.component.html',
  styleUrls: ['./switch-currency.component.css']
})
export class SwitchCurrencyComponent {
  
  constructor (public currencyService: CurrencyService) { }

  // Switch currency
  public switchCurrency(currency: string) {
    this.currencyService.setCurrentCurrency(currency);
    this.currencyService.sendChangeCurrencyEvent();
  }

}
