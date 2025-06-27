import { useRouter } from 'next/router';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 Visual */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-primary opacity-20 mb-4">
            404
          </h1>
          <div className="text-6xl mb-4">🤔</div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist. It might have been moved, 
            deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button 
            onClick={() => router.push('/')}
            className="bg-gray-200 text-text-dark px-6 py-3 rounded-lg hover:bg-gray-300 transition flex items-center justify-center gap-2 font-medium"
            aria-label="Go back to homepage"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          
          <button 
            onClick={() => router.push('/')}
            className="bg-primary text-text-light px-6 py-3 rounded-lg hover:bg-blue-900 transition flex items-center justify-center gap-2 font-medium"
            aria-label="Navigate to homepage"
          >
            <Home size={18} />
            Home Page
          </button>
        </div>

        {/* Help Section */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-text-dark mb-4">
            What can you do?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Search size={16} className="text-primary" />
                <span className="font-medium">Search Products</span>
              </div>
              <p className="text-gray-600">
                Use the search bar to find specific products
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Home size={16} className="text-primary" />
                <span className="font-medium">Browse Categories</span>
              </div>
              <p className="text-gray-600">
                Explore our product categories on the homepage
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-sm text-gray-500">
          If you believe this is an error, please contact our support team.
        </div>
      </div>
    </div>
  );
} 