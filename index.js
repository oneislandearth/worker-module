// Define the worker module abstraction
export class WorkerModule {

  constructor() {}

  // Send payload
  sendPayload({ method, params, hash }) {

    // Generate a hash if there isn't one
    if (!hash) hash = (Math.random() * new Date()).valueOf().toString(24).substr(0, 8);

    // Post a message
    postMessage(JSON.stringify({ method, params, hash }));
  }

  // Create the instance
  static create(context) {

    // Create a new worker module
    const worker = new WorkerModule();

    // Handle the message events
    onmessage = (e) => {
      
      // Parse the payload
      const payload = JSON.parse(e.data);

      // Extract the method, params and hash from the payload
      const { method, params, hash } = payload;

      // Handle the init method
      if (!worker.context && method == 'createContext') {
        
        // Bind an instance for context
        worker.context = new context(params);
      }

      // Handle all other methods
      if (worker.context && method != 'createContext') {
        
        // Call the method asyncronous
        Promise.resolve(worker.context[method](params)).then(payload => {

          // Send back the response payload
          worker.context.sendPayload({ method, params: payload, hash });
        });
      }
    };
  }
}