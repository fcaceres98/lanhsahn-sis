import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService, LocalAuth } from '@src/app/core/services/auth.service';

export const httpHeaderInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const localAuth: LocalAuth = authService.getLocalAuth();

    if (localAuth && localAuth.token) {
        const clonedReq = req.clone({
            setHeaders: {
                Accept: 'application/json',
                Authorization: `Bearer ${localAuth.token}`
            }
        });

        return next(clonedReq);
    }
    return next(req);
};
