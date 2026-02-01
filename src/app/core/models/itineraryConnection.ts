import { Itinerary } from './itinerary';

export interface itineraryConnection {
    id?: number;
    itinerary_id: number;
    itinerary_id_connection: number;

    itinerary?: Itinerary;
    itinerary_connection?: Itinerary;
}
