import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./page-not-found.component";
import {NgModule} from "@angular/core";
import {LogRecordResolver, LogRecordViewComponent} from "./log-record-view.component";
import {LogRecordCreateComponent} from "./log-record-create.component";
import {LogRecordListViewComponent, LogRecordsPageResolver} from "./log-record-list-view.component";

const appRoutes: Routes = [
    {
        path: '',
        component: LogRecordCreateComponent
    },
    {
        path: 'logrecords',
        component: LogRecordListViewComponent,
        resolve: {
            logRecordsPage: LogRecordsPageResolver
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
        LogRecordsPageResolver,
        LogRecordResolver
    ]
})
export class AppRoutingModule {}
