// NOTE: Remember to use '@oneisland/worker-module' for outside this example

// Import the worker module 
import { WorkerModule } from '../../index';

// Create a worker to solve square roots
export class SquareRootWorker extends WorkerModule {
  
  // Instantiate as a WorkerModule
  constructor() { super() }

  // Perform a calculation
  calculate(number) {
    return Math.sqrt(number).toFixed(2);
  }
}
