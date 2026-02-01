import { Branch } from '@src/app/core/models/branch';

export interface CAI {
    id?: number;
    branch_id?: number;
    cai?: string;
    format?: string;
    position_no?: number;
    initial_no?: number;
    final_no?: number;
    limit_date?: string|Date;
    created_at?: string|Date;
    updated_at?: string|Date;
    branch?: Branch;
}
