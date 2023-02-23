const https = require('https');

// Retrieve the username or gist ID from the command line arguments
const  query = process.argv[2];

if (!query) {
  console.error('Please specify a username or a gist ID as a command line argument.');
  process.exit(1);
}

// Retrieve the specified data either with gist ID or username
const retrieveData = (query) => {
  return new Promise((resolve, reject) => {
    let options = {};

    // Check whether the query is a gist ID or a username
    if (/[a-f0-9]{32}/i.test(query)) { // found this regex online since gist ID is a 32 bit hexadecimal number
      // If the query is a gist ID, retrieve the specified gist
      options = {
        hostname: 'api.github.com',
        path: `/gists/${query}`,
        method: 'GET',
        headers: {
          'User-Agent': 'Node.js HTTP Client',
          'Accept': 'application/vnd.github.v3+json',
        },
      };
    } else {
      // If the query is a username, retrieve the public gists for the specified user
      options = {
        hostname: 'api.github.com',
        path: `/users/${query}/gists`,
        method: 'GET',
        headers: {
          'User-Agent': 'Node.js HTTP Client',
          'Accept': 'application/vnd.github.v3+json',
        },
      };
    }

    // Make the API request to retrieve the specified data
    const req = https.request(options, (res) => {
      let data = '';

      // Concatenate the response data
      res.on('data', (chunk) => {
        data += chunk;
      });

      // Resolve with the parsed JSON data
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (error) {
          reject(error);
        }
      });
    });

    // Handle errors
    req.on('error', (error) => {
      reject(error);
    });

    // Send the API request
    req.end();
  });
};

// Call the function to retrieve the specified data
retrieveData(query)
  .then(data => console.log(data))
  .catch(error => console.error(error));
