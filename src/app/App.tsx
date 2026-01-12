import { useState } from 'react';
import { SignInScreen } from './components/SignInScreen';
import { LeftNavigation, UserRole } from './components/LeftNavigation';
import { TopHeader, Venue, mockVenues } from './components/TopHeader';
import { Home } from './components/Home';
import { UsersPage } from './components/UsersPage';
import { RequestsPage } from './components/RequestsPage';
import { AuditLogPage } from './components/AuditLogPage';
import { SettingsPage } from './components/SettingsPage';

type AppState = 'signin' | 'portal';

export default function App() {
  const [appState, setAppState] = useState<AppState>('signin');
  const [activeView, setActiveView] = useState('home');
  const [selectedVenue, setSelectedVenue] = useState<Venue>(mockVenues[0]);
  
  // Mock role for demo purposes (default to manager to show all features)
  const [userRole, setUserRole] = useState<UserRole>('manager');

  // Authentication flow
  if (appState === 'signin') {
    return <SignInScreen onSignIn={() => setAppState('portal')} />;
  }

  // Main Portal
  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <Home venue={selectedVenue} />;
      case 'users':
        return <UsersPage />;
      case 'requests':
        return <RequestsPage />;
      case 'audit':
        return <AuditLogPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Home venue={selectedVenue} />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Top Header spans the full width */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopHeader 
          selectedVenue={selectedVenue} 
          onVenueChange={setSelectedVenue}
        />
      </div>

      {/* Main Layout container with top padding for header */}
      <div className="flex w-full h-full pt-20">
        {/* Left Navigation */}
        <LeftNavigation 
          activeItem={activeView} 
          onItemClick={setActiveView}
          userRole={userRole}
          onLogout={() => setAppState('signin')}
        />
        
        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {renderContent()}
          
          {/* Demo Role Toggler (Hidden/Subtle) */}
          <div className="absolute bottom-4 right-4 opacity-0 hover:opacity-100 transition-opacity bg-black/80 text-white text-xs p-2 rounded pointer-events-auto">
            <span className="font-bold block mb-1">Demo Controls</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setUserRole('manager')}
                className={`px-2 py-1 rounded ${userRole === 'manager' ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                Manager
              </button>
              <button 
                onClick={() => setUserRole('staff')}
                className={`px-2 py-1 rounded ${userRole === 'staff' ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                Staff
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
