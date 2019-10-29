import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material';

import { Tab01Component } from './tab01/tab01.component';
import { Tab02Component } from './tab02/tab02.component';
import { NavComponent } from './nav/nav.component';
import { TabsRoutingModule } from './tabs-routing.module';
import { CommonModule } from '@angular/common';
import { Tab03Component } from './tab03/tab03.component';

@NgModule({
    imports: [
        CommonModule,
        MatTabsModule,
        TabsRoutingModule,
    ],
    declarations: [
        Tab01Component,
        Tab02Component,
        NavComponent,
        Tab03Component,
    ],
    providers: [],
})
export class TabsModule { }
