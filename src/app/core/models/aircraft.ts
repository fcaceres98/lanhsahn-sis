import { Country } from "./country";
import { AircraftSeats } from "./aircraftSeats";
export interface Aircraft {
    id?: number;
    fleet?: string;
    model?: string;
    registration?: string;
    serial_number?: string;
    description?: string;
    aircraft_type?: string;

    country_id?: number;
    manufacture_date?: string|Date;
    flight_sheet_type?: string;
    fuel_measurement_unit?: string;

    daily_projected_hours?: number;
    daily_projected_landings?: number;
    daily_projected_cycles?: number;

    last_flight?: string;
    hours?: number;
    landings?: number;
    cycles?: number;
    aircraft_active?: string;

    adult_weight?: number;
    child_weight?: number;
    capacity?: number;
    limit?: number;
    columns?: number;
    emergency_seats: string;
    
    status?: string;
    created_at?: string|Date;
    updated_at?: string|Date;

    country?: Country;

    aircrafts_seats?: AircraftSeats[];
}
