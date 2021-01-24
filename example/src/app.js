// Import the worker
import { SquareRootWorker } from './sqrt.worker';

// Create an instance of the worker
const sqrt = new SquareRootWorker();

// Define the computation event
const render = async({ target }) => {

  // Compute the results
  const result = await sqrt.calculate(target.value);
  
  // Update the result
  document.querySelector('#output').innerHTML = `${result}<br>(rounded)`;
};

// Set the value to a random value
document.querySelector('#input').value = Math.floor(Math.random() * 10000 + 1)

// Bind the event listener
document.querySelector('#input').addEventListener('input', render);

// Trigger a rendering
document.querySelector('#input').dispatchEvent(new Event('input'));