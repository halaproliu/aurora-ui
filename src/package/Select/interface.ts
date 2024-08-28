export interface SelectOption {
  id?: string | number;
  label?: string;
  value?: string | number;
  disabled?: boolean;
  children?: SelectOption[];
  name?: string;
  ename?: string;
  [key: string]: any;
}

export interface SelectProps {
  placeholder?: string;
  options: SelectOption[];
  labelKey?: keyof SelectOption;
  valueKey?: keyof SelectOption;
  value?: string;
  oKey?: string;
  formatter?: (value: SelectOption | string | number | boolean) => string;
  multiple?: boolean;
  valueType?: 'basic' | 'object';
  disabled?: boolean;
  inputClass?: string;
  allowClear?: boolean;
}
