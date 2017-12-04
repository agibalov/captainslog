import {Component, Directive, Injectable, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ApiClient, LogRecord, Page} from "./api-client.service";
import {LongRunningOperationExecutor} from "./long-running-operation-executor.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

@Component({
    template: `
        <h1>Log record list view</h1>
        <p *ngIf="logRecordsPage">Page: {{ logRecordsPage.page }}, size: {{ logRecordsPage.size}},
            total pages: {{ logRecordsPage.totalPages }}, total items: {{ logRecordsPage.totalItems }}</p>
        <div *ngIf="logRecordsPage">
            <pagination #p="paginationApi" 
                        [totalPages]="logRecordsPage.totalPages" 
                        [currentPage]="logRecordsPage.page"
                        [pageSize]="logRecordsPage.size">
                <nav>
                    <ul class="pagination pagination-sm">
                        <li class="page-item" [ngClass]="{'disabled': !p.hasPrevious()}">
                            <a routerLink="/logrecords" [queryParams]="{ page: p.previous(), size: p.size() }"
                               class="page-link">Previous</a>
                        </li>
                        
                        <li class="page-item" *ngFor="let page of p.pages()" [ngClass]="{'disabled': page.current}">
                            <a routerLink="/logrecords" [queryParams]="{ page: page.number, size: p.size() }" 
                               class="page-link">{{page.number}}</a>
                        </li>

                        <li class="page-item" [ngClass]="{'disabled': !p.hasNext()}">
                            <a routerLink="/logrecords" [queryParams]="{ page: p.next(), size: p.size() }"
                               class="page-link">Next</a>
                        </li>
                    </ul>
                </nav>
            </pagination>
            <ul>
                <li *ngFor="let logRecord of logRecordsPage.items">
                    <span class="badge badge-primary">{{ logRecord.id }}</span><br>
                    created: {{ logRecord.createdAt }}<br>
                    updated: {{ logRecord.updatedAt }}<br>
                    text: {{ logRecord.text }}
                    <a [routerLink]="['/logrecords', logRecord.id, 'view']" class="btn btn-sm btn-primary">View</a>
                    <button type="button" class="btn btn-sm btn-danger" (click)="deleteLogRecord(logRecord.id)">Delete</button>
                </li>
            </ul>
        </div>
    `,
    styles: []
})
export class LogRecordListViewComponent implements OnInit {
    logRecordsPage: Page<LogRecord>;

    constructor(
        private route: ActivatedRoute,
        private apiClient: ApiClient,
        private longRunningOperationExecutor: LongRunningOperationExecutor)
    {}

    async ngOnInit() {
        this.route.data.subscribe((data: { logRecordsPage: Page<LogRecord> }) => {
            this.logRecordsPage = data.logRecordsPage;
        });
    }

    async deleteLogRecord(logRecordId: string): Promise<void> {
        await this.longRunningOperationExecutor.execute(async () => {
            await this.apiClient.deleteLogRecord(logRecordId);

            const page = this.logRecordsPage.page;
            const size = this.logRecordsPage.size;
            this.logRecordsPage = await this.apiClient.getLogRecords(page, size);
        });
    }
}

@Injectable()
export class LogRecordsPageResolver implements Resolve<Page<LogRecord>> {
    constructor(
        private apiClient: ApiClient,
        private longRunningOperationExecutor: LongRunningOperationExecutor)
    {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Page<LogRecord>> {
        const page = +route.queryParamMap.get('page') || 0;
        const size = +route.queryParamMap.get('size') || 3;
        return await this.longRunningOperationExecutor.execute(async () => {
            return await this.apiClient.getLogRecords(page, size);
        });
    }
}

@Directive({
    selector: 'pagination',
    exportAs: 'paginationApi'
})
export class PaginationDirective {
    @Input() totalPages: number;
    @Input() currentPage: number;
    @Input() pageSize: number;

    pages(): any[] {
        const pages = [];
        for(let i = 0; i < this.totalPages; ++i) {
            const page = {
                number: i,
                current: i == this.currentPage
            };
            pages.push(page);
        }
        return pages;
    }

    hasPrevious(): boolean {
        return this.currentPage > 0;
    }

    previous(): number {
        return this.currentPage - 1;
    }

    hasNext(): boolean {
        return this.currentPage + 1 < this.totalPages;
    }

    next(): number {
        return this.currentPage + 1;
    }

    size(): number {
        return this.pageSize;
    }
}
