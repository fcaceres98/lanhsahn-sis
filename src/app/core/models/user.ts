import { Group } from './group';
import { Branch } from './branch';
import { UserFareTypes } from './userFareTypes';

export interface User {
    id?: number;
    group_id?: number;
    branch_id?: number;
    avatar?: string;
    profile_image?: string;
    language?: string;
    name?: string;
    email?: string;
    direction?: string;
    telephone?: string;
    folio?: string;
    sequential?: number;
    status?: string;
    type?: string;
    user?: string;
    email_verified_at?: string|Date;
    created_at?: string|Date;
    updated_at?: string|Date;
    group?: Group;
    branch?: Branch;
    user_fare_types?: UserFareTypes[];
}
