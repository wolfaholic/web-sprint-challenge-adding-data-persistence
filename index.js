// start your server here
// Imports
const server = require('./api/server');

const PORT = 9000;

// START YOUR SERVER HERE

server.listen(PORT, () => {
    console.log(`This server is running on port ${PORT}`)
})