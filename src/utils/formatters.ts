import { DEFAULT_DCPL } from "src/enums";
import { DatePeriod } from "src/interfaces/currency.interface";

/**
 * This method builds a param string from an object
 * @param params 
 * @returns string
 */
export const buildParams = (params:any):string => {
    let paramString:string = '?';
    for(const paramKey in params){ 
        paramString+=`${paramKey}=${params[paramKey]}&`;
    }
    return paramString;
}


export const getDaysApart = (daysApart:number = 8):DatePeriod=> {
    const today = new Date();
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - daysApart);
    return {
        endDate: today.toISOString().split('T')[0],
        date: daysAgo.toISOString().split('T')[0]
    }

}

export const formatNumber = (number:number, digits:number = DEFAULT_DCPL):string => number.toFixed(digits);