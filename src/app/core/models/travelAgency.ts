export interface TravelAgency {
    id?: number;
    rtn?: string;
    name?: string;
    telephone?: string;
    email?: string;
    dir1?: string;
    dir2?: string;
    commission?: number;
    discount?: number;
    credit_limit?: number;
    balance?: number;
    status?: string;
    
    created_at?: string|Date;
    updated_at?: string|Date;
}
