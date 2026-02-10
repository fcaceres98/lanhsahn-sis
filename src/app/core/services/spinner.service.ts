import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {
    private activeRequests = signal(0);
    public isLoading = signal(false);
  
    show(): void {
        this.activeRequests.update(count => count + 1);
        this.isLoading.set(true);
    }

    hide(): void {
        this.activeRequests.update(count => {
            const newCount = Math.max(0, count - 1);
            if (newCount === 0) {
                this.isLoading.set(false);
            }
            return newCount;
        });
    }

    reset(): void {
        this.activeRequests.set(0);
        this.isLoading.set(false);
    }
}
