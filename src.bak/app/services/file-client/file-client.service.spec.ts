import { TestBed, inject } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    // HttpTestingController
} from '@angular/common/http/testing';

import { FileUploadClientService } from './file-client.service';


describe('FileUploadClientService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [FileUploadClientService]
        });
    });

    it('should be created', inject([FileUploadClientService], (service: FileUploadClientService) => {
        expect(service).toBeTruthy();
    }));
});
