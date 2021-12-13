import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyEnums } from 'src/enums';
import { CurrencyResponse } from 'src/interfaces/currency.interface';
import { CurrencyConverterService } from 'src/services/currency-converter.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {

  public allCurrencies:string[] = [];
  public currencyConverterForm:FormGroup;
  // public currentExchangeRate:ExchangeRate ;

  public static currencyConverterForm = () => ({
    baseValue:['', Validators.compose([Validators.required])],
    targetValue:['', Validators.compose([Validators.required])],
  })

  constructor(private readonly currencyConverterService:CurrencyConverterService,
    private fb:FormBuilder){

      this.currencyConverterForm = this.fb.group(CurrencyConverterComponent.currencyConverterForm());

    }
          
  ngOnInit(): void {
    this.getCurriencies();
  }

  /**
   * this method retrieves the exchangeRate
   */
  public getExchangeRate = (): void => {
    const { baseValue, targetValue } = this.currencyConverterForm.value;
    this.currencyConverterService.getExchangeRate(baseValue,targetValue).subscribe(
      (exchangeRateResponse) => {
        console.log({exchangeRateResponse});
      },
      (error)=>{
        console.error(error.toString());
      })

  }


   /**
   * this method retrieves a list of currencies
   */
    private getCurriencies = (): void => {
      this.currencyConverterService.getCurrencies().subscribe(
        (currencyResponse:CurrencyResponse) => {
          const allCurrencies:string[] = [CurrencyEnums.USD];
          const { exchange_rates } = currencyResponse;
          for(const currency in exchange_rates){
            allCurrencies.push(currency);
          }
          this.allCurrencies = allCurrencies;
          console.log({allCurrencies: this.allCurrencies});
        },
        (error)=>{
          console.error(error.toString());
        })
  
    }

}
