import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";

@Injectable()
export class ApiClient {
    constructor(
        @Inject('API_ENDPOINT') private apiEndpoint: string,
        private http: HttpClient)
    {}

    async createLogRecord(attributes: EditableLogRecordAttributes): Promise<LogRecord> {
        try {
            const response = await this.http.post(this.apiEndpoint + '/logrecords', attributes, {
                observe: 'response',
                responseType: 'text'
            }).toPromise();
            const location = response.headers.get('Location');
            return this.http.get<LogRecord>(location).toPromise();
        } catch(e) {
            if (e instanceof HttpErrorResponse) {
                throw new UnknownApiError();
            } else {
                throw e;
            }
        }
    }

    async getLogRecords(page: number, size: number): Promise<Page<LogRecord>> {
        try {
            return await this.http.get<Page<LogRecord>>(this.apiEndpoint + '/logrecords', {
                params: new HttpParams()
                    .set('page', `${page}`)
                    .set('size', `${size}`)
            }).toPromise<Page<LogRecord>>();
        } catch(e) {
            throw e;
        }
    }

    async getLogRecord(id: string): Promise<LogRecord> {
        try {
            return await this.http.get<LogRecord>(this.apiEndpoint + '/logrecords/' + id).toPromise<LogRecord>();
        } catch(e) {
            if (e instanceof HttpErrorResponse) {
                const her = <HttpErrorResponse>e;
                if(her.status == 404) {
                    throw new LogRecordNotFoundApiError();
                }

                throw new UnknownApiError();
            } else {
                throw e;
            }
        }
    }

    async deleteLogRecord(id: string): Promise<void> {
        try {
            await this.http.delete(this.apiEndpoint + '/logrecords/' + id).toPromise();
        } catch(e) {
            if (e instanceof HttpErrorResponse) {
                const her = <HttpErrorResponse>e;
                if(her.status == 404) {
                    throw new LogRecordNotFoundApiError();
                }

                throw new UnknownApiError();
            } else {
                throw e;
            }
        }
    }
}

export class EditableLogRecordAttributes {
    text: string;
}

export class LogRecord extends EditableLogRecordAttributes {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export class Page<TItem> {
    items: TItem[];
    page: number;
    size: number;
    totalPages: number;
    totalItems: number;
}

export abstract class ApiError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export class LogRecordNotFoundApiError extends ApiError {
    constructor() {
        super('LogRecord not found');
        Object.setPrototypeOf(this, LogRecordNotFoundApiError.prototype);
    }
}

export class UnknownApiError extends ApiError {
    constructor() {
        super('Unknown API error');
        Object.setPrototypeOf(this, UnknownApiError.prototype);
    }
}
