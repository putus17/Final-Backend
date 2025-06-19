"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const port = process.env.PORT || 3000;
// Connect to MongoDB
// Connect to MongoDB and then start the server
(0, db_1.default)()
    .then(() => {
    app_1.default.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
    .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});
