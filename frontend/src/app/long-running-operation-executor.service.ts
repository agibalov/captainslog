import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Injectable} from "@angular/core";

@Injectable()
export class LongRunningOperationExecutor {
    private count = 0;
    private wip = new BehaviorSubject<boolean>(false);
    wip$ = this.wip.asObservable();

    async execute<T>(operation: (() => Promise<T>)): Promise<T> {
        ++this.count;
        this.updateWip();

        try {
            return await operation();
        } finally {
            --this.count;
            this.updateWip();
        }
    }

    private updateWip() {
        this.wip.next(this.count > 0);
    }
}
