import React, { useState } from 'react';
import { Check, X, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Firms from '../components/Firms';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const handleBillingChange = (cycle) => {
    setBillingCycle(cycle);
  };

  const pricingData = {
    free: {
      title: 'FREE',
      subtitle: 'Organize across all apps by hand',
      price: { monthly: 0, yearly: 0 },
      features: [
        { text: 'Unlimited product updates', enabled: true },
        { text: 'Unlimited product updates', enabled: true },
        { text: 'Unlimited product updates', enabled: true },
        { text: '10GB Cloud storage', enabled: false },
        { text: 'Email and community support', enabled: false },
      ],
      buttonText: 'Try for free',
      popular: false,
      buttonColor: 'bg-blue-500',
      cardColor: 'bg-white',
    },
    standard: {
      title: 'STANDARD',
      subtitle: 'Organize across all apps by hand',
      price: { monthly: 9.99, yearly: 99.99 },
      features: [
        { text: 'Unlimited product updates', enabled: true },
        { text: 'Unlimited product updates', enabled: true },
        { text: 'Unlimited product updates', enabled: true },
        { text: '10GB Cloud storage', enabled: true },
        { text: 'Email and community support', enabled: true },
      ],
      buttonText: 'Try for free',
      popular: true,
      buttonColor: 'bg-blue-500',
      cardColor: 'bg-gray-900',
    },
    premium: {
      title: 'PREMIUM',
      subtitle: 'Organize across all apps by hand',
      price: { monthly: 19.99, yearly: 199.99 },
      features: [
        { text: 'Unlimited product updates', enabled: true },
        { text: 'Unlimited product updates', enabled: true },
        { text: 'Unlimited product updates', enabled: true },
        { text: '10GB Cloud storage', enabled: true },
        { text: 'Email and community support', enabled: true },
      ],
      buttonText: 'Try for free',
      popular: false,
      buttonColor: 'bg-blue-500',
      cardColor: 'bg-white',
    },
  };

  const faqs = [
    {
      question: 'How does the pricing work for this shop?',
      answer: 'Our pricing is based on a tiered system, with features suited to different needs. Free tier is always available with basic functionality.',
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
    },
    {
      question: 'Are there any hidden fees?',
      answer: 'No, we believe in transparent pricing. The price you see is exactly what you pay, with no hidden fees or charges.',
    },
    {
      question: 'Do you offer discounts for annual billing?',
      answer: 'Yes! You save approximately 15% when you choose annual billing compared to monthly payments.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards including Visa, Mastercard, American Express, and also support PayPal payments.',
    },
    {
      question: 'Is refund possible if I am not satisfied?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you are not satisfied with our service, contact our support team for a full refund.',
    },
  ];

  const PricingTier = ({ tier }) => {
    const tierData = pricingData[tier];
    
    return (
      <div className={`pricing-card flex flex-col border rounded-lg shadow-sm overflow-hidden ${tierData.popular ? tierData.cardColor + ' text-white' : tierData.cardColor + ' text-gray-800'}`}>
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">{tierData.title}</h3>
          <p className="text-sm mb-4">{tierData.subtitle}</p>
          <div className="price-container mb-6">
            <span className={`text-4xl font-bold ${tierData.popular ? 'text-blue-400' : 'text-blue-500'}`}>
              {tierData.price[billingCycle] === 0 ? (
                <>
                  0 <span className="text-sm text-gray-400">$</span>
                </>
              ) : (
                <>
                  {tierData.price[billingCycle]} <span className="text-sm">$</span>
                </>
              )}
            </span>
            {tierData.price[billingCycle] !== 0 && (
              <span className="text-sm ml-1 text-gray-400">{billingCycle === 'monthly' ? '/Per Month' : '/Per Year'}</span>
            )}
            {tierData.price[billingCycle] === 0 && (
              <span className="text-sm ml-1 text-gray-400">/Per Month</span>
            )}
          </div>
          
          <ul className="feature-list space-y-3 mb-8">
            {tierData.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                {feature.enabled ? (
                  <span className={`mr-2 inline-flex items-center justify-center w-5 h-5 rounded-full ${tierData.popular ? 'bg-blue-400' : 'bg-green-500'} text-white`}>
                    <Check size={14} />
                  </span>
                ) : (
                  <span className="mr-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-300 text-white">
                    <X size={14} />
                  </span>
                )}
                <span className="text-sm">{feature.text}</span>
              </li>
            ))}
          </ul>
          
          <button 
            className={`w-full py-2 px-4 rounded-md font-medium ${
              tierData.popular
                ? 'bg-blue-400 text-white hover:bg-blue-500'
                : tierData.buttonColor + ' text-white hover:bg-blue-600'
            }`}
          >
            {tierData.buttonText}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="pricing-page">
      {/* Header */}
      <div className="pricing-header text-center pt-8 md:pt-16 px-4">
        <p className="text-sm text-gray-500 uppercase font-medium mb-1">PRICING</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h1>
        
        <div className="breadcrumbs flex justify-center gap-2 text-sm">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800">Pricing</span>
        </div>
      </div>

      {/* Main pricing section */}
      <div className="pricing-content text-center py-8 md:py-12 px-4">
        <p className="text-gray-600 max-w-xl mx-auto mb-2">
          Problems trying to resolve the conflict between 
        </p>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          the two major realms of Classical physics: Newtonian mechanics
        </p>
        
        {/* Billing toggle */}
        <div className="billing-toggle flex justify-center items-center space-x-4 mt-8 mb-10">
          <button
            onClick={() => handleBillingChange('monthly')}
            className={`py-1 px-4 rounded-md ${billingCycle === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => handleBillingChange('yearly')}
            className={`py-1 px-4 rounded-md ${billingCycle === 'yearly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Yearly
          </button>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
            Save 25%
          </span>
        </div>

        {/* Pricing cards */}
        <div className="pricing-cards-container max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <PricingTier tier="free" />
          <PricingTier tier="standard" />
          <PricingTier tier="premium" />
        </div>
      </div>
      
      {/* Trusted by section - Using Firms component */}
      <div className="w-4/5 mx-auto">
        <Firms />
      </div>
      
      {/* FAQs */}
      <div className="faqs-section py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Pricing FAQs</h2>
          <p className="text-center text-gray-600 mb-12">
            Everything you need to know about our pricing and payment.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-500">Haven't got your answer? Contact our support</p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="cta-section py-12 md:py-20 bg-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Start your 14 days free trial</h2>
          <p className="text-gray-600 mb-8">
            Join over 4,000+ startups already growing with our services.
            Start your free trial today, no credit card required.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-md font-medium">
            Try it for free
          </button>
          
          <div className="flex justify-center space-x-4 mt-8">
            <a href="#" className="text-gray-500 hover:text-blue-500">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-500">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-500">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-500">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
  