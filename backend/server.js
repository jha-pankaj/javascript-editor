const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { VM } = require('vm2');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Create a new VM context with sandbox capabilities
const vmOptions = {
  timeout: 1000, // 1 second timeout
  sandbox: {
    console: {
      output: [], // Array to collect console outputs
      log(...args) {
        this.output.push(args.join(' '));
      }
    }
  }
};

app.post('/execute', (req, res) => {
  try {
    const { code } = req.body;

    // Reset console output for each execution
    vmOptions.sandbox.console.output = [];

    // Create a new VM instance with the provided code
    const vm = new VM(vmOptions);

    // Run the code within the VM
    const result = vm.run(code);
	
	console.log(code)
	

    // Send back the captured console outputs, formatted with line breaks
    res.json({ output: vm.sandbox.console.output.join('\n'), result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
