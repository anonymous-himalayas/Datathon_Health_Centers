import React from 'react';
import { ShieldCheck, Stethoscope, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-bold text-center mb-8">About SkinScan</h1>
        
        <div className="max-w-3xl mx-auto space-y-8">
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At SkinScan, we're committed to making early skin cancer detection accessible to everyone. 
              By combining cutting-edge AI technology with medical expertise, we provide a reliable first step 
              in skin health assessment.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">What We Do</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Early detection of potential skin concerns</li>
                  <li>• Instant AI-powered risk assessments</li>
                  <li>• Connection with qualified specialists</li>
                  <li>• Secure and private analysis</li>
                </ul>
              </div>
              
              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Our Impact</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• 98% accuracy rate</li>
                  <li>• Results in under 30 seconds</li>
                  <li>• Thousands of assessments performed</li>
                  <li>• Nationwide specialist network</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
            <p className="text-gray-600 mb-6">
              SkinScan utilizes state-of-the-art machine learning algorithms trained on hundreds of 
              thousands of medical images. Our AI model has been developed in collaboration with leading 
              dermatologists and oncologists to ensure the highest level of accuracy.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <ShieldCheck className="h-12 w-12 text-teal-600 mb-3" />
                <h3 className="font-semibold mb-2">Privacy First</h3>
                <p className="text-sm text-gray-600">Your data is encrypted and never stored without consent</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <Stethoscope className="h-12 w-12 text-teal-600 mb-3" />
                <h3 className="font-semibold mb-2">Medical Expertise</h3>
                <p className="text-sm text-gray-600">Developed with leading healthcare professionals</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <MapPin className="h-12 w-12 text-teal-600 mb-3" />
                <h3 className="font-semibold mb-2">Easy Access</h3>
                <p className="text-sm text-gray-600">Connect with specialists in your area</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About; 