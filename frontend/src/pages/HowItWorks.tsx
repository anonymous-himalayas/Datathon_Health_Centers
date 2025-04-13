import React from 'react';
import { Upload, Search, AlertCircle, MapPin } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-bold text-center mb-8">How SkinScan Works</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Step 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex flex-col items-center text-center">
                <Upload className="h-12 w-12 text-teal-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Photo</h3>
                <p className="text-sm text-gray-600">
                  Take a clear photo of your skin concern and upload it securely to our platform
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex flex-col items-center text-center">
                <Search className="h-12 w-12 text-teal-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
                <p className="text-sm text-gray-600">
                  Our AI model analyzes your image using advanced machine learning algorithms
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex flex-col items-center text-center">
                <AlertCircle className="h-12 w-12 text-teal-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Get Results</h3>
                <p className="text-sm text-gray-600">
                  Receive instant risk assessment results with detailed explanations
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-lg shadow-lg p-6 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div className="flex flex-col items-center text-center">
                <MapPin className="h-12 w-12 text-teal-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Find Care</h3>
                <p className="text-sm text-gray-600">
                  Connect with nearby specialists for professional evaluation if needed
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Important Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Accuracy & Limitations</h3>
                <p className="text-gray-600">
                  While SkinScan achieves 98% accuracy in risk assessment, it's important to note that our service is not a 
                  replacement for professional medical diagnosis. We recommend consulting with a healthcare provider for any 
                  concerning skin changes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Privacy & Security</h3>
                <p className="text-gray-600">
                  Your privacy is our top priority. All images are processed securely and are never stored without your 
                  explicit permission. We use enterprise-grade encryption to protect your data.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Best Practices for Photos</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Ensure good lighting conditions</li>
                  <li>Keep the camera steady and close to the skin concern</li>
                  <li>Include a common object for size reference if possible</li>
                  <li>Take photos from multiple angles if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks; 