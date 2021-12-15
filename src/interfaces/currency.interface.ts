export interface CurrencyResponse {
    results: object;
}

export interface Currency{
    currencyName: string; 
    id: string
}

export interface AmountValue{ 
    baseAmountValue?: number|string;
     targetAmountValue?:number|string;
 }

 export interface CurrencyValue{ 
    baseCurrencyValue?: string;
    targetCurrencyValue?:string;
 }

 export interface DatePeriod{ 
     date:string; 
     endDate:string
} 