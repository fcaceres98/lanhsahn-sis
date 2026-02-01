export interface FlightDestinationCharter {
    id?: number;
    country?: string;
    destination?: string;
    iata?: string;
    icao?: string;
    status?: string;
    created_at?: string|Date;
    updated_at?: string|Date;
}
