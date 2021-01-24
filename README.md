# @oneisland/worker-module

A simpler way of creating WebWorkers for any application

## Overview

Designed to make the process of creating applications using WebWorkers much easier when communicating between the main frame and the WebWorkers

It's time to say no more to `onmessage` and `postmessage` events and generate useful WebWorkers with ease

Simply [define your worker class](#defining-a-worker-with-workermodule) by extending `WorkerModule` and compile using the [webpack loader](#webpack-configuration)

You'll be able to [interact with your worker](#using-a-worker-from-within-an-app) as if it were any other class instantiation from within your application

## Installation

Install the package via npm

```bash
npm install @oneisland/worker-module
```

## Usage

### Defining a worker with WorkerModule

See [example/src/sqrt.worker.js](https://github.com/oneislandearth/worker-module/blob/main/example/src/sqrt.worker.js)

```js
// Import the worker module
import { WorkerModule } from '@oneisland/worker-module';

// Create a worker to solve square roots
export class SquareRootWorker extends WorkerModule {
  
  // Instantiate as a WorkerModule
  constructor() { super() }

  // Perform a calculation
  calculate(number) {
    return Math.sqrt(number).toFixed(2);
  }
}
```

### Using a worker from within an app

See [example/src/app.js](https://github.com/oneislandearth/worker-module/blob/main/example/src/app.js)

```js
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
```

### Webpack configuration

See [example/webpack.config.js](https://github.com/oneislandearth/worker-module/blob/main/example/webpack.config.js)

```js
// Webpack rules for building
module.exports = {
  entry: `${__dirname}/src/app.js`,
  output: {
    publicPath: `/`,
    path: `${__dirname}/dist/`,
    filename: `app.js`,
  },
  module: {
    rules: [{
      test: /(.*)(?:worker\.js)$/,
      loader: `@oneisland/worker-module/loader`,
      options: {
        publicPath: `/`,
        path: `${__dirname}/dist/`,
        filename: `[name].js`
      }
    }]
  },
  devServer: {
    contentBase: `${__dirname}/dist/`,
    compress: true,
    port: 8080
  }
};
```

### More details

See the [example directory](https://github.com/oneislandearth/worker-module/tree/main/example) for further information