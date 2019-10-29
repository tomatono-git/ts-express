import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubC01Component } from './sub-c01/sub-c01.component';
import { ProgressDemoComponent } from './progress-demo/progress-demo.component';
import { RxjsDemoComponent } from './rxjs-demo/rxjs-demo.component';
import { TabsModule } from './tabs-demo/tabs.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        SubC01Component,
        ProgressDemoComponent,
        RxjsDemoComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
