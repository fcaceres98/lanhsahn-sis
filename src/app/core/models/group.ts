export interface Group {
    id?: number;
    description?: string;
    status?: string;

    stations?: string;
    stations_reservations?: string;
    stations_parcels?: string;
    stations_search?: string;
    stations_search_flights?: string;
    stations_search_passengers?: string;
    stations_search_parcels?: string;
    stations_invoices?: string;
    stations_close_register?: string;

    search?: string;
    search_reservations_list?: string;
    search_parcels_list?: string;
    search_excess_luggage_list?: string;
    search_flight_change_list?: string;
    search_void_invoices_list?: string;

    operations?: string;
    operations_itinerary?: string;
    operations_flight_schedulling?: string;

    planning?: string;

    maintenance?: string;
    maintenance_aircraft?: string;
    maintenance_crew?: string;
    maintenance_crew_crewman?: string;
    maintenance_crew_scheduling?: string;
    maintenance_manuals?: string;
    maintenance_manuals_view?: string;
    maintenance_manuals_library?: string;

    note_control?: string;

    reports?: string;
    reports_revenuebetweendates?: string;
    reports_closedregisterreports?: string;
    reports_reservationsbetweendates?: string;
    reports_salesbyusersgroups?: string;
    reports_reservationsbyusersgroups?: string;
    reports_salesreservationsbyusersgroups?: string;

    options?: string;
    options_branches?: string;
    options_groups?: string;
    options_users?: string;
    options_cai?: string;
    options_flight_destinations?: string;
    options_charter_flight_destinations?: string;

    options_parcels?: string;
    options_parcels_fixed_prices?: string;
    options_parcels_prices_pounds?: string;
    
    options_clients?: string;
    options_travel_agencies?: string;
    options_settings?: string;

    created_at?: string|Date;
    updated_at?: string|Date;
}
