import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNetwork } from '../context/NetworkContext';
import { Play, Upload, Download, RotateCcw } from 'lucide-react';
import { hardyCross } from '../utils/algorithm';

const NetworkInput: React.FC = () => {
  const { state, dispatch } = useNetwork();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'resistances' | 'discharge' | 'weight'>('resistances');

  const handleCalculate = async () => {
    dispatch({ type: 'SET_CALCULATING', payload: true });
    
    try {
      // Simulate calculation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const results = hardyCross(
        state.resistances,
        [...state.initialDischarge],
        state.weight,
        state.iterations
      );
      
      dispatch({ type: 'SET_RESULTS', payload: results });
      navigate('/results');
    } catch (error) {
      console.error('Calculation error:', error);
    } finally {
      dispatch({ type: 'SET_CALCULATING', payload: false });
    }
  };

  const handleReset = () => {
    dispatch({ type: 'SET_RESISTANCES', payload: [2, 3, 2, 3, 3, 3, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 3, 3, 3, 3, 2, 3, 2] });
    dispatch({ type: 'SET_INITIAL_DISCHARGE', payload: [5, 35, 40, 5, 23, 40, 10, 20, 2, 22, 30, 30, 10, 10, 10, 20, 20, 30, 30, 20, 40, 30, 30] });
    dispatch({ type: 'SET_ITERATIONS', payload: 100 });
  };

  const updateResistance = (index: number, value: number) => {
    const newResistances = [...state.resistances];
    newResistances[index] = value;
    dispatch({ type: 'SET_RESISTANCES', payload: newResistances });
  };

  const updateDischarge = (index: number, value: number) => {
    const newDischarge = [...state.initialDischarge];
    newDischarge[index] = value;
    dispatch({ type: 'SET_INITIAL_DISCHARGE', payload: newDischarge });
  };

  const updateWeight = (loopIndex: number, pipeIndex: number, value: number) => {
    const newWeight = state.weight.map(row => [...row]);
    newWeight[loopIndex][pipeIndex] = value;
    dispatch({ type: 'SET_WEIGHT', payload: newWeight });
  };

  const tabs = [
    { id: 'resistances', label: 'Pipe Resistances', count: state.resistances.length },
    { id: 'discharge', label: 'Initial Discharge', count: state.initialDischarge.length },
    { id: 'weight', label: 'Weight Matrix', count: `${state.weight.length}×${state.weight[0]?.length || 0}` },
  ];

  return (
    <div className="px-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Network Configuration</h1>
          <p className="text-blue-100 mt-1">Configure your pipe network parameters</p>
        </div>

        {/* Controls */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Iterations
                </label>
                <input
                  type="number"
                  value={state.iterations}
                  onChange={(e) => dispatch({ type: 'SET_ITERATIONS', payload: parseInt(e.target.value) || 100 })}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="1000"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleReset}
                className="inline-flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </button>
              <button
                onClick={handleCalculate}
                disabled={state.isCalculating}
                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {state.isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Analysis
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'resistances' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipe Resistances</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {state.resistances.map((resistance, index) => (
                  <div key={index} className="relative">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Pipe {index + 1}
                    </label>
                    <input
                      type="number"
                      value={resistance}
                      onChange={(e) => updateResistance(index, parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      step="0.1"
                      min="0"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'discharge' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Initial Discharge Values</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {state.initialDischarge.map((discharge, index) => (
                  <div key={index} className="relative">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Pipe {index + 1}
                    </label>
                    <input
                      type="number"
                      value={discharge}
                      onChange={(e) => updateDischarge(index, parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      step="0.1"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'weight' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Matrix</h3>
              <p className="text-sm text-gray-600 mb-4">
                Weight values: 1 (clockwise flow), -1 (counter-clockwise flow), 0 (pipe not in loop)
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r border-gray-300">
                        Loop
                      </th>
                      {Array.from({ length: state.weight[0]?.length || 0 }, (_, i) => (
                        <th key={i} className="px-2 py-2 text-xs font-medium text-gray-500 border-r border-gray-300">
                          P{i + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {state.weight.map((loop, loopIndex) => (
                      <tr key={loopIndex} className="border-b border-gray-200">
                        <td className="px-2 py-2 text-xs font-medium text-gray-700 bg-gray-50 border-r border-gray-300">
                          L{loopIndex + 1}
                        </td>
                        {loop.map((weight, pipeIndex) => (
                          <td key={pipeIndex} className="border-r border-gray-300">
                            <select
                              value={weight}
                              onChange={(e) => updateWeight(loopIndex, pipeIndex, parseInt(e.target.value))}
                              className="w-full px-1 py-1 text-xs border-none focus:ring-1 focus:ring-blue-500"
                            >
                              <option value={-1}>-1</option>
                              <option value={0}>0</option>
                              <option value={1}>1</option>
                            </select>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkInput;