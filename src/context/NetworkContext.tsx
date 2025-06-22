import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface NetworkState {
  resistances: number[];
  initialDischarge: number[];
  weight: number[][];
  iterations: number;
  results: number[] | null;
  isCalculating: boolean;
}

interface NetworkAction {
  type: 'SET_RESISTANCES' | 'SET_INITIAL_DISCHARGE' | 'SET_WEIGHT' | 'SET_ITERATIONS' | 'SET_RESULTS' | 'SET_CALCULATING';
  payload: any;
}

const initialState: NetworkState = {
  resistances: [2, 3, 2, 3, 3, 3, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 3, 3, 3, 3, 2, 3, 2],
  initialDischarge: [5, 35, 40, 5, 23, 40, 10, 20, 2, 22, 30, 30, 10, 10, 10, 20, 20, 30, 30, 20, 40, 30, 30],
  weight: [
    [1, -1, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 1, -1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, -1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, -1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 1, -1]
  ],
  iterations: 100,
  results: null,
  isCalculating: false,
};

const networkReducer = (state: NetworkState, action: NetworkAction): NetworkState => {
  switch (action.type) {
    case 'SET_RESISTANCES':
      return { ...state, resistances: action.payload };
    case 'SET_INITIAL_DISCHARGE':
      return { ...state, initialDischarge: action.payload };
    case 'SET_WEIGHT':
      return { ...state, weight: action.payload };
    case 'SET_ITERATIONS':
      return { ...state, iterations: action.payload };
    case 'SET_RESULTS':
      return { ...state, results: action.payload };
    case 'SET_CALCULATING':
      return { ...state, isCalculating: action.payload };
    default:
      return state;
  }
};

const NetworkContext = createContext<{
  state: NetworkState;
  dispatch: React.Dispatch<NetworkAction>;
} | null>(null);

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(networkReducer, initialState);

  return (
    <NetworkContext.Provider value={{ state, dispatch }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};