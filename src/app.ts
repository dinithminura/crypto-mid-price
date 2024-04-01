import 'dotenv/config';
import express from 'express';
import router from './routes';
import { connectToKrakenWebSocket } from './connectors/krakenConnector';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Use the router for API routes
app.use('/api', router);

// Define home route
app.get('/', (req, res) => {
    res.send('Server is running!');
});


connectToKrakenWebSocket()
    .then(() => {
        console.log('Connected to Kraken WebSocket');
        // Start the server after WebSocket connection is established
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to Kraken WebSocket:', error);
        process.exit(1); // Exit the process if WebSocket connection fails
    });
