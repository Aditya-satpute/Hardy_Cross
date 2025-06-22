import React from 'react';
import { Book, Target, Zap, Users } from 'lucide-react';

const About: React.FC = () => {
  const sections = [
    {
      icon: Book,
      title: 'Hardy-Cross Method',
      content: `The Hardy-Cross method is an iterative technique used for solving pipe network flow problems in hydraulic engineering. 
      Developed by Hardy Cross in 1936, it's based on the principles of conservation of mass and energy in a pipe network.`,
    },
    {
      icon: Target,
      title: 'Algorithm Principle',
      content: `The method works by assuming initial flow rates in each pipe, then calculating flow corrections for each loop 
      until the system converges to a balanced state where Kirchhoff's laws are satisfied.`,
    },
    {
      icon: Zap,
      title: 'Convergence Criteria',
      content: `The algorithm iteratively adjusts flows until the algebraic sum of head losses around each loop approaches zero, 
      indicating that the network is in hydraulic equilibrium.`,
    },
    {
      icon: Users,
      title: 'Applications',
      content: `Used extensively in water distribution system design, HVAC systems, gas distribution networks, 
      and any application involving fluid flow through interconnected pipes.`,
    },
  ];

  return (
    <div className="px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Hardy-Cross Method
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding the mathematical foundation and practical applications 
            of pipe network flow analysis
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {section.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mathematical Foundation */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mathematical Foundation</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Conservation of Mass (Continuity)</h3>
              <p className="text-gray-600 mb-2">At each junction, the sum of inflows equals the sum of outflows:</p>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                ΣQ<sub>in</sub> = ΣQ<sub>out</sub>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Conservation of Energy (Loop Equation)</h3>
              <p className="text-gray-600 mb-2">The algebraic sum of head losses around any closed loop must be zero:</p>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                Σ(R × Q × |Q|) = 0
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Flow Correction Formula</h3>
              <p className="text-gray-600 mb-2">The correction factor for each iteration:</p>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                ΔQ = -Σ(R × Q × |Q|) / Σ(2 × R × |Q|)
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Details */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Implementation Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Algorithm Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="bg-blue-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Iterative convergence with configurable precision
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Support for complex multi-loop networks
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Automatic flow direction handling
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Real-time convergence monitoring
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">User Interface</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="bg-green-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Intuitive parameter input with validation
                </li>
                <li className="flex items-start">
                  <span className="bg-green-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Interactive weight matrix editor
                </li>
                <li className="flex items-start">
                  <span className="bg-green-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Comprehensive results visualization
                </li>
                <li className="flex items-start">
                  <span className="bg-green-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Export functionality for further analysis
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;