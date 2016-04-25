import {Component,OnInit, } from 'angular2/core';
import {FORM_DIRECTIVES,FormBuilder,
    ControlGroup,Validators,AbstractControl,Control}    from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {IResource} from './resource';
import {ResourceService} from './resource.service';
import {QRSService} from '../qrs/qrs.service';
import {IQRSMessage} from '../qrs/qrs.message';
import {AppConfig}    from '../app.config';

@Component({
    selector: 'testform',
    templateUrl: 'app/resources/resource-list.component.html',
    styleUrls: ['app/resources/resource-list.component.css'],
    directives: [ROUTER_DIRECTIVES,FORM_DIRECTIVES],
    providers: [QRSService, AppConfig]
    
})
export class ResourceListComponent implements OnInit{
    
    pageTitle: string = 'Qlik Sense Resources';
    resources: IResource[];
    errorMessage: string;
    selectedResources: string[]= [];
    resourceSelected: boolean = false;
    fileUploaded: boolean = false;
    myForm: ControlGroup;
    customPropName: AbstractControl;
    customPropResources: AbstractControl;
    propValues: string[];
    filesToUpload: Array<File>;
    QRSMessage: IQRSMessage;
    serverUrl: string;
    serverPort: number;
    
    
    
    
    constructor(private appConfig:AppConfig,
        private _resourceService: ResourceService, 
        private _QRSService: QRSService, 
        fb: FormBuilder){
        this.myForm = fb.group({
            'customPropName': ['', 
            Validators.compose([Validators.required, this.propNameValidator])]
        },
        {
            'customPropResources': [false,
            Validators.required]
        });
        
        this.customPropName = this.myForm.controls['customPropName'];
        this.customPropResources = this.myForm.controls['customPropResources'];        
        this.filesToUpload =[];
        this.propValues= [];
        this.serverUrl = appConfig.hostname;
        this.serverPort = appConfig.port;
    }
    
    propNameValidator(control: Control): {[s: string]: boolean} {
        if(!control.value.match(/^\w*$/)) {
            return {invalidName: true};
        }
    }
    
     onSubmit(value: string): void {
         
         var prop : any = value;
         console.log(prop.customPropName);
         
        console.log("Submitted Items:\n ", 
        JSON.stringify(value) + "\n", 
        this.selectedResources + "\n", 
        this.propValues);
        this.createProperty(prop.customPropName,
            this.selectedResources,
            this.propValues);
        this.resetForm();
    }
    
    createProperty(propName:string, 
        resources:string[],
        values:string[]):void {
        console.log('Creating custom property');
        this._QRSService.sendQRSRequest(propName,resources,values)
            .subscribe(
                message => {
                    this.QRSMessage = message;
                    console.log(JSON.stringify(this.QRSMessage));
                }
            );
        
    }
    
    resetForm(): void {
        (<HTMLInputElement>document.getElementById('customPropName')).className = "form-control ng-untouched ng-invalid ng-pristine";
        (<HTMLInputElement>document.getElementById('customPropName')).value = "";
        this.propValues= [];
        for(var resource in this.resources)
        {
            (<HTMLInputElement>document.getElementById(this.resources[resource].definition)).checked=false;;
        }
        this.fileUploaded = false;
        this.resourceSelected = false;
        this.selectedResources = [];
        (<HTMLInputElement>document.getElementById('uploadButton')).value = "";
        (<HTMLInputElement>document.getElementById('uploadButton')).className = "form-control-file";
    }
    
    ngOnInit(): void {
        console.log('Initializing');
        this._resourceService.getResources()
            .subscribe(
                resources => this.resources = resources,
                error => this.errorMessage = <any>error
            );
    }
    
    checkedResources(value): void {
       console.log(value);
       if((<HTMLInputElement>document.getElementById(value)).checked === true){
           this.selectedResources.push(value);
       }
       else if ((<HTMLInputElement>document.getElementById(value)).checked === false){
           let indexx = this.selectedResources.indexOf(value);
           this.selectedResources.splice(indexx,1);
       }
       if(this.selectedResources.length>0)
       {
           this.resourceSelected = true;
       }
       else
       {
           this.resourceSelected = false;
       }
    }
    
    upload(): any {
        this.propValues= [];
        this.makeFileRequest("http://" + this.serverUrl + ":" + this.serverPort + "/upload", [], this.filesToUpload)
        .then((result) => {
            for(var k in result)
            {
                this.propValues.push(result[k]);
            }
            if(this.propValues.length>0)
            {
                this.fileUploaded = true;
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