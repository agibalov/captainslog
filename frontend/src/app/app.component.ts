import {Component, OnDestroy, OnInit} from '@angular/core';
import {LongRunningOperationExecutor} from "./long-running-operation-executor.service";
import {Subscription} from "rxjs/Subscription";
import {NavigationError, Router} from "@angular/router";
import {LogRecordNotFoundApiError} from "./api-client.service";

@Component({
    selector: 'app-root',
    template: `
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="/">Captainslog <span *ngIf="wip">(Working...)</span></a>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/" routerLinkActive="active" 
                               [routerLinkActiveOptions]="{exact: true}">Create</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/logrecords" [queryParams]="{ page: 0, size: 3}" 
                               routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">List</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/someroutethatdoesnotexist">404</a>
                        </li>
                        <button type="button" (click)="doThrow()" class="btn btn-outline-success">Throw exception</button>
                    </ul>
                </div>
            </nav>
            <router-outlet></router-outlet>
        </div>
    `,
    styles: []
})
export class AppComponent implements OnInit, OnDestroy {
    wip: boolean;
    wipSubscription: Subscription;

    constructor(
        private longRunningOperationExecutor: LongRunningOperationExecutor,
        router: Router) {

        router.events.subscribe(e => {
            console.log(e);

            if(e instanceof NavigationError) {
                const navigationError = <NavigationError>e;
                console.log(`There's a navigation error: ${navigationError.url}`);

                if(navigationError.error instanceof LogRecordNotFoundApiError) {
                    console.log(`Namely, there's a LogRecordNotFoundApiError`);
                }
            }
        });
    }

    ngOnInit(): void {
        this.wipSubscription = this.longRunningOperationExecutor.wip$.subscribe(wip => this.wip = wip);
    }

    ngOnDestroy(): void {
        this.wipSubscription.unsubscribe();
    }

    doThrow(): void {
        throw new Error('hey there');
    }
}
