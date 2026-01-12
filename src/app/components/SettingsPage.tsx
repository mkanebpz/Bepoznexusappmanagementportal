import { useState } from 'react';
import { Upload, Plus, Trash2, Edit2, Shield, AlertTriangle } from 'lucide-react';

interface CustomApp {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
}

const mockCustomApps: CustomApp[] = [
  { id: '1', name: 'Deputy', url: 'https://deputy.com/login', enabled: true },
  { id: '2', name: 'Rostering System', url: 'https://roster.venue.com', enabled: false },
];

export function SettingsPage() {
  const [apps, setApps] = useState<CustomApp[]>(mockCustomApps);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Portal Settings</h1>
          <p className="text-gray-600">Configure the landing experience for your venue</p>
        </div>

        <div className="space-y-6">
          {/* Branding Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Venue Branding</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue Display Name
                </label>
                <input
                  type="text"
                  defaultValue="Main Street Location"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#002D6A] transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">This overrides the system name on the Home screen.</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue Logo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                      Upload Logo
                    </button>
                    <p className="text-xs text-gray-500 mt-1">Recommended: 200x200px PNG</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Custom App Tiles */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Custom App Tiles</h2>
                <p className="text-sm text-gray-600">Manage external links that appear on the dashboard</p>
              </div>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-[#002D6A] rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add App
              </button>
            </div>

            <div className="space-y-3">
              {/* System Apps (Locked) */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 opacity-75">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center">
                      <Shield className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">System Apps (Web Backoffice, Toolbox...)</p>
                      <p className="text-xs text-gray-500">Managed by Bepoz</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded">Locked</span>
                </div>
              </div>

              {/* Custom Apps */}
              {apps.map((app) => (
                <div key={app.id} className="p-4 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Icon Placeholder */}
                      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 font-bold">
                        {app.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{app.name}</p>
                        <p className="text-xs text-gray-500">{app.url}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={app.enabled} 
                          onChange={() => {}} 
                          className="rounded text-[#002D6A] focus:ring-[#002D6A]"
                        />
                        {app.enabled ? 'Enabled' : 'Disabled'}
                      </label>
                      <button className="p-2 text-gray-400 hover:text-[#002D6A] hover:bg-gray-100 rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Roles & Permissions (MVP Info) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Roles & Permissions</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Permissions are currently managed by role.</p>
                <p className="text-sm text-blue-800 mt-1">
                  Staff users can only access the Home screen and their assigned apps. Venue Managers have full access to all settings and user management.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
             <button className="px-6 py-2.5 bg-[#002D6A] text-white rounded-lg font-medium hover:bg-[#003d8a] transition-colors shadow-sm">
                Save All Changes
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
