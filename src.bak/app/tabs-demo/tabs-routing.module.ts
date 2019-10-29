import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavComponent } from './nav/nav.component';
import { Tab01Component } from './tab01/tab01.component';
import { Tab02Component } from './tab02/tab02.component';
import { Tab03Component } from './tab03/tab03.component';

const routes: Routes = [
    {
        path: '',
        component: NavComponent,
        children: [
            { path: 'tab01', component: Tab01Component },
            { path: 'tab02', component: Tab02Component },
            { path: 'tab03', component: Tab03Component },
            { path: '**', redirectTo: 'tab01' },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsRoutingModule { }
