import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {IQRSMessage} from './qrs.message';
import {AppConfig} from '../app.config';

@Injectable()
export class QRSService {
        private serverUrl: string;
        private serverPort: number;
        private _QRSUrl: string;
        
        constructor(private appConfig: AppConfig, private _http: Http){
            this.serverUrl = appConfig.hostname;
            this.serverPort = appConfig.port;
            this._QRSUrl = 'http://' + this.serverUrl + ':' + this.serverPort + '/create';
        }
        

        
        sendQRSRequest(propName: string,
            selectedResources:string[],
            propValues:string[]): Observable<any> {
                
            let body = JSON.stringify(this.buildPayload(
                propName, selectedResources,propValues));
            
                            
            let headers = new Headers({
                'Content-Type': 'application/json'
            });
            let options = new RequestOptions({
                headers: headers
            });
            
            return this._http.post(this._QRSUrl,body,options)
                .map(this.extractData)
                .do(data => console.log("all: " + JSON.stringify(data)))
                .catch(this.handleError);
        }
        
        private buildPayload(propName:string,
            selectedResources:string[], 
            propValues:string[]): any {
            
            let result = {
                "name": propName,
                "valueType": "Text",
                "choiceValues": propValues,
                "objectTypes": selectedResources
            };
            
            return result;
            
        }
        
        private extractData(res: Response): any {
        if (res.status < 200 || res.status >= 300) {
        throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
        }

        private handleError (error: any) {
            // In a real world app, we might send the error to remote logging infrastructure
            let errMsg = error.message || 'Server error';
            console.error(errMsg); // log to console instead
            return Observable.throw(errMsg);
        }
}
