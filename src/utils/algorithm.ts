/**
 * Hardy-Cross method implementation for pipe network flow analysis
 * 
 * @param resistances - Array of pipe resistances
 * @param initialDischarge - Array of initial discharge values
 * @param weight - Weight matrix representing network topology
 * @param iterations - Maximum number of iterations
 * @returns Array of final discharge values
 */
export function hardyCross(
  resistances: number[],
  initialDischarge: number[],
  weight: number[][],
  iterations: number
): number[] {
  const numLoops = weight.length;
  const numPipes = initialDischarge.length;
  const discharge = [...initialDischarge]; // Create a copy to avoid mutation

  for (let iteration = 0; iteration < iterations; iteration++) {
    const errors: number[] = [];

    // Calculate flow correction for each loop
    for (let loopIndex = 0; loopIndex < numLoops; loopIndex++) {
      const loop = weight[loopIndex];
      let numeratorSum = 0;
      let denominatorSum = 0;

      for (let pipeIndex = 0; pipeIndex < numPipes; pipeIndex++) {
        const q = discharge[pipeIndex];
        const resistance = resistances[pipeIndex];
        const weightValue = loop[pipeIndex];

        // Calculate numerator: Σ(R × Q × |Q| × weight)
        numeratorSum += resistance * q * Math.abs(q) * weightValue;
        
        // Calculate denominator: Σ(2 × R × |Q| × |weight|)
        denominatorSum += 2 * resistance * Math.abs(q) * Math.abs(weightValue);
      }

      // Calculate flow correction for this loop
      const error = denominatorSum !== 0 ? numeratorSum / denominatorSum : 0;
      errors.push(error);
    }

    // Apply flow corrections to all pipes
    for (let loopIndex = 0; loopIndex < numLoops; loopIndex++) {
      const loop = weight[loopIndex];
      const error = errors[loopIndex];

      for (let pipeIndex = 0; pipeIndex < numPipes; pipeIndex++) {
        discharge[pipeIndex] -= error * loop[pipeIndex];
      }
    }

    // Check for convergence (optional - could be used for early termination)
    const maxError = Math.max(...errors.map(Math.abs));
    if (maxError < 1e-6) {
      console.log(`Converged after ${iteration + 1} iterations`);
      break;
    }
  }

  return discharge;
}

/**
 * Validate input parameters for Hardy-Cross analysis
 */
export function validateInputs(
  resistances: number[],
  initialDischarge: number[],
  weight: number[][],
  iterations: number
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check if arrays have consistent lengths
  if (resistances.length !== initialDischarge.length) {
    errors.push('Resistances and initial discharge arrays must have the same length');
  }

  // Check if weight matrix dimensions are consistent
  if (weight.length > 0 && weight[0].length !== resistances.length) {
    errors.push('Weight matrix columns must match the number of pipes');
  }

  // Check for valid values
  if (resistances.some(r => r <= 0)) {
    errors.push('All resistance values must be positive');
  }

  if (iterations <= 0) {
    errors.push('Number of iterations must be positive');
  }

  // Check weight matrix values
  for (let i = 0; i < weight.length; i++) {
    for (let j = 0; j < weight[i].length; j++) {
      const value = weight[i][j];
      if (![1, -1, 0].includes(value)) {
        errors.push(`Weight matrix value at [${i}][${j}] must be -1, 0, or 1`);
        break;
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}