import React from 'react';
import { Link } from 'react-router-dom';
import { useNetwork } from '../context/NetworkContext';
import { ArrowLeft, Download, TrendingUp, Activity } from 'lucide-react';

const Results: React.FC = () => {
  const { state } = useNetwork();

  if (!state.results) {
    return (
      <div className="px-6">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Results Available</h2>
          <p className="text-gray-600 mb-6">
            Run the Hardy-Cross analysis to see results here.
          </p>
          <Link
            to="/input"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go to Network Input
          </Link>
        </div>
      </div>
    );
  }

  const exportResults = () => {
    const data = {
      input: {
        resistances: state.resistances,
        initialDischarge: state.initialDischarge,
        iterations: state.iterations,
      },
      results: state.results,
      timestamp: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `hardy-cross-results-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const maxDischarge = Math.max(...state.results.map(Math.abs));
  const totalFlow = state.results.reduce((sum, flow) => sum + Math.abs(flow), 0);
  const convergenceIndicator = state.results.every(flow => !isNaN(flow) && isFinite(flow));

  return (
    <div className="px-6">
      <div className="mb-6">
        <Link
          to="/input"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Input
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pipes</p>
              <p className="text-2xl font-bold text-gray-900">{state.results.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Max Discharge</p>
              <p className="text-2xl font-bold text-gray-900">{maxDischarge.toFixed(3)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Convergence</p>
              <p className={`text-2xl font-bold ${convergenceIndicator ? 'text-green-600' : 'text-red-600'}`}>
                {convergenceIndicator ? 'Success' : 'Failed'}
              </p>
            </div>
            <div className={`p-3 rounded-full ${convergenceIndicator ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`h-6 w-6 rounded-full ${convergenceIndicator ? 'bg-green-600' : 'bg-red-600'}`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Final Discharge Values</h2>
            <p className="text-blue-100 mt-1">Results after {state.iterations} iterations</p>
          </div>
          <button
            onClick={exportResults}
            className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pipe ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Initial Discharge
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Final Discharge
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Flow Direction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resistance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {state.results.map((discharge, index) => {
                const initialDischarge = state.initialDischarge[index];
                const change = discharge - initialDischarge;
                const changePercent = initialDischarge !== 0 ? (change / initialDischarge) * 100 : 0;
                
                return (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Pipe {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {initialDischarge.toFixed(3)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {discharge.toFixed(6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        change > 0 ? 'bg-green-100 text-green-800' : 
                        change < 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {change >= 0 ? '+' : ''}{change.toFixed(3)} ({changePercent.toFixed(1)}%)
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        discharge > 0 ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {discharge > 0 ? 'Forward' : 'Reverse'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {state.resistances[index]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analysis Summary */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Summary</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Network Statistics</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Total absolute flow: {totalFlow.toFixed(3)} units</li>
              <li>• Average discharge: {(totalFlow / state.results.length).toFixed(3)} units</li>
              <li>• Number of loops: {state.weight.length}</li>
              <li>• Convergence iterations: {state.iterations}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Flow Distribution</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Forward flow pipes: {state.results.filter(d => d > 0).length}</li>
              <li>• Reverse flow pipes: {state.results.filter(d => d < 0).length}</li>
              <li>• Zero flow pipes: {state.results.filter(d => Math.abs(d) < 0.001).length}</li>
              <li>• Status: {convergenceIndicator ? 'Converged successfully' : 'Failed to converge'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;