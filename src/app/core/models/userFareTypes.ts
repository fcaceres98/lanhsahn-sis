import { FareTypes } from "./fareTypes";
import { User } from "./user";

export interface UserFareTypes {
    id?: number;
    user_id: number;
    fare_type_id: number;

    created_at?: string|Date;
    updated_at?: string|Date;

    fare_type?: FareTypes;
    user?: User;
}
