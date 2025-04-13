import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShieldCheck, Stethoscope, MapPin, ArrowRight } from 'lucide-react';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import FAQ from './pages/FAQ';
import Scan from './pages/Scan';

// Create a Layout component for the header and footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white">
        <Link className="flex items-center justify-center" to="/">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              SkinScan
            </span>
          </div>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-teal-600 transition-colors" to="/about">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-teal-600 transition-colors" to="/how-it-works">
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:text-teal-600 transition-colors" to="/faq">
            FAQ
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6 bg-white">
        <p className="text-xs text-gray-500">© 2025 SkinScan. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-teal-600 transition-colors" to="/terms">
            Terms of Service
          </Link>
          <Link className="text-xs hover:text-teal-600 transition-colors" to="/privacy">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

// Create HomePage component for the landing page content
const HomePage = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-teal-50 via-cyan-50 to-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Early Detection, <span className="text-teal-600">Powered by AI</span>
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                SkinScan uses advanced AI to analyze your skin and provide instant risk assessments for melanoma and
                other skin conditions.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/scan">
                <button className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-lg transition-colors">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link to="/about">
                <button className="inline-flex items-center justify-center px-6 py-3 border border-teal-200 text-teal-700 hover:bg-teal-50 font-medium rounded-lg transition-colors">
                  Learn More
                </button>
              </Link>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <ShieldCheck className="mr-1 h-4 w-4 text-teal-600" />
                Privacy First
              </div>
              <div className="flex items-center">
                <Stethoscope className="mr-1 h-4 w-4 text-teal-600" />
                Expert Backed
              </div>
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4 text-teal-600" />
                Find Specialists
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[400px] aspect-square bg-gray-100 rounded-2xl shadow-2xl">
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl">
                <div className="text-2xl font-bold text-teal-600">98%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-xl">
                <div className="text-2xl font-bold text-teal-600">&lt; 30s</div>
                <div className="text-sm text-gray-600">Fast Results</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/scan" element={<Scan />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
