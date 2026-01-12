import { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  UserPlus, 
  Link as LinkIcon, 
  Mail, 
  Shield, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Edit2
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'revoked' | 'pending';
  operatorId?: string;
  apps: string[];
  lastSeen: string;
}

const mockUsers: User[] = [
  { 
    id: '1', 
    name: 'Sarah Jenkins', 
    email: 'sarah.j@venue.com', 
    status: 'active', 
    operatorId: 'OP-102',
    apps: ['Backoffice', 'Toolbox'],
    lastSeen: '2 mins ago'
  },
  { 
    id: '2', 
    name: 'Mike Ross', 
    email: 'mike.r@venue.com', 
    status: 'pending', 
    apps: [],
    lastSeen: '-'
  },
  { 
    id: '3', 
    name: 'David Miller', 
    email: 'david.m@venue.com', 
    status: 'revoked', 
    operatorId: 'OP-055',
    apps: ['Backoffice'],
    lastSeen: '2 days ago'
  }
];

export function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteLink, setInviteLink] = useState('https://nexus.bepoz.com/join/v/7f8a9d0');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Active</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">Pending</span>;
      case 'revoked':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Revoked</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Users & Access</h1>
            <p className="text-gray-600">Manage staff access and permissions</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#002D6A] text-white rounded-lg font-medium hover:bg-[#003d8a] transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>

        {/* Onboarding Cards (Two Methods) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Invite by Email */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Mail className="w-6 h-6 text-[#002D6A]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">Invite by Email</h3>
                <p className="text-sm text-gray-600 mb-4">Send an invitation directly to a staff member's email address.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="colleague@venue.com" 
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-[#002D6A] focus:outline-none"
                  />
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Share Link */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <LinkIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">Share Invite Link</h3>
                <p className="text-sm text-gray-600 mb-4">Anyone with this link can request access to this venue.</p>
                <div className="flex gap-2">
                  <div className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 truncate">
                    {inviteLink}
                  </div>
                  <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Copy
                  </button>
                </div>
                <button className="mt-2 text-xs text-red-600 hover:underline">
                  Regenerate link (invalidate old)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search users..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-[#002D6A] focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Filter by:</span>
              <select className="text-sm border-gray-200 rounded-lg focus:ring-0">
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
              </select>
            </div>
          </div>

          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Operator ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Apps Access</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Last Seen</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4">
                    {user.operatorId ? (
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                        {user.operatorId}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400 italic">Unbound</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.apps.length > 0 ? (
                        user.apps.map((app, i) => (
                          <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                            {app}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.lastSeen}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-[#002D6A] hover:bg-blue-50 rounded-lg transition-colors" title="Edit Access">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Revoke Access">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
