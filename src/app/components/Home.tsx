import { 
  LayoutGrid, 
  Wrench, 
  BookOpen, 
  ExternalLink, 
  AlertCircle,
  Clock,
  Calendar,
  BarChart3,
  Utensils,
  Store,
  FileText
} from 'lucide-react';
import { Venue } from './TopHeader';

export function Home({ venue }: { venue: Venue }) {
  // Mock data for tiles
  const systemApps = [
    { id: 'backoffice', name: 'Web Backoffice', icon: LayoutGrid, status: 'active', url: '#' },
    { id: 'toolbox', name: 'Toolbox', icon: Wrench, status: 'active', url: '#' },
    { id: 'knowledge', name: 'Knowledge Base', icon: BookOpen, status: 'active', url: '#' },
    { id: 'insights', name: 'Nexus Insights', icon: BarChart3, status: 'active', url: '#' },
    { id: 'kms', name: 'Nexus KMS Link', icon: Utensils, status: 'active', url: '#' },
    { id: 'rms', name: 'Nexus RMS Link', icon: Store, status: 'active', url: '#' },
  ];

  const customApps = [
    { id: 'deputy', name: 'Deputy', icon: Clock, status: 'active', url: '#', isCustom: true },
    { id: 'xero', name: 'Xero Accounting', icon: FileText, status: 'issue', url: '#', isCustom: true },
  ];

  const hasIssues = customApps.some(app => app.status === 'issue');

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {venue.icon ? (
              <venue.icon className="w-8 h-8 text-gray-400" />
            ) : (
              <Store className="w-8 h-8 text-gray-400" />
            )}
            <h1 className="text-2xl font-bold text-gray-900">{venue.name}</h1>
          </div>
          <p className="text-gray-600">Welcome to your Bepoz Nexus portal.</p>
        </div>

        {/* Status Hint */}
        {hasIssues && (
          <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span className="text-amber-800 font-medium">Some services may be unavailable for this venue</span>
            </div>
            <button className="text-amber-700 font-medium hover:underline text-sm">
              View details
            </button>
          </div>
        )}

        {/* System Apps */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Core Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {systemApps.map((app) => {
              const Icon = app.icon;
              return (
                <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-[#002D6A] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6 text-[#002D6A] group-hover:text-white" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">{app.name}</h3>
                    <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600 group-hover:bg-blue-50 group-hover:text-[#002D6A]">
                      Bepoz
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Apps */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Venue Apps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {customApps.map((app) => {
              const Icon = app.icon;
              return (
                <a 
                  key={app.id} 
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group block relative"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <Icon className="w-6 h-6 text-gray-600" />
                    </div>
                    {app.status === 'issue' && (
                      <span className="absolute top-6 right-6 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      {app.name}
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </h3>
                    <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600 group-hover:bg-gray-200">
                      Launch
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
