export interface AutoCompleteProps<T extends object> {
    placeholder?: string;
    options: T[];
    labelKey?: keyof T;
    valueKey?: keyof T;
    oKey?: string;
    disabled?: boolean;
}

