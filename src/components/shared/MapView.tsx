/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Car, Bike, MapPin, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ZIMBABWE_REGIONS, PRICING } from '../../constants';
import { VehicleTier, RideStatus } from '../../types';

export const MapView = ({ 
  center = ZIMBABWE_REGIONS.HARARE, 
  drivers = [], 
  currentJob = null 
}: any) => {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-inner bg-gray-100 border border-gray-200">
      <Map
        defaultCenter={center}
        defaultZoom={13}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={'zimgo-map'}
      >
        {drivers.map((driver: any) => (
          <AdvancedMarker
            key={driver.uid}
            position={driver.currentLocation}
          >
            <div className="p-2 bg-white rounded-full shadow-lg border-2 border-green-500">
              {driver.vehicleTier === VehicleTier.BIKE ? (
                <Bike className="w-4 h-4 text-green-600" />
              ) : (
                <Car className="w-4 h-4 text-green-600" />
              )}
            </div>
          </AdvancedMarker>
        ))}
      </Map>
    </div>
  );
};
