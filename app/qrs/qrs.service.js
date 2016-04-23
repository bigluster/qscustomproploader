System.register(['angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var core_1, http_1, http_2, Observable_1;
    var QRSService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            QRSService = (function () {
                function QRSService(_http) {
                    this._http = _http;
                    this._QRSUrl = 'http://localhost:8432/create';
                }
                QRSService.prototype.sendQRSRequest = function (propName, selectedResources, propValues) {
                    var body = JSON.stringify(this.buildPayload(propName, selectedResources, propValues));
                    var headers = new http_2.Headers({
                        'Content-Type': 'application/json'
                    });
                    var options = new http_2.RequestOptions({
                        headers: headers
                    });
                    return this._http.post(this._QRSUrl, body, options)
                        .map(this.extractData)
                        .do(function (data) { return console.log("all: " + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                QRSService.prototype.buildPayload = function (propName, selectedResources, propValues) {
                    var result = {
                        "name": propName,
                        "valueType": "Text",
                        "choiceValues": propValues,
                        "objectTypes": selectedResources
                    };
                    return result;
                };
                QRSService.prototype.extractData = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Bad response status: ' + res.status);
                    }
                    var body = res.json();
                    return body || {};
                };
                QRSService.prototype.handleError = function (error) {
                    // In a real world app, we might send the error to remote logging infrastructure
                    var errMsg = error.message || 'Server error';
                    console.error(errMsg); // log to console instead
                    return Observable_1.Observable.throw(errMsg);
                };
                QRSService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], QRSService);
                return QRSService;
            }());
            exports_1("QRSService", QRSService);
        }
    }
});
//# sourceMappingURL=qrs.service.js.map