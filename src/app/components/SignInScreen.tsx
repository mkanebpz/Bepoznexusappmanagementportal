import { Apple, Mail, Chrome } from 'lucide-react';

export function SignInScreen({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#002D6A] rounded-xl mb-4">
              <span className="text-white text-2xl font-bold">B</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bepoz Nexus</h1>
            <p className="text-gray-600">Sign in to Bepoz Nexus</p>
          </div>

          {/* SSO Options */}
          <div className="space-y-3">
            <button
              onClick={onSignIn}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              <Mail className="w-5 h-5 text-gray-700" />
              <span className="font-medium text-gray-900">Continue with Microsoft</span>
            </button>

            <button
              onClick={onSignIn}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              <Chrome className="w-5 h-5 text-gray-700" />
              <span className="font-medium text-gray-900">Continue with Google</span>
            </button>

            <button
              onClick={onSignIn}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              <Apple className="w-5 h-5 text-gray-700" />
              <span className="font-medium text-gray-900">Continue with Apple</span>
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          Need help? Contact your venue administrator
        </p>
      </div>
    </div>
  );
}
