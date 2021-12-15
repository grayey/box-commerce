import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiHandlerService } from "./api-handler.service";
import { buildParams, getDaysApart } from '../utils/formatters';
import { Injectable } from "@angular/core";
import { CurrencyEnums } from "src/enums";
import { DatePeriod } from "src/interfaces/currency.interface";


@Injectable()
export class CurrencyConverterService{

    private defaultRequestParams = {
        apiKey:environment.currencyConverterApiKey
    };

    constructor(private apiHandler:ApiHandlerService){}

    /**
     * This method retrieves exchangeRate
     * @returns 
     */
    public getExchangeRate = (q:string):Observable<any> => {
        const paramString = buildParams({
            ...this.defaultRequestParams,
            q
        });
        const path = `${environment.currencyConverterApiBaseUrl}/convert/${paramString}`;
        return this.apiHandler.get(path);
    };

    /**
     * This method retrieves a list of currencies
     * @returns 
     */
    public getCurrencies = ():Observable<any> => {
        const paramString = buildParams({
            ...this.defaultRequestParams,
            // base:CurrencyEnums.USD
        });
        const path = `${environment.currencyConverterApiBaseUrl}/currencies/${paramString}`;
        return this.apiHandler.get(path);
    };
    

     /**
     * This method retrieves a list of currencies
     * @returns 
     */
      public getHistoricalData = (q:string):Observable<any> => {
        const datePeriod:DatePeriod = getDaysApart();
        const paramString = buildParams({
            ...this.defaultRequestParams,
            ...datePeriod,
            q,
            compact:"ultra"
        });
        const path = `${environment.currencyConverterApiBaseUrl}/convert/${paramString}`;
        return this.apiHandler.get(path);
    };

    


}