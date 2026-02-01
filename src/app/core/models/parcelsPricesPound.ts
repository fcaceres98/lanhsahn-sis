import { FlightDestination } from '@src/app/core/models/flightDestination';

export interface ParcelsPricesPound {
    id?: number;
    flight_destinations_id_from?: number;
    flight_destinations_id_to?: number;
    description?: string;
    value?: number;
    status?: string;
    created_at?: string|Date;
    updated_at?: string|Date;
    flight_destinations_from?: FlightDestination;
    flight_destinations_to?: FlightDestination;
}