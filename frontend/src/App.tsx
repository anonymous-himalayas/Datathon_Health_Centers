import { useState } from 'react'
import { MapPinIcon, UploadIcon } from '@heroicons/react/24/outline'
import './App.css'

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<string | null>(null)
  const [confidence, setConfidence] = useState<number | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePredict = async () => {
    // TODO: Implement prediction logic with your ML model
    // This is a placeholder
    setPrediction("Benign")
    setConfidence(95)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Skin Cancer Detection</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="space-y-6">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <label className="block text-lg font-medium text-gray-700">
                  Upload Skin Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Image Preview */}
              {selectedImage && (
                <div className="mt-4">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )}

              {/* Predict Button */}
              <button
                onClick={handlePredict}
                disabled={!selectedImage}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Analyze Image
              </button>

              {/* Results Section */}
              {prediction && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h2 className="text-lg font-medium text-gray-900">Results</h2>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Prediction: <span className="font-medium text-gray-900">{prediction}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Confidence: <span className="font-medium text-gray-900">{confidence}%</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Hospital Locator */}
              <div className="mt-6">
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                  <h2 className="text-lg font-medium text-gray-900">Find Nearby Hospitals</h2>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter your location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Search Hospitals
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
