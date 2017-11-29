import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./page-not-found.component";
import {NgModule} from "@angular/core";
import {LogRecordViewComponent} from "./log-record-view.component";
import {LogRecordCreateComponent} from "./log-record-create.component";

const appRoutes: Routes = [
    {
        path: '',
        component: LogRecordCreateComponent
    },
    {
        path: 'logrecords/:id/view',
        component: LogRecordViewComponent
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
