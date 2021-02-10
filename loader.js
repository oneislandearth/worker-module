
// Define the loader
module.exports = (function() {

  // Define which stage the loader is processing
  let stage = 0;

  // Define the worker module name
  let name = 'WorkerClass';

  // Define the worker module methods
  let methods = [];

  // Parse the script and find the module name
  const parseModule = function(request) {

    // Reset the name and methods set
    name = 'WorkerClass';
    methods = [];

    // Read the file
    const content = require('fs').readFileSync(request, 'utf-8');

    // Parse the file with babel
    const { program } = require('@babel/parser').parse(content, { sourceType: 'module' });

    // Iterate through the program body
    for (const { declaration } of program.body) {

      // Skip to the next node if it is not a declaration
      if (!declaration) continue;

      // Check if the declaration is a class
      if (declaration.type == 'ClassDeclaration') {

        // Check if there is a superclass
        if (declaration.superClass && declaration.superClass.name == 'WorkerModule') {

          // Update the name of the module
          name = declaration.id.name;

          // Iterate through the module properties
          for (const { key, kind } of declaration.body.body) {

            // Add the method to the methods
            if (kind == 'method') methods.push(key.name);
          }
        }
      }
    }
  };

  // Describe the pitch function
  const handlePitching = function(request) {

    // Prevent cacheing
    this.cacheable(false);

    // Return if the pitch context has already been executed
    if (stage == 0) {

      // Parse the module file
      parseModule(request);

      // Define the public path
      const publicPath = (this.query && this.query.publicPath) ? this.query.publicPath : 'workers/';

      // Define the output path
      const path = (this.query && this.query.path) ? this.query.path.replace(this._compiler.outputPath, '') : 'workers/';

      // Define the output filename
      const filename = (this.query && this.query.filename) ? this.query.filename : '[name].js';

      // Modify the loaders
      this.loaders = [
        {
          path: this.loaders[0].path,
          request: this.loaders[0].request
        },
        {
          path: 'worker-loader',
          options: {
            worker: {
              type: 'Worker',
              options: { name }
            },
            publicPath,
            filename: path + filename,
            esModule: true
          },
          request: 'worker-loader'
        },
        {
          path: this.loaders[0].path,
          request: this.loaders[0].request
        }
      ];

      // Increment the stage
      stage = 1;
    }
  };

  // Define the loader processing function
  const handleProcessing = function(content) {

    // Modify the first stage if appropriate
    if (stage == 1) return processFirst(content);

    // Modify the second stage
    if (stage == 2) return processSecond(content);
  };

  // Process the worker in the first stage
  const processFirst = (content) => {

    // Continue to the next stage
    stage = 2;

    // Return the modified worker script
    return `
      ${content}

      WorkerModule.create(${name});
    `;
  };

  // Process the worker in the second round
  const processSecond = (content) => {

    // Reset the stage
    stage = 0;

    // Return the modified worker script
    return `export class ${name} {
      constructor(params) {

        // Create the worker
        this.worker = ${(/(?:return )(.*)/g).exec(content)[1]};

        // Create the inital context
        this.sendPayload({ method: 'createContext', params });

        // Create a list of resolvers
        const resolvers = [];

        // Iterate through each of the methods
        for (const method of ${JSON.stringify(methods)}) {

          // Add the property to the instance
          Object.defineProperty(this, method, {
            value: async(params) => {

              // Generate a hash
              const hash = (Math.random() * new Date()).valueOf().toString(24).substr(0, 8);

              // Send the payload
              this.sendPayload({ method, params, hash });

              // Create a promise resolver
              return new Promise(resolve => resolvers[hash] = resolve);
            }
          })
        }

        // Handle message payloads
        this.worker.onmessage = (e) => {

          // Parse the payload
          const payload = JSON.parse(e.data);

          // Extract the method and params from the payload
          const { method, params, hash } = payload;

          // Check if there is a resolver
          if (resolvers[hash]) {

            // Resolve the response
            resolvers[hash](params);

            // Delete the resolver
            delete resolvers[hash];
          }
        }
      }

      // Send a payload to the worker
      sendPayload({ method, params, hash }) {

        // Generate a hash if one doesn't exist
        if (!hash) hash = (Math.random() * new Date()).valueOf().toString(24).substr(0, 8);

        // Send the payload to the worker
        this.worker.postMessage(JSON.stringify({ method, params, hash }));
      }
    }`;
  };

  // Return the loader keys
  return {
    default: handleProcessing,
    pitch: handlePitching
  };
})();