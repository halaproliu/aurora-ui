export interface FieldProps {
    label?: string;
    name: string;
    width?: number | string;
    direction?: 'horizontal' | 'vertical';
    errorMessage?: string;
    required?: boolean;
    touched?: boolean;
    dirty?: boolean;
}