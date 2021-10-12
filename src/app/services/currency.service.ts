import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  
  public subject = new Subject<any>();
  public currencyList: string[] = ['usd', 'eur', 'aud'];
  public currentCurrency: string = 'usd';

  public sendChangeCurrencyEvent(): void {
    this.subject.next();
  }

  public getClickEvent(): Observable<any> {
     return this.subject.asObservable();
  }
  
  public getCurrentCurrency(): string {
    return this.currentCurrency;
  }
  
  public setCurrentCurrency(currency: string): void {
    this.currentCurrency = currency;
  }

}