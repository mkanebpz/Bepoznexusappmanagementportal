import { useState } from 'react';
import { Check, X, Clock, UserCheck, Search } from 'lucide-react';

interface Request {
  id: string;
  email: string;
  requestedAt: string;
  notes?: string;
}

const mockRequests: Request[] = [
  { id: '1', email: 'new.chef@venue.com', requestedAt: '10 mins ago', notes: 'Please add me to Kitchen Display' },
  { id: '2', email: 'bar.manager@venue.com', requestedAt: '1 hour ago' },
];

export function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [operatorSearch, setOperatorSearch] = useState('');

  const handleApprove = (req: Request) => {
    setSelectedRequest(req);
    // Open modal
  };

  const handleConfirmApprove = () => {
    // Logic to move to Users list would go here
    setRequests(requests.filter(r => r.id !== selectedRequest?.id));
    setSelectedRequest(null);
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Requests</h1>
          <p className="text-gray-600">Review and approve access requests from invite links</p>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-600">There are no pending access requests.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-gray-900">{req.email}</h3>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {req.requestedAt}
                    </span>
                  </div>
                  {req.notes && (
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded mt-2 border border-gray-100 italic">
                      "{req.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => setRequests(requests.filter(r => r.id !== req.id))}
                    className="flex-1 md:flex-none px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                  <button 
                    onClick={() => handleApprove(req)}
                    className="flex-1 md:flex-none px-4 py-2 bg-[#002D6A] text-white rounded-lg font-medium hover:bg-[#003d8a] transition-colors flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Approval Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Approve Access</h3>
                <p className="text-sm text-gray-600 mt-1">For {selectedRequest.email}</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bind to Operator <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search operator name or ID..."
                      value={operatorSearch}
                      onChange={(e) => setOperatorSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#002D6A] focus:outline-none"
                    />
                  </div>
                  <p className="text-xs text-amber-600 mt-2 flex items-start gap-1">
                    <span className="font-bold">Warning:</span> Bind the correct operator to avoid mismatched access.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Default Access</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked readOnly className="rounded text-[#002D6A]" />
                      <span className="text-sm text-gray-700">Web Backoffice</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked readOnly className="rounded text-[#002D6A]" />
                      <span className="text-sm text-gray-700">Knowledge Base</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3 justify-end">
                <button 
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmApprove}
                  className="px-4 py-2 bg-[#002D6A] text-white font-medium rounded-lg hover:bg-[#003d8a] transition-colors shadow-sm"
                >
                  Confirm & Bind
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
