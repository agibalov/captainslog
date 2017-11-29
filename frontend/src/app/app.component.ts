import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="/">Captainslog</a>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/" routerLinkActive="active" 
                               [routerLinkActiveOptions]="{exact: true}">Create</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/someroutethatdoesnotexist">404</a>
                        </li>
                    </ul>
                </div>
            </nav>            
            <router-outlet></router-outlet>
        </div>
    `,
    styles: []
})
export class AppComponent {}
