import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Enquiry {
    name: string;
    propertyId: string;
    email: string;
    message: string;
}
export interface Property {
    id: string;
    pricePerNight: bigint;
    name: string;
    description: string;
    ecoFeatures: Array<string>;
    location: string;
    maxGuests: bigint;
}
export interface backendInterface {
    addProperty(id: string, name: string, location: string, description: string, ecoFeatures: Array<string>, pricePerNight: bigint, maxGuests: bigint): Promise<void>;
    getAllEnquiries(): Promise<Array<Enquiry>>;
    getAllProperties(): Promise<Array<Property>>;
    getProperty(id: string): Promise<Property>;
    getSeedProperties(): Promise<Array<Property>>;
    reset(): Promise<void>;
    submitEnquiry(name: string, email: string, message: string, propertyId: string): Promise<void>;
}
