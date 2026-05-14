/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { geohashQueryBounds, distanceBetween } from 'geofire-common';
import { UserProfile, UserRole, VehicleTier, RideStatus } from '../types';

interface MatchCandidate extends UserProfile {
  distance: number;
  idleTime: number; // minutes since last job
}

export function findBestMatch(
  requestLocation: { lat: number, lng: number },
  candidates: MatchCandidate[],
  requiredTier: VehicleTier
): MatchCandidate | null {
  
  // 1. Filter by tier and availability
  const eligible = candidates.filter(c => 
    c.role === UserRole.DRIVER && 
    c.vehicleTier === requiredTier && 
    c.isOnline && 
    c.isVerified
  );

  if (eligible.length === 0) return null;

  // 2. Weighting Logic: Idle Time > Acceptance Rate > Rating
  // Priority: 1. Idle Time (max weight), 2. Acceptance (mid), 3. Rating (low)
  
  const scored = eligible.map(c => {
    const idleScore = Math.min(c.idleTime / 60, 1) * 100; // Cap at 1 hour
    const acceptanceScore = (c as any).acceptanceRate || 90; 
    const ratingScore = c.rating * 20; // Scale 5-star to 100

    const totalScore = (idleScore * 0.5) + (acceptanceScore * 0.3) + (ratingScore * 0.2);
    
    return { ...c, totalScore };
  });

  // Sort by score descending
  return scored.sort((a, b) => b.totalScore - a.totalScore)[0];
}
