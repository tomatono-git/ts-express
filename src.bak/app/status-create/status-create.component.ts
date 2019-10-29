import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';

import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

import { FileUploadClientService } from '../services/file-client/file-client.service';
import { HttpUploadProgressEvent, HttpProgressEvent, HttpResponse } from '@angular/common/http/src/response';

@Component({
    selector: 'app-status-create',
    templateUrl: './status-create.component.html',
    styleUrls: ['./status-create.component.css']
})
export class StatusCreateComponent implements OnInit, OnDestroy {

    statusCreateForm: FormGroup;
    fileDescription: FormControl;
    fileToUpload: File = null;
    uploadProgress = 0;
    uploadComplete = false;
    uploadingProgressing = false;
    fileUploadSub: Subscription;
    serverResponse: any;

    @ViewChild('myInput')
    myFileInput: ElementRef<HTMLInputElement>;


    constructor(
        private fileUploadService: FileUploadClientService
    ) { }

    ngOnInit() {
        /* initilize the form and/or extra form fields
            Do not initialize the file field
        */
        this.fileDescription = new FormControl('', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(280)
        ]);
        this.statusCreateForm = new FormGroup({
            'description': this.fileDescription,
        });
    }

    ngOnDestroy() {
        if (this.fileUploadSub) {
            this.fileUploadSub.unsubscribe();
        }
    }

    handleProgress<T>(event: HttpEvent<T>) {
        if (event.type === HttpEventType.DownloadProgress) {
            this.uploadingProgressing = true;
            this.uploadProgress = Math.round(100 * event.loaded / event.total);
        }

        if (event.type === HttpEventType.UploadProgress) {
            this.uploadingProgressing = true;
            this.uploadProgress = Math.round(100 * event.loaded / event.total);
        }

        if (event.type === HttpEventType.Response) {
            // console.log(event.body);
            this.uploadComplete = true;
            this.serverResponse = event.body;
        }
    }

    handleSubmit(event: Event, statusNgForm: NgForm, statusFormGroup: FormGroup) {
        event.preventDefault();
        if (statusNgForm.submitted) {

            const submittedData = statusFormGroup.value;

            const subscribed = this.fileUploadService.fileUpload(
                this.fileToUpload,
                submittedData
            ).subscribe(
                value => this.handleProgress(value),
                error => {
                    console.log('Server error', error);
                });

            this.fileUploadSub = subscribed;

            statusNgForm.resetForm({});
        }
    }


    handleFileInput(files: FileList) {
        const fileItem = files.item(0);
        console.log('file input has changed. The file is', fileItem);
        this.fileToUpload = fileItem;
    }

    resetFileInput() {
        console.log(this.myFileInput.nativeElement.files);
        this.myFileInput.nativeElement.value = '';
        console.log(this.myFileInput.nativeElement.files);
    }

}
