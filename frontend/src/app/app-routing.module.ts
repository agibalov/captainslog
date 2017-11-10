import {RouterModule, Routes} from "@angular/router";
import {Page1Component} from "./page1.component";
import {Page2Component} from "./page2.component";
import {PageNotFoundComponent} from "./page-not-found.component";
import {NgModule} from "@angular/core";

const appRoutes: Routes = [
    {
        path: '',
        component: Page1Component
    },
    {
        path: 'page2',
        component: Page2Component
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
