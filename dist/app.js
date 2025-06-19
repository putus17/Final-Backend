"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dzongkhagRoutes_1 = __importDefault(require("./routes/dzongkhagRoutes"));
const gewogRoutes_1 = __importDefault(require("./routes/gewogRoutes"));
const waterSourceRoutes_1 = __importDefault(require("./routes/waterSourceRoutes"));
// Initialize Express app
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/dzongkhag', dzongkhagRoutes_1.default);
app.use('/api/v1/gewog', gewogRoutes_1.default);
app.use('/api/v1/watersources', waterSourceRoutes_1.default);
// Root route
app.get('/', (_req, res) => {
    res.send(`
    
    Status: Online
    Uptime: ${Math.floor(process.uptime())} seconds
        `);
});
exports.default = app;
