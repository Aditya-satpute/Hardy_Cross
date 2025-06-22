import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Network, Calculator, BarChart3, CheckCircle } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Network,
      title: 'Network Modeling',
      description: 'Define complex pipe networks with multiple loops and varying resistances',
    },
    {
      icon: Calculator,
      title: 'Hardy-Cross Algorithm',
      description: 'Implemented the industry-standard iterative method for flow analysis',
    },
    {
      icon: BarChart3,
      title: 'Results Visualization',
      description: 'Clear presentation of discharge values and convergence analysis',
    },
  ];

  const steps = [
    'Input pipe resistances and initial discharge values',
    'Define network topology using weight matrix',
    'Set iteration parameters for convergence',
    'Run analysis and view detailed results',
  ];

  return (
    <div className="px-6">
      {/* Hero Section */}
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
          <Network className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Hardy-Cross Network Analyzer
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Built by Aditya Satpute | Mechanical Engineering<br></br>
          Professional pipe network flow analysis using the Hardy-Cross method. 
          Solve complex distribution systems with precision and efficiency.
        </p>
        <Link
          to="/input"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Start Analysis
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Key Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-white rounded-2xl shadow-sm">
        <div className="px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start mb-6 last:mb-0">
                <div className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full mr-4 mt-1">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 text-lg">{step}</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500 ml-4 mt-1" />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/about"
              className="inline-flex items-center px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
            >
              Learn more about Hardy-Cross Method
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;