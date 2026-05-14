/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  PASSENGER = 'PASSENGER',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN'
}

export enum VehicleTier {
  PLATINUM = 'PLATINUM',
  GOLD = 'GOLD',
  SILVER = 'SILVER',
  BIKE = 'BIKE'
}

export enum ParcelSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}

export enum RideStatus {
  IDLE = 'IDLE',
  REQUESTED = 'REQUESTED',
  DRIVER_ACCEPTED = 'DRIVER_ACCEPTED',
  DRIVER_ARRIVING = 'DRIVER_ARRIVING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  RATED = 'RATED',
  CANCELLED_BY_PASSENGER = 'CANCELLED_BY_PASSENGER',
  CANCELLED_BY_DRIVER = 'CANCELLED_BY_DRIVER',
  NO_DRIVER_FOUND = 'NO_DRIVER_FOUND',
  PAYMENT_PENDING = 'PAYMENT_PENDING'
}

export enum DeliveryStatus {
  IDLE = 'IDLE',
  PARCEL_REQUESTED = 'PARCEL_REQUESTED',
  COURIER_ACCEPTED = 'COURIER_ACCEPTED',
  PICKUP_IN_PROGRESS = 'PICKUP_IN_PROGRESS',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  RATED = 'RATED',
  CANCELLED = 'CANCELLED'
}

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  geohash?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  role: UserRole;
  phoneNumber: string;
  isVerified: boolean;
  walletBalance: number;
  vehicleTier?: VehicleTier;
  currentLocation?: Location;
  isOnline: boolean;
  rating: number;
  totalJobs: number;
  documents?: {
    nationalId?: string;
    vehicleReg?: string;
    policeClearance?: string;
  };
}

export interface RideRequest {
  id: string;
  passengerId: string;
  driverId?: string;
  status: RideStatus;
  pickup: Location;
  destination: Location;
  fare: number;
  tier: VehicleTier;
  surgeMultiplier: number;
  createdAt: number;
  updatedAt: number;
}

export interface DeliveryRequest {
  id: string;
  senderId: string;
  courierId?: string;
  status: DeliveryStatus;
  pickup: Location;
  destination: Location;
  parcelSize: ParcelSize;
  fare: number;
  createdAt: number;
  updatedAt: number;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'TOPUP' | 'COMMISSION' | 'ADJUSTMENT';
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  reference?: string;
  timestamp: number;
}
