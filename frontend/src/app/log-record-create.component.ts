import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ApiClient} from "./api-client.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LongRunningOperationExecutor} from "./long-running-operation-executor.service";

@Component({
    template: `
        <h1>Create log record</h1>
        <form [formGroup]="recordForm" (ngSubmit)="createLogRecord()">
            <div class="form-group">
                <label for="text">Text</label>
                <textarea class="form-control" id="text" formControlName="text"></textarea>
            </div>
            <div *ngIf="text.invalid">
                <div *ngIf="text.errors.required">Should not be empty</div>
                <div *ngIf="text.errors.minlength">Should be at least {{ text.errors.minlength.requiredLength }}
                    characters long, and you only have {{ text.errors.minlength.actualLength }}</div>
                <div *ngIf="text.errors.maxlength">Should be at most {{ text.errors.maxlength.requiredLength }}
                    characters long, and you already have {{ text.errors.maxlength.actualLength }}</div>
                <div *ngIf="text.errors.backend">Backend validation! {{ text.errors.backend.message }}</div>
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="recordForm.invalid">Create log record</button>
        </form>
    `,
    styles: []
})
export class LogRecordCreateComponent {
    recordForm: FormGroup;

    constructor(
        private apiClient: ApiClient,
        private router: Router,
        private formBuilder: FormBuilder,
        private longRunningOperationExecutor: LongRunningOperationExecutor)
    {
        this.recordForm = formBuilder.group({
            text: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(10)])]
        });
    }

    get text() {
        return this.recordForm.get('text');
    }

    async createLogRecord(): Promise<void> {
        this.longRunningOperationExecutor.execute(async () => {
            const text = this.text.value;
            if(text == 'qwerty') {
                this.text.setErrors({
                    backend: { message: '"qwerty" is not allowed' }
                });
                return;
            }

            const logRecord = await this.apiClient.createLogRecord({
                text: this.recordForm.get('text').value
            });

            const id = logRecord.id;
            this.router.navigate(['logrecords', id, 'view']);
        });
    }
}
