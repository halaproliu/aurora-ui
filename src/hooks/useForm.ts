import { UseFormProps, UseFormReturn } from '@/types/form'

export default function useForm<T extends Record<string, any>>(props: UseFormProps<T>): UseFormReturn<T> {
    const { initialValues, model } = props
    const state: T = { ...initialValues, ...model } as T

    const setState = (key: keyof T, value: T[keyof T]) => {
        state[key] = value
    }

    const getState = (key: keyof T) => {
        return state[key]
    }

    const onValuesChange = (emit: (event: string, ...args: any[]) => void) => {
        emit('onValuesChange')
    }

    return {
        state,
        setState,
        getState,
        onValuesChange
    }
}