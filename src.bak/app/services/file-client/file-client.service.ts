import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';


import { Observable } from 'rxjs/internal/Observable';
// import { ErrorObservable } from 'rxjs/internal/observable/throwError';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

/* Naming NOTE
  The API's file field is `fileItem` thus, we name it the same below
  it's like saying <input type='file' name='fileItem' />
  on a standard file field
*/

@Injectable({
    providedIn: 'root'
})
export class FileUploadClientService {
    apiBaseURL = 'http://127.0.0.1:8000/api/';
    constructor(private http: HttpClient) { }

    fileUpload<T extends { [index: string]: string }>(fileItem: File, extraData?: T) {
        const apiCreateEndpoint = `${this.apiBaseURL}files/create/`;
        const formData: FormData = new FormData();

        formData.append('fileItem', fileItem, fileItem.name);
        if (extraData) {
            for (const key of Object.keys(extraData)) {
                // iterate and set other form data
                formData.append(key, (extraData)[key]);
            }
        }

        // return this.http.post(apiCreateEndpoint, formData, {
        //     reportProgress: true // for progress data
        // });
        const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
            reportProgress: true // for progress data
        });
        return this.http.request<FormData>(req);
    }

    // optionalFileUpload(fileItem?: File, extraData?: object) {
    //     const apiCreateEndpoint = `${this.apiBaseURL}files/create/`;
    //     const formData: FormData = new FormData(); // ?
    //     let fileName;
    //     if (extraData) {
    //         for (const key of Object.keys(extraData)) {
    //             // iterate and set other form data
    //             if (key === 'fileName') {
    //                 fileName = extraData[key];
    //             }
    //             formData.append(key, extraData[key]);
    //         }
    //     }

    //     if (fileItem) {
    //         if (!fileName) {
    //             fileName = fileItem.name;
    //         }
    //         formData.append('image', fileItem, fileName);
    //     }
    //     return this.http.post(apiCreateEndpoint, formData, {
    //         reportProgress: true // for progress data
    //     });
    //     // const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
    //     //     reportProgress: true // for progress data
    //     // });
    //     // return this.http.request(req);
    // }

    list(): Observable<any> {
        const listEndpoint = `${this.apiBaseURL}files/`;
        return this.http.get(listEndpoint);
    }

}
