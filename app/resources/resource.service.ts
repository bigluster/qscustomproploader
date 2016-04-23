import { Injectable} from 'angular2/core';
import { IResource } from './resource';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ResourceService {
    private _resourceUrl = 'api/resources/resources.json';
    constructor(private _http: Http){
     
    }
    getResources(): Observable<IResource[]> {
        return this._http.get(this._resourceUrl)
        .map((response: Response) => <IResource[]>response.json())
        .do(data => console.log("All: " + JSON.stringify(data)))
        .catch(this.handleError);
    }
    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
    
}
