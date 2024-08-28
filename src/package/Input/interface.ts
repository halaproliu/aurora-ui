export interface InputProps {
    type?: 'text' | 'password' | 'email' | 'number' | 'autocomplete' | 'textarea';
    name?: string;
    label?: string;
    placeholder?: string;
    direction?: 'vertical' | 'horizontal';
    required?: boolean;
    errorMessage?: string;
    labelWidth?: number | string;
    rows?: number;
    disabled?: boolean;
    autoSize?: boolean | { minRows?: number; maxRows?: number };
}