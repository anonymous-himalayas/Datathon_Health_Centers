import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How accurate is SkinScan's AI detection?",
      answer: "SkinScan achieves a 98% accuracy rate in detecting potential skin concerns. However, it's important to note that our service is meant to be a preliminary screening tool and not a replacement for professional medical diagnosis."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we take data privacy very seriously. All images are processed securely using enterprise-grade encryption, and we never store your images without explicit permission. Our service complies with all relevant data protection regulations."
    },
    {
      question: "How long does it take to get results?",
      answer: "Results are typically available in less than 30 seconds after uploading your image. This includes the AI analysis and generation of the detailed assessment report."
    },
    {
      question: "What types of skin conditions can SkinScan detect?",
      answer: "SkinScan is primarily trained to detect potential melanoma and other skin cancers. However, it can also identify various common skin conditions. Always consult a healthcare provider for a definitive diagnosis."
    },
    {
      question: "How should I take photos for the best results?",
      answer: "For best results, take photos in good lighting, keep the camera steady and close to the skin concern, ensure the area is in focus, and include a common object for size reference if possible. Multiple angles can be helpful for a more comprehensive analysis."
    },
    {
      question: "What happens if SkinScan detects a potential issue?",
      answer: "If our AI detects a potential concern, we'll provide you with a detailed risk assessment and recommend consulting a healthcare provider. We can help you locate specialists in your area for professional evaluation."
    },
    {
      question: "Can I use SkinScan for regular skin monitoring?",
      answer: "Yes, SkinScan can be used for regular monitoring of skin changes. We recommend periodic checks of any concerning areas, but remember to maintain regular check-ups with your healthcare provider as well."
    },
    {
      question: "Is SkinScan available worldwide?",
      answer: "Currently, SkinScan is available in select regions. We're continuously expanding our service area and working with local healthcare providers to ensure comprehensive coverage."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">Still Have Questions?</h2>
          <p className="text-center text-gray-600 mb-6">
            Our team is here to help. Contact us for any additional questions or concerns.
          </p>
          <div className="flex justify-center">
            <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 