import React, { useState, useCallback } from 'react';
import { Upload, AlertCircle, Loader } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import * as fs from 'fs';
import { spawn } from 'child_process';

interface ScanResult {
  prediction: 'benign' | 'malignant';
  confidence: number;
  nearbyHospitals?: Array<{
    name: string;
    distance: string;
    address: string;
  }>;
}

const Scan = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const file = acceptedFiles[0];
    
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const analyzeSkin = async () => {
    if (!image) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: image.split(',')[1] // Remove data:image/jpeg;base64, prefix
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Skin Analysis</h1>
        
        <div className="max-w-3xl mx-auto">
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-500'}`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              {isDragActive ? (
                <p className="text-gray-600">Drop the image here</p>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">Drag and drop your skin image here, or click to select</p>
                  <p className="text-sm text-gray-500">Supported formats: JPEG, PNG (max 10MB)</p>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 rounded-lg flex items-center text-red-700">
                <AlertCircle className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}

            {image && (
              <div className="mt-6">
                <h3 className="font-semibold mb-4">Preview:</h3>
                <div className="relative">
                  <img
                    src={image}
                    alt="Preview"
                    className="max-h-[400px] rounded-lg mx-auto"
                  />
                  <button
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
                <button
                  onClick={analyzeSkin}
                  disabled={isAnalyzing}
                  className="w-full mt-4 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="animate-spin h-5 w-5 mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Image'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Results Section */}
          {result && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Analysis Results</h2>
              
              <div className="space-y-6">
                <div className={`p-6 rounded-lg ${
                  result.prediction === 'benign' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <h3 className="text-xl font-semibold mb-2">
                    {result.prediction === 'benign' ? 'Benign' : 'Potential Melanoma Detected'}
                  </h3>
                  <p className={`${
                    result.prediction === 'benign' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    Confidence: {result.confidence}%
                  </p>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Next Steps</h3>
                  <ul className="space-y-2 text-gray-600">
                    {result.prediction === 'benign' ? (
                      <>
                        <li>• Continue monitoring your skin for any changes</li>
                        <li>• Perform regular self-examinations</li>
                        <li>• Use sun protection and follow skin care best practices</li>
                      </>
                    ) : (
                      <>
                        <li>• Schedule an appointment with a dermatologist</li>
                        <li>• Don't panic - early detection is key</li>
                        <li>• Bring these results to your healthcare provider</li>
                      </>
                    )}
                  </ul>
                </div>

                {result.prediction === 'malignant' && result.nearbyHospitals && (
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Nearby Specialists</h3>
                    <div className="space-y-4">
                      {result.nearbyHospitals.map((hospital, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold">{hospital.name}</h4>
                          <p className="text-sm text-gray-600">{hospital.address}</p>
                          <p className="text-sm text-gray-500">{hospital.distance} away</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scan; 