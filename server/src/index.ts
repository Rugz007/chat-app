import './pre-start'; // Must be the first import
const server = require('./Server').server;
import logger from './shared/Logger';


// Start the server
const port = Number(process.env.PORT || 3000);
server.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
