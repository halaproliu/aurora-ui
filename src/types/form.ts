export interface UseFormProps<T> {
    initialValues?: T
    model?: T
}

export interface UseFormReturn<T> {
    state: T
    setState: (key: keyof T, value: T[keyof T]) => void
    getState: (key: keyof T) => T[keyof T]
    onValuesChange: (emit: (event: string, ...args: any[]) => void) => void
}