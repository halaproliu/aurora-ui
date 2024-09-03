import { Component } from 'vue';
import { RuleExpression } from 'vee-validate';

type GenericObject = Record<string, any>;

export interface FormProps<T extends GenericObject> {
  initialValues?: T;
  /**
   * @description 表单提交事件
   */
  onSubmit?: (values: T) => void;
  /**
   * @description 表单重置事件
   */
  onReset?: () => void;
  /**
   * @description 表单校验事件
   */
}

export interface FormItemProps {
  name: string;
}

export interface UseFormProps<T extends GenericObject> {
  initialValues?: T;
}

export interface UseFormReturn<T extends GenericObject> {
  values: T;
  setFieldValue: (key: keyof T, value: T[keyof T]) => void;
  setValues: (values: T) => void;
  resetForm: () => void;
}

export interface DynamicFormItem {
  as: string | Component;
  label?: string;
  name: string;
  rules?: RuleExpression<unknown>;
  class?: string;
  style?: string;
  tag?: string;
  text?: string;
  children?: DynamicFormItem[];
}

export interface DynamicFormProps {
  direction?: 'horizontal' | 'vertical';
  labelWidth?: string;
  schema: {
    fields: DynamicFormItem[];
  };
}
