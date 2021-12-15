import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyEnums, NUM_PATTERN } from 'src/enums';
import { AmountValue, Currency, CurrencyResponse, CurrencyValue } from 'src/interfaces/currency.interface';
import { CurrencyConverterService } from 'src/services/currency-converter.service';
import * as ApexCharts from 'apexcharts'
import { formatNumber } from 'src/utils/formatters';


@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {

  public allCurrencies:Currency[] = [];
  public currencyConverterForm:FormGroup;
  public cursor!:string;
  public loading:boolean = false;

  public displayedColumns: string[] = ['Date', 'Amount'];
  public historicalData:any[] = [];
  public baseTarget!:string;
  public baseValueSymbol:string|undefined = CurrencyEnums.USD;
  public targetValueSymbol:string|undefined = CurrencyEnums.GBP;
  public formatDigits:Function = formatNumber;
  public baseDisplayValue:string = '1';
  public targetDisplayValue!:string;
 

  private static currencyConverterForm = () => ({
    baseAmountValue:['1', Validators.compose([Validators.required, Validators.pattern(NUM_PATTERN)])],
    targetAmountValue:['', Validators.compose([Validators.required, Validators.pattern(NUM_PATTERN)])],
    baseCurrencyValue:[CurrencyEnums.USD, Validators.compose([Validators.required])],
    targetCurrencyValue:[CurrencyEnums.GBP, Validators.compose([Validators.required])],
  })

  constructor(private readonly currencyConverterService:CurrencyConverterService,
    private fb:FormBuilder){
      this.currencyConverterForm = this.fb.group(CurrencyConverterComponent.currencyConverterForm());
    }
          
  ngOnInit(): void{
   this.initializeData();
  }

  /**
   * This method sets up initial data
   */
  private initializeData:Function = ():void => {
    this.getCurriencies();
    this.getExchangeRate(CurrencyEnums.USD, CurrencyEnums.GBP);
  }

  /**
   * This method recalculates exchange values
   */
  public reCalculate:Function = (cursor:string = CurrencyEnums.TARGET):void =>{
    if(this.currencyConverterForm.invalid) return;
    this.cursor = cursor;
    let { baseCurrencyValue, targetCurrencyValue }: CurrencyValue = {...this.currencyConverterForm.value};
    if(cursor === CurrencyEnums.BASE){
      baseCurrencyValue = this.currencyConverterForm.value.targetCurrencyValue;
      targetCurrencyValue = this.currencyConverterForm.value.baseCurrencyValue;
    }
    this.baseValueSymbol = baseCurrencyValue;
    this.targetValueSymbol = targetCurrencyValue;
    this.getExchangeRate(baseCurrencyValue, targetCurrencyValue);
  }

   /**
   * this method retrieves a list of currencies
   */
    private getCurriencies:Function = (): void => {
      this.loading = true;
      this.currencyConverterService.getCurrencies().subscribe(
        (currencyResponse) => {
          this.loading = false;

          const { results } = currencyResponse;
          const allCurrencies:Currency[] = [];
          for(const currency in results){
            allCurrencies.push(results[currency]);
          }
          this.allCurrencies = allCurrencies;
        },
        (error)=>{
          this.loading = false;
          console.error(error.toString());
        })
  
    }

  /**
   * this method retrieves the exchangeRate
   */
  private getExchangeRate:Function = (baseCurrencyValue:string, targetCurrencyValue:string): void => {
    this.loading = true;
        const queryString:string = `${baseCurrencyValue}_${targetCurrencyValue}`;
    this.currencyConverterService.getExchangeRate(queryString).subscribe(
      (exchangeRateResponse) => {
        this.loading = false;

      const { results } = exchangeRateResponse;
      const exchangeRateValue:number = results[queryString].val;
      this.currencyConverterForm.setValue({
        ...this.currencyConverterForm.value,
        ...this.setChangeField(exchangeRateValue)});
        this.getHistoricalData(queryString);
      },
      (error)=>{
        this.loading = false;

        console.error(error.toString());
      })

  }

    /**
   * this method retrieves historicalData for exchange
   */
     private getHistoricalData:Function = (queryString:string=''): void => {
this.loading = true;
        this.currencyConverterService.getHistoricalData(queryString).subscribe(
          (historicalDataResponse) => {
            this.loading = false;
            this.recreateChart();
           this.baseTarget = this.getBaseTargetName(queryString);
           const dates:string[] = [];
           const amounts:string[] = [];
            const historicalData:any[] =[];
            const history = historicalDataResponse[queryString];
            for(const date in history){
              let amount = formatNumber(history[date]);
              historicalData.push({ date,amount });
              dates.push(date);
              amounts.push(amount);
            }
            this.historicalData = historicalData;
            this.plotExchangeRateHistory(dates, amounts);
          },
          (error)=>{ 
            this.loading = false;
            console.error(error.toString());
          })
        
    }


  

  /**
   * This method determines the field to update
   * @param exchangeRateValue 
   * @returns 
   */
  private setChangeField:Function = (exchangeRateValue:number): AmountValue =>{
    const { baseAmountValue, targetAmountValue }: any = {...this.currencyConverterForm.value};
    if(this.cursor === CurrencyEnums.BASE){
      this.targetDisplayValue = formatNumber(targetAmountValue * exchangeRateValue);
      this.baseDisplayValue = targetAmountValue;
      return {
        baseAmountValue: this.targetDisplayValue
      }
    }
    this.targetDisplayValue = formatNumber(baseAmountValue * exchangeRateValue);
    this.baseDisplayValue = baseAmountValue;
    return {
      targetAmountValue: this.targetDisplayValue
    }
  }

  /**
   * This method retrieves the exchange (base -> target) name
   * @param queryString 
   * @returns 
   */
  private getBaseTargetName = (queryString:string):string =>{
    let baseTargetString!:string;
    const baseTargetArray = queryString.split('_');
    const allCurrencyIds:string[] = this.allCurrencies.map((currency:Currency) => currency.id);
    baseTargetString = baseTargetArray.filter((currencyId:string) => allCurrencyIds.includes(currencyId))
    .map((currencyId:string) => `${this.allCurrencies.find((currency:Currency) => currency.id === currencyId)?.currencyName}(${currencyId})`)
    .join(' --> ');
    return baseTargetString;
  }

  /**
   * This method plots the exchange trend
   * @param dates 
   * @param amounts 
   */
  private plotExchangeRateHistory = (dates:string[], amounts:string[]) =>{
   const options = {
    series: [
      {
        name: `1${this.baseValueSymbol} --> ${this.targetValueSymbol}`,
        data: amounts
      }
    ],
    chart: {
      height: 350,
      type: "line"
    },
    title: {
      text: "Exchange Trend"
    },
    xaxis: {
      categories: dates
    }
  }
   const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }


  /**
   * This method reinitializes the chart area
   */
  private recreateChart = ():void =>{
    const oldChart:HTMLElement|null = document.getElementById('chart');
    oldChart?.remove();
    const newChart:HTMLElement = document.createElement('div');
    newChart.id = 'chart';
    const chartContainer:HTMLElement|null = document.getElementById('chart-container');
    chartContainer?.appendChild(newChart);
  }


}




