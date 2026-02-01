export interface Taxes {
    id?: number;
    description?: string;
    abbreviation?: string;
    tax_type?: string;
    tax?: number;
    status?: string;
    created_at?: string|Date;
    updated_at?: string|Date;
}
