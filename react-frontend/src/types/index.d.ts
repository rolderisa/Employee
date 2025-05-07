
export interface TimestampAudit {
    createdAt?: Date
    updatedAt?: Date
}
export interface IUser extends TimestampAudit {
    id: number
    names: string;
    email: string;
    password?: string;
    role: string;
}

export interface IEmployee extends TimestampAudit {
    id?: number
    firstName: string,
    lastName: string,
    email: string,
    nationalId: string,
    telephone: string,
    department: string,
    position: string,
    laptopManufacturer: string,
    model: string
}

export interface ILoginData {
    email: string,
    password: string
}

export interface IMeta {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number;
    next: number;
}