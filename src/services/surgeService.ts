/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Location } from '../types';

// Simplified polygon check (Ray Casting algorithm)
function isPointInPolygon(point: { lat: number, lng: number }, polygon: { lat: number, lng: number }[]) {
  let x = point.lat, y = point.lng;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    let xi = polygon[i].lat, yi = polygon[i].lng;
    let xj = polygon[j].lat, yj = polygon[j].lng;
    let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

const ZONES = [
  {
    id: 'harare-cbd',
    name: 'Harare CBD',
    polygon: [
      { lat: -17.82, lng: 31.02 },
      { lat: -17.82, lng: 31.05 },
      { lat: -17.84, lng: 31.05 },
      { lat: -17.84, lng: 31.02 }
    ]
  }
  // ... other zones added as needed
];

export function getSurgeMultiplier(location: Location, supplyDemandRatio: number): number {
  const inZone = ZONES.find(zone => isPointInPolygon({ lat: location.latitude, lng: location.longitude }, zone.polygon));
  
  if (!inZone) return 1.0;

  // Rapido-style logic
  if (supplyDemandRatio < 0.5) return 2.5; // Very high demand, low supply
  if (supplyDemandRatio < 1.0) return 1.8;
  if (supplyDemandRatio < 1.5) return 1.2;
  
  return 1.0;
}
