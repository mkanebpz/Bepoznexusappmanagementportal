import { Search, Filter } from 'lucide-react';

interface AuditEvent {
  id: string;
  timestamp: string;
  type: string;
  performedBy: string;
  targetUser?: string;
  venue: string;
}

const mockEvents: AuditEvent[] = [
  { 
    id: '1', 
    timestamp: '2023-10-25 14:30', 
    type: 'Access Approved', 
    performedBy: 'John Doe', 
    targetUser: 'new.chef@venue.com',
    venue: 'Main Street Location'
  },
  { 
    id: '2', 
    timestamp: '2023-10-25 14:28', 
    type: 'Operator Bound', 
    performedBy: 'John Doe', 
    targetUser: 'new.chef@venue.com',
    venue: 'Main Street Location'
  },
  { 
    id: '3', 
    timestamp: '2023-10-24 09:15', 
    type: 'Login', 
    performedBy: 'Sarah Jenkins', 
    venue: 'Main Street Location'
  },
  { 
    id: '4', 
    timestamp: '2023-10-23 16:45', 
    type: 'Invite Link Regenerated', 
    performedBy: 'John Doe', 
    venue: 'Main Street Location'
  }
];

export function AuditLogPage() {
  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Audit Log</h1>
          <p className="text-gray-600">Track access and security events for your venue</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search events, users, or actions..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-[#002D6A] focus:outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filter Events
            </button>
          </div>

          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Timestamp</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Event Type</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Performed By</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Target User</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Venue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                    {event.timestamp}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900 text-sm">{event.type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {event.performedBy}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {event.targetUser || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {event.venue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="p-4 border-t border-gray-200 bg-gray-50 text-center text-xs text-gray-500">
            Showing recent events. Export for full history.
          </div>
        </div>
      </div>
    </div>
  );
}
