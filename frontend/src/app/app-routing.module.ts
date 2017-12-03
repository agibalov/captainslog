import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./page-not-found.component";
import {NgModule} from "@angular/core";
import {LogRecordResolver, LogRecordViewComponent} from "./log-record-view.component";
import {LogRecordCreateComponent} from "./log-record-create.component";
import {LogRecordListResolver, LogRecordListViewComponent} from "./log-record-list-view.component";

const appRoutes: Routes = [
    {
        path: '',
        component: LogRecordCreateComponent
    },
    {
        path: 'logrecords',
        component: LogRecordListViewComponent,
        resolve: {
            logRecords: LogRecordListResolver
        }
    },
    {
        path: 'logrecords/:id/view',
        component: LogRecordViewComponent,
        resolve: {
            logRecord: LogRecordResolver
        }
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
    ],
    providers: [
        LogRecordListResolver,
        LogRecordResolver
    ]
})
export class AppRoutingModule {}
