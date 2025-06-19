import { Types } from 'mongoose';
import { RegionType, UserRole } from '../utils/constrants';

declare global {
    namespace Express {
      interface Request {
        user?: IUser & Document
        userId?: string;
      }
    }
  }

export type CustomJwtPayload = {
  userId: string
  phone: string
  cid: string
  role: string
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  phone: string;
  cid: string;
  role: UserRole;
  password: string;
}

export type IDzongkhag = {

  _id?: Types.ObjectId; // optional if creating new entries
  name: string;
  nameInDzongkha?: string;
  code: string;
  region: RegionType;
  area?: number; // in sq km
  population?: string;
  coordinates?: {
    latitude?: number;
    longitude?: number;
  };
};

export type IGewog = {
  _id?: Types.ObjectId;
  name: string;
  nameInDzongkha?: string;
  dzongkhag: Types.ObjectId | IDzongkhag
  area?: number;
  population?: number;
  coordinates?: {
    latitude?: number;
    longitude?: number;
  };
}


export interface HouseholdHead {
  name: string;
  citizenshipId: string;
  phoneNumber: string;
}

export interface Address {
  gewog: Types.ObjectId; // reference to Gewog
  village: string;
  houseNumber: string;
}

export type ConnectionType = 'Individual' | 'Shared' | 'Community_Standpost';
export type StatusType = 'Active' | 'Disconnected' | 'Suspended';
export type TariffCategory = 'Domestic' | 'Commercial' | 'Industrial' | 'Institutional';

export interface IConsumer {
  _id?: Types.ObjectId;
  householdId: string;
  householdHead: HouseholdHead;
  address: Address;
  familySize?: number;
  connectionType: ConnectionType;
  meterNumber?: string;
  connectionDate?: Date;
  status?: StatusType;
  tariffCategory?: TariffCategory;
  createdAt?: Date;
  updatedAt?: Date;
}




