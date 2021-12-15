import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { CurrencyConverterComponent } from "./currency-converter.component";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



const CURRENCY_ROUTES:Routes = [
        {
            path:'',
            component:CurrencyConverterComponent
        }
];


@NgModule({
    declarations:[
        CurrencyConverterComponent
    ],
    exports:[
        CurrencyConverterComponent
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(CURRENCY_ROUTES),
        FlexLayoutModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavModule,
        MatCardModule,
        MatListModule,
        MatSelectModule,
        MatGridListModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatProgressSpinnerModule
    ]

})
export class CurrencyConverterModule{


}