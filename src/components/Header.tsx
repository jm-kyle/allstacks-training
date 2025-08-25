import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AS</span>
            </div>
            <Link 
              to="/" 
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              AllStacks Overview
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Component Library
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
