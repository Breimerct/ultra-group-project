export interface IBooking {
    _id?: string;
    checkIn: string;
    checkOut: string;
    roomId: string;
    userId: string;
    companions: ICompanion[];
    emergencyContact: IEmergencyContact;
}

export interface ICompanion {
    name: string;
    email: string;
    cellphone: string;
    documentType: string;
    documentNumber: string;
    gender: Gender | null;
}

export interface IEmergencyContact {
    name: string;
    cellphone: string;
}

export interface IBookingDetail extends IBooking {
    hotel: IHotelResponse;
    room: IRoom;
    user: IUser;
}

export interface ILogin {
    email: string;
    password: string;
}

export enum Role {
    User = "user",
    Admin = "admin",
}

export interface ICategoryRoom {
    _id: string;
    category: string;
    tax: number;
}

export interface IHotel {
    _id?: string;
    name: string;
    description?: string | null;
    stars?: number | null;
    imageUrl: string;
    cityId: number;
    isAvailable: boolean;
}

export interface IHotelResponse extends IHotel {
    city: ICity;
}

export interface ICity {
    id: number;
    name: string;
    description: string;
    surface: number | null;
    population: number | null;
    postalCode: null | string;
    departmentId: number;
    department: null;
    touristAttractions: null;
    presidents: null;
    indigenousReservations: null;
    airports: null;
}

export interface IRoom {
    _id?: string;
    name: string;
    description?: string | null;
    stars?: number;
    imageUrls: string[];
    hotelId: string;
    categoryId: string;
    price?: number;
    isAvailable: boolean;
}

export interface IRoomDetail extends IRoom {
    category: ICategoryRoom;
}

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    cellphone: string;
    avatar?: string;
    password: string;
    role?: string;
    gender?: Gender | string | null;
    documentType?: string;
    documentNumber?: string;
}

export enum Gender {
    Female = "femenino",
    Male = "masculino",
}
