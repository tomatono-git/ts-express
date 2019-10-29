import { TestBed, inject } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    // HttpTestingController
} from '@angular/common/http/testing';

import { ProgressDemoService } from './progress-demo.service';

describe('ProgressDemoService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProgressDemoService]
        });
    });

    it('should be created', inject([ProgressDemoService], (service: ProgressDemoService) => {
        expect(service).toBeTruthy();
    }));
});
