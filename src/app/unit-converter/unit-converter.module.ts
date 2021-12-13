import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UnitConverterComponent } from "./unit-converter.component";
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



const UNIT_ROUTES:Routes = [
        {
            path:'',
            component:UnitConverterComponent
        }
];


@NgModule({
    declarations:[
        UnitConverterComponent
    ],
    exports:[
        UnitConverterComponent
    ],
    imports:[
        RouterModule.forChild(UNIT_ROUTES),
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
        MatListModule
    ]

})
export class UnitConverterModule{}