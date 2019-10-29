import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProgressDemoService } from '../services/progress-demo.service';

@Component({
    selector: 'app-progress-demo',
    templateUrl: './progress-demo.component.html',
    styleUrls: ['./progress-demo.component.css']
})
export class ProgressDemoComponent implements OnInit {

    constructor(
        private http: HttpClient,
        private service: ProgressDemoService
    ) { }

    ngOnInit() {
    }

    begin() {

    }
}
