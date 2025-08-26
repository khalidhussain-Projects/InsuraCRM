import React, { useState } from 'react';
import { Shield, Car, Home, Heart, Briefcase, Star, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';
import LeadCaptureForm from '../components/LeadCaptureForm';

const LandingPage = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const products = [
    {
      id: 'auto',
      name: 'Auto Insurance',
      icon: Car,
      description: 'Comprehensive coverage for your vehicle with competitive rates and excellent service.',
      features: ['Collision Coverage', '24/7 Roadside Assistance', 'Rental Car Coverage', 'Multi-Car Discounts'],
      startingPrice: '$89/month'
    },
    {
      id: 'home',
      name: 'Home Insurance',
      icon: Home,
      description: 'Protect your home and belongings with our comprehensive homeowners insurance.',
      features: ['Property Coverage', 'Personal Liability', 'Additional Living Expenses', 'Natural Disaster Protection'],
      startingPrice: '$125/month'
    },
    {
      id: 'life',
      name: 'Life Insurance',
      icon: Heart,
      description: 'Secure your family\'s financial future with our flexible life insurance policies.',
      features: ['Term & Whole Life Options', 'Flexible Premiums', 'Living Benefits', 'No Medical Exam Options'],
      startingPrice: '$45/month'
    },
    {
      id: 'business',
      name: 'Business Insurance',
      icon: Briefcase,
      description: 'Comprehensive business protection tailored to your industry and needs.',
      features: ['General Liability', 'Property Insurance', 'Workers Compensation', 'Cyber Liability'],
      startingPrice: '$200/month'
    }
  ];

  const handleGetQuote = (productId: string) => {
    setSelectedProduct(productId);
    setShowLeadForm(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Protect What Matters Most with <span className="text-blue-300">Trusted Insurance</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Get comprehensive coverage at competitive rates. Our expert agents are ready to help you find the perfect policy for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleGetQuote('')}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Get Free Quote
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold py-4 px-8 rounded-lg transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <Shield className="h-12 w-12 text-blue-300 mx-auto mb-3" />
                    <h3 className="font-semibold text-lg">Trusted Protection</h3>
                    <p className="text-blue-200 text-sm">50+ Years Experience</p>
                  </div>
                  <div className="text-center">
                    <Star className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-lg">5-Star Service</h3>
                    <p className="text-blue-200 text-sm">98% Customer Satisfaction</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-lg">Fast Claims</h3>
                    <p className="text-blue-200 text-sm">24/7 Support</p>
                  </div>
                  <div className="text-center">
                    <Phone className="h-12 w-12 text-blue-300 mx-auto mb-3" />
                    <h3 className="font-semibold text-lg">Expert Agents</h3>
                    <p className="text-blue-200 text-sm">Personalized Service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Insurance Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive coverage options designed to protect you, your family, and your business
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => {
              const IconComponent = product.icon;
              return (
                <div key={product.id} className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="p-8">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="border-t pt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-500">Starting from</span>
                        <span className="text-2xl font-bold text-blue-600">{product.startingPrice}</span>
                      </div>
                      <button
                        onClick={() => handleGetQuote(product.id)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                      >
                        Get Quote
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-lg text-gray-300 mb-8">
                Contact our expert insurance agents today for a personalized quote and consultation.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-blue-400 mr-4" />
                  <span className="text-lg">1-800-INSURE-NOW</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-blue-400 mr-4" />
                  <span className="text-lg">info@insuraleadpro.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-blue-400 mr-4" />
                  <span className="text-lg">123 Insurance Ave, Suite 100</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6">Quick Contact Form</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="How can we help you?"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Modal */}
      {showLeadForm && (
        <LeadCaptureForm
          selectedProduct={selectedProduct}
          onClose={() => setShowLeadForm(false)}
        />
      )}
    </div>
  );
};

export default LandingPage;