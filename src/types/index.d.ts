declare type Nullable<T> = { [K in keyof T]: T[K] | null };

declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
