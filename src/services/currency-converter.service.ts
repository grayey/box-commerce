import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiHandlerService } from "./api-handler.service";
import { buildParams } from '../utils/formatters';
import { Injectable } from "@angular/core";
import { CurrencyEnums } from "src/enums";


@Injectable()
export class CurrencyConverterService{

    private defaultRequestParams = {
        api_key:environment.abstractExchangeApiKey
    };

    constructor(private apiHandler:ApiHandlerService){}

    /**
     * This method retrieves exchangeRate
     * @returns 
     */
    public getExchangeRate = (base:string, target:string):Observable<any> => {
        const paramString = buildParams({
            ...this.defaultRequestParams,
            base, 
            target
        });
        const path = `${environment.abstractExchangeApiBaseUrl}/live/${paramString}`;
        return this.apiHandler.get(path);
    };



    /**
     * This method retrieves a list of currencies
     * @returns 
     */
    public getCurrencies = ():Observable<any> => {
        const paramString = buildParams({
            ...this.defaultRequestParams,
            base:CurrencyEnums.USD
        });
        const path = `${environment.abstractExchangeApiBaseUrl}/live/${paramString}`;
        return this.apiHandler.get(path);
    };


}