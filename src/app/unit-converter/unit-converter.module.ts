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
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';



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
        UnitConverterComponent,
    ],
    imports:[
        CommonModule,
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
        MatListModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSelectModule,
        MatBadgeModule
    ]

})
export class UnitConverterModule{}