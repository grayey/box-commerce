import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnitEnums, NUM_PATTERN } from 'src/enums';
import { AmountValue, Unit, UnitValue } from 'src/interfaces/unit.interface';
import { formatNumber } from 'src/utils/formatters';
import localStorageService from 'src/services/local-storage.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-unit-converter',
  templateUrl: './unit-converter.component.html',
  styleUrls: ['./unit-converter.component.scss']
})
export class UnitConverterComponent implements OnInit {


  public unitConverterForm:FormGroup;
  public createUnitForm:FormGroup;
  public cursor!:string;
  public dataSource!: MatTableDataSource<Unit>;
 

  public displayedColumns: string[] = ['Unit', 'Symbol', 'Actions'];
  public allUnits:Unit[] = [
    {
      unitName:UnitEnums.METER,
      id:"m",
      conversions:{
        yd:1.0936,
        in:39.3701,
        m:1.0
      }
    },
    {
      unitName:UnitEnums.YARD,
      id:"yd",
      conversions:{
        m:0.9144,
        in:36,
        yd:1.0
      }
    },
    {
      unitName:UnitEnums.INCH,
      id:"in",
      conversions:{
        m:0.0254,
        yd:0.02778,
        in:1.0
      }
    },
  ];
  public baseTarget!:string;
  public baseValueSymbol:string|undefined = UnitEnums.METER;
  public targetValueSymbol:string|undefined = UnitEnums.YARD;
  public formatDigits:Function = formatNumber;
  public baseDisplayValue:string = '1';
  public targetDisplayValue!:string;
 

  private static unitConverterForm = () => ({
    baseAmountValue:['1', Validators.compose([Validators.required, Validators.pattern(NUM_PATTERN)])],
    targetAmountValue:['1.0936', Validators.compose([Validators.required, Validators.pattern(NUM_PATTERN)])],
    baseUnitValue:['m', Validators.compose([Validators.required])],
    targetUnitValue:['yd', Validators.compose([Validators.required])],
  })

  private static createUnitForm = () => ({
    unitName:['', Validators.compose([Validators.required])],
    id:['', Validators.compose([Validators.required])],
  })


  constructor(private fb:FormBuilder){
      this.unitConverterForm = this.fb.group(UnitConverterComponent.unitConverterForm());
      this.createUnitForm = this.fb.group(UnitConverterComponent.createUnitForm());
    }
          
  ngOnInit(): void{
   this.initializeData();
  }

  /**
   * This method sets up initial data
   */
  private initializeData:Function = ():void => {
    this.getUnits();
    this.targetDisplayValue = 1.0936.toString();
  }

 public addUnit:Function = ():void =>{
   const { id } = this.createUnitForm.value;
   for(const unit of this.allUnits){
     if(unit.id === id){
       return alert(`The symbol: ${id} already exists`);
     }
   }
   this.allUnits.unshift({...this.createUnitForm.value, conversions:{}});
   localStorageService.setItem(UnitEnums.ALL_UNITS, this.allUnits);
   this.dataSource.data = this.allUnits;
   this.createUnitForm.reset();
 }


 public openConversionModal:Function = ():void =>{


 }

 /**
  * This method checks if a unit has conversions
  * @param unit 
  * @returns 
  */
 public hasConversions:Function = (unit:Unit):boolean => !!Object.keys(unit?.conversions)?.length;
  /**
   * This method recalculates exchange values
   */
  public reCalculate:Function = (cursor:string = UnitEnums.TARGET):void| boolean=>{
    if(this.unitConverterForm.invalid) return;
    this.cursor = cursor;
    let { baseUnitValue, targetUnitValue }: UnitValue = {...this.unitConverterForm.value};
    if(cursor === UnitEnums.BASE){
      baseUnitValue = this.unitConverterForm.value.targetUnitValue;
      targetUnitValue = this.unitConverterForm.value.baseUnitValue;
    }
    baseUnitValue = baseUnitValue || '';
    targetUnitValue = targetUnitValue || '';
    const conversion:any = this.allUnits.find((unit:Unit) => unit.id === baseUnitValue)?.conversions || {};
    this.baseValueSymbol = baseUnitValue;
    this.targetValueSymbol = targetUnitValue;
    const exchangeRateValue:number = conversion[targetUnitValue];
    if(!exchangeRateValue){
     alert('Conversion rate does not exist. Please add conversion');
     return false;
    }
    this.unitConverterForm.setValue({
      ...this.unitConverterForm.value,
      ...this.setChangeField(exchangeRateValue)});
  }

   /**
   * this method retrieves a list of currencies
   */
    private getUnits:Function = (): void => {
      const allUnits:any = localStorageService.getItem(UnitEnums.ALL_UNITS) || [];
      this.allUnits = [...this.allUnits, ...allUnits];
      const ids = this.allUnits.map((unit:Unit) => unit.id)
      this.allUnits = this.allUnits.filter(({id}, index) => !ids.includes(id, index + 1))
      this.dataSource = new MatTableDataSource(this.allUnits);

    }


  /**
   * This method determines the field to update
   * @param exchangeRateValue 
   * @returns 
   */
  private setChangeField:Function = (exchangeRateValue:number): AmountValue =>{
    const { baseAmountValue, targetAmountValue }: any = {...this.unitConverterForm.value};
    if(this.cursor === UnitEnums.BASE){
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



}
