export interface NavItem {
    id: string;
    displayName: string;
    enabled?: boolean;
    iconName: string;
    route?: string;
    children?: NavItem[];
}
