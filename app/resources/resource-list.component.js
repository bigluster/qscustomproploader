System.register(['angular2/core', 'angular2/common', 'angular2/router', './resource.service', '../qrs/qrs.service', '../app.config'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1, resource_service_1, qrs_service_1, app_config_1;
    var ResourceListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (resource_service_1_1) {
                resource_service_1 = resource_service_1_1;
            },
            function (qrs_service_1_1) {
                qrs_service_1 = qrs_service_1_1;
            },
            function (app_config_1_1) {
                app_config_1 = app_config_1_1;
            }],
        execute: function() {
            ResourceListComponent = (function () {
                function ResourceListComponent(appConfig, _resourceService, _QRSService, fb) {
                    this.appConfig = appConfig;
                    this._resourceService = _resourceService;
                    this._QRSService = _QRSService;
                    this.pageTitle = 'Qlik Sense Resources';
                    this.selectedResources = [];
                    this.resourceSelected = false;
                    this.fileUploaded = false;
                    this.myForm = fb.group({
                        'customPropName': ['',
                            common_1.Validators.compose([common_1.Validators.required, this.propNameValidator])]
                    }, {
                        'customPropResources': [false,
                            common_1.Validators.required]
                    });
                    this.customPropName = this.myForm.controls['customPropName'];
                    this.customPropResources = this.myForm.controls['customPropResources'];
                    this.filesToUpload = [];
                    this.propValues = [];
                    this.serverUrl = appConfig.hostname;
                    this.serverPort = appConfig.port;
                }
                ResourceListComponent.prototype.propNameValidator = function (control) {
                    if (!control.value.match(/^\w*$/)) {
                        return { invalidName: true };
                    }
                };
                ResourceListComponent.prototype.onSubmit = function (value) {
                    var prop = value;
                    console.log(prop.customPropName);
                    console.log("Submitted Items:\n ", JSON.stringify(value) + "\n", this.selectedResources + "\n", this.propValues);
                    this.createProperty(prop.customPropName, this.selectedResources, this.propValues);
                    this.resetForm();
                };
                ResourceListComponent.prototype.createProperty = function (propName, resources, values) {
                    var _this = this;
                    console.log('Creating custom property');
                    this._QRSService.sendQRSRequest(propName, resources, values)
                        .subscribe(function (message) {
                        _this.QRSMessage = message;
                        console.log(JSON.stringify(_this.QRSMessage));
                    });
                };
                ResourceListComponent.prototype.resetForm = function () {
                    document.getElementById('customPropName').className = "form-control ng-untouched ng-invalid ng-pristine";
                    document.getElementById('customPropName').value = "";
                    this.propValues = [];
                    for (var resource in this.resources) {
                        document.getElementById(this.resources[resource].definition).checked = false;
                        ;
                    }
                    this.fileUploaded = false;
                    this.resourceSelected = false;
                    this.selectedResources = [];
                    document.getElementById('uploadButton').value = "";
                    document.getElementById('uploadButton').className = "form-control-file";
                };
                ResourceListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log('Initializing');
                    this._resourceService.getResources()
                        .subscribe(function (resources) { return _this.resources = resources; }, function (error) { return _this.errorMessage = error; });
                };
                ResourceListComponent.prototype.checkedResources = function (value) {
                    console.log(value);
                    if (document.getElementById(value).checked === true) {
                        this.selectedResources.push(value);
                    }
                    else if (document.getElementById(value).checked === false) {
                        var indexx = this.selectedResources.indexOf(value);
                        this.selectedResources.splice(indexx, 1);
                    }
                    if (this.selectedResources.length > 0) {
                        this.resourceSelected = true;
                    }
                    else {
                        this.resourceSelected = false;
                    }
                };
                ResourceListComponent.prototype.upload = function () {
                    var _this = this;
                    this.propValues = [];
                    this.makeFileRequest("http://" + this.serverUrl + ":" + this.serverPort + "/upload", [], this.filesToUpload)
                        .then(function (result) {
                        for (var k in result) {
                            _this.propValues.push(result[k]);
                        }
                        if (_this.propValues.length > 0) {
                            _this.fileUploaded = true;
                        }
                    }, function (error) {
                        console.error(error);
                    });
                };
                ResourceListComponent.prototype.fileChangeEvent = function (fileInput) {
                    this.filesToUpload = fileInput.target.files;
                };
                ResourceListComponent.prototype.makeFileRequest = function (url, params, files) {
                    return new Promise(function (resolve, reject) {
                        var formData = new FormData();
                        var xhr = new XMLHttpRequest();
                        for (var i = 0; i < files.length; i++) {
                            formData.append("uploads[]", files[i], files[i].name);
                        }
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4) {
                                if (xhr.status == 200) {
                                    resolve(JSON.parse(xhr.response));
                                }
                                else {
                                    reject(xhr.response);
                                }
                            }
                        };
                        xhr.open("POST", url, true);
                        xhr.send(formData);
                    });
                };
                ResourceListComponent = __decorate([
                    core_1.Component({
                        selector: 'testform',
                        templateUrl: 'app/resources/resource-list.component.html',
                        styleUrls: ['app/resources/resource-list.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, common_1.FORM_DIRECTIVES],
                        providers: [qrs_service_1.QRSService, app_config_1.AppConfig]
                    }), 
                    __metadata('design:paramtypes', [app_config_1.AppConfig, resource_service_1.ResourceService, qrs_service_1.QRSService, common_1.FormBuilder])
                ], ResourceListComponent);
                return ResourceListComponent;
            }());
            exports_1("ResourceListComponent", ResourceListComponent);
        }
    }
});
//# sourceMappingURL=resource-list.component.js.map