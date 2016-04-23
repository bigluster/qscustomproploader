import {Component} from 'angular2/core';
import {IUpload} from './upload';

@Component({
    selector:"upload-file",
    templateUrl: "app/upload/upload.component.html",
    styleUrls: ["app/upload/upload.component.css"],
    directives: []
})


export class UploadComponent {
    
   filesToUpload: Array<File>;
   propValues: string[];
   
   
    
    constructor() {
        this.filesToUpload =[];
        this.propValues= [];
    }
    
 
        
    upload(): any {
        this.propValues= [];
        this.makeFileRequest("http://localhost:8432/upload", [], this.filesToUpload)
        .then((result) => {
            for(var k in result)
            {
                this.propValues.push(result[k]);
            }
            
        }, (error) => {
            console.error(error);
        });
    }
 
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
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