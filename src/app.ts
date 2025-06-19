import express, { Express} from 'express';
import cors from 'cors'
import userRoutes from './routes/userRoutes';
import dzongkhagRoutes from './routes/dzongkhagRoutes';
import gewogRoutes from './routes/gewogRoutes';
import waterSourceRoutes from './routes/waterSourceRoutes';



// Initialize Express app
const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/dzongkhag', dzongkhagRoutes);
app.use('/api/v1/gewog', gewogRoutes)
app.use('/api/v1/watersources', waterSourceRoutes);

// Root route
app.get('/', (_req, res) => {
  res.send(
    `
    
    Status: Online
    Uptime: ${Math.floor(process.uptime())} seconds
        `);
    });

     export default app;