/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VehicleTier, ParcelSize } from './types';

export const ZIMBABWE_REGIONS = {
  HARARE: {
    lat: -17.8252,
    lng: 31.0335
  },
  BULAWAYO: {
    lat: -20.1465,
    lng: 28.5833
  }
};

export const PRICING = {
  RIDE: {
    BASE_RATE: 2.0, // USD
    PER_KM: 0.8,
    TIER_MULTIPLIERS: {
      [VehicleTier.PLATINUM]: 1.5,
      [VehicleTier.GOLD]: 1.25,
      [VehicleTier.SILVER]: 1.0,
      [VehicleTier.BIKE]: 0.8
    }
  },
  DELIVERY: {
    BASE_RATE: 1.5,
    PER_KM: 0.5,
    SIZE_MULTIPLIERS: {
      [ParcelSize.SMALL]: 1.0,
      [ParcelSize.MEDIUM]: 1.3,
      [ParcelSize.LARGE]: 1.6
    }
  }
};

export const WALLET_MIN_THRESHOLD = 5.0; // Minimum balance to stay online
export const COMMISSION_RATE = 0.15; // 15% platform commission

export const SURGE_ZONES = [
  { id: 'harare-cbd', name: 'Harare CBD', polygon: [] },
  { id: 'borrowdale', name: 'Borrowdale', polygon: [] },
  { id: 'avondale', name: 'Avondale', polygon: [] },
  { id: 'airport', name: 'Harare Airport', polygon: [] },
  { id: 'bulawayo-cbd', name: 'Bulawayo CBD', polygon: [] }
];
