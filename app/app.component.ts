import { Component} from 'angular2/core';
import { ResourceListComponent} from './resources/resource-list.component';
import { ResourceService} from './resources/resource.service';

import { HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/Rx'; //load all features


import {ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES, RouteParams} from "angular2/router";

@Component({
    selector: 'cp-bulkloader',
    template: `
           <div>
                <h1>{{pageTitle}}</h1>
           </div>
           <div>
            <router-outlet></router-outlet>
           </div>
           `,
    directives: [ROUTER_DIRECTIVES],
    providers: [ResourceService, HTTP_PROVIDERS, ROUTER_PROVIDERS]
})

@RouteConfig([
    { path: '/resources', name: 'Resources', component: ResourceListComponent, useAsDefault: true}
])

export class AppComponent {
    pageTitle: string = 'Qlik Sense Custom Property Loader';
}