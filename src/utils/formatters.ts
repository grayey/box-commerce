
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