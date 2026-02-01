import { TravelAgency } from "./travelAgency";
import { User } from "./user";

export interface TravelAgencyUsers {
    id?: number;
    travel_agency_id?: number;
    user_id?: number;

    travel_agency?: TravelAgency;
    user?: User;
    
    created_at?: string|Date;
    updated_at?: string|Date;
}
