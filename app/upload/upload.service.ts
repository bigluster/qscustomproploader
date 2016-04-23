import {Injectable} from 'angular2/core';
import {IUpload} from './upload';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UploadService
{
    private _uploadUrl = "http://localhost:8432/upload";
    private filesToUpload: Array<File>;
    propValues: string[];
           
    constructor() {
        this.filesToUpload =[];
        this.propValues = [];
    }
    
    upload(): any {
        this.propValues =[];
        this.makeFileRequest(this._uploadUrl, [], this.filesToUpload)
        .then((result) => {
         console.log(<IUpload[]>result);
         //return <IUpload[]>result;

            for(var k in result)
            {
                this.propValues.push(result[k]);
            }
            return this.propValues.map((prop: any) => <IUpload[]>prop)
           
        }, (error) => {
            return error;
        });
    }
 
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
        console.log(this.filesToUpload);
    }
 
    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response)
                           );
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }
    
}