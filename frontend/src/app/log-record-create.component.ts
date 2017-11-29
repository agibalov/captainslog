import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ApiClient} from "./api-client.service";

export class LogRecordCreateModel {
    constructor(public text: string) {}
}

@Component({
    template: `
        <h1>Create log record</h1>
        <form #recordForm="ngForm" (ngSubmit)="createLogRecord()">
            <div class="form-group">
                <label for="text">Text</label>
                <textarea class="form-control" id="text" [(ngModel)]="model.text" name="text" 
                          required minlength="3" maxlength="10" #text="ngModel"></textarea>
            </div>
            <div *ngIf="text.invalid">
                <div *ngIf="text.errors.required">Should not be empty</div>
                <div *ngIf="text.errors.minlength">Should be at least {{ text.errors.minlength.requiredLength }} 
                    characters long, and you only have {{ text.errors.minlength.actualLength }}</div>
                <div *ngIf="text.errors.maxlength">Should be at most {{ text.errors.maxlength.requiredLength }}
                    characters long, and you already have {{ text.errors.maxlength.actualLength }}</div>
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="!recordForm.valid">Create log record</button>
        </form>
    `,
    styles: []
})
export class LogRecordCreateComponent {
    model = new LogRecordCreateModel('');

    constructor(
        private apiClient: ApiClient,
        private router: Router)
    {}

    async createLogRecord(): Promise<void> {
        const logRecord = await this.apiClient.createLogRecord({
            text: this.model.text
        });

        const id = logRecord.id;
        this.router.navigate(['logrecords', id, 'view']);
    }
}
