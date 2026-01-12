import { ChevronDown, Wifi, WifiOff, RefreshCw, Building2 } from 'lucide-react';
import { useState } from 'react';
import bepozLogo from 'figma:asset/160fd2e4f2208e9def53416e864e70c94507c7fa.png';
import mainStreetLogo from 'figma:asset/2ffd41894dfd933e14351f5338b3fed8c91c9584.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Venue {
  id: string;
  name: string;
  status: 'connected' | 'syncing' | 'offline';
  logoUrl?: string;
  icon?: React.ElementType;
}

export const mockVenues: Venue[] = [
  { 
    id: '1', 
    name: 'Main Street Location', 
    status: 'connected',
    logoUrl: mainStreetLogo,
    icon: Building2
  },
  { 
    id: '2', 
    name: 'Downtown Plaza', 
    status: 'syncing',
    // No logo for this one to test fallback/absence
    icon: Building2
  },
];

export function TopHeader({ 
  selectedVenue, 
  onVenueChange
}: { 
  selectedVenue: Venue; 
  onVenueChange: (venue: Venue) => void;
}) {
  const [showVenueMenu, setShowVenueMenu] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'syncing':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'offline':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-600 bg-green-50';
      case 'syncing':
        return 'text-blue-600 bg-blue-50';
      case 'offline':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-30 relative shadow-sm">
      {/* Left: Logo */}
      <div className="flex items-center gap-3 w-64">
        <ImageWithFallback 
          src={bepozLogo} 
          alt="Bepoz Nexus" 
          className="h-14 w-auto object-contain"
        />
      </div>

      {/* Center: Venue Selector */}
      <div className="flex-1 flex justify-center">
        {mockVenues.length > 1 && (
          <div className="relative">
            <button
              onClick={() => setShowVenueMenu(!showVenueMenu)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors bg-white shadow-sm"
            >
              <div className="flex items-center gap-2">
                {getStatusIcon(selectedVenue.status)}
                <div className="text-left">
                  <p className="font-medium text-sm text-gray-900">{selectedVenue.name}</p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {showVenueMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowVenueMenu(false)}
                />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
                  {mockVenues.map((venue) => (
                    <button
                      key={venue.id}
                      onClick={() => {
                        onVenueChange(venue);
                        setShowVenueMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      {getStatusIcon(venue.status)}
                      <div className="flex-1 text-left">
                        <p className="font-medium text-sm text-gray-900">{venue.name}</p>
                        <p className={`text-xs capitalize ${getStatusColor(venue.status).split(' ')[0]}`}>
                          {venue.status}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 w-64 justify-end">
        {selectedVenue.logoUrl && (
          <ImageWithFallback 
            src={selectedVenue.logoUrl} 
            alt={`${selectedVenue.name} Logo`} 
            className="h-16 w-auto object-contain max-w-[180px]"
          />
        )}
      </div>
    </header>
  );
}
