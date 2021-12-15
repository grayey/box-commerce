
export interface Unit{
    unitName: string; 
    id: string;
    conversions:object;
    plural?:string;
}

export interface AmountValue{ 
    baseAmountValue?: number|string;
     targetAmountValue?:number|string;
 }

 export interface UnitValue{ 
    baseUnitValue?: string;
    targetUnitValue?:string;
 }
