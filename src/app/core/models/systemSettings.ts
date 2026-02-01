export interface SystemSettings {
    id?: number;

    //General Information
    name?: string;
    abbreviation?: string;
    code?: string;
    rtn?: string;
    telephone?: string;
    direction?: string;
    slogan?: string;
    email?: string;
    website?: string;

    //Parameters
    infant_discount?: number;
    child_discount?: number;
    senior_discount?: number;
    older_senior_discount?: number;
    ticket_valid_months?: number;

    luggage_default_limit?: number;
    luggage_default_value?: number;
    luggage_default_pound_limit?: number;
    
    flight_change_penalty?: number;
    name_change_penalty?: number;
    expired_reservation_penalty?: number;

    charter_flight_minute_value?: number;

    created_at?: string|Date;
    updated_at?: string|Date;
}
