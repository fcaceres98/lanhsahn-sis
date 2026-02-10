import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { AuthService, LocalAuth } from '@src/app/core/services/auth.service';
import { SpinnerService } from '@src/app/core/services/spinner.service';

export const httpHeaderInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const localAuth: LocalAuth = authService.getLocalAuth();

    const spinnerService = inject(SpinnerService);
    
    if (localAuth && localAuth.token) {
        spinnerService.show();

        const clonedReq = req.clone({
            setHeaders: {
                Accept: 'application/json',
                Authorization: `Bearer ${localAuth.token}`
            }
        });

        return next(clonedReq).pipe(
            finalize(() => {
                spinnerService.hide();
            })
        );
    }
    return next(req);
};
