import { FlightDestination } from './flightDestination';
import { itineraryConnection } from './itineraryConnection';
import { Taxes } from './taxes';

export interface Itinerary {
    id?: number;
    flight_no: string;
    flight_destinations_id_from: number;
    flight_destinations_id_to: number;
    departure: string|Date;
    arrival: string|Date;
    stops: number;
    status?: number;

    flight_destinations_from?: FlightDestination;
    flight_destinations_to?: FlightDestination;
    itinerary_connections?: itineraryConnection[];
    itinerary_taxes?: Taxes[];

    created_at?: string|Date;
    updated_at?: string|Date;
}
