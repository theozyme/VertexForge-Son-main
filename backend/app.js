import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import db from './models/database.js'; // database.js dosyanızın yolunu kontrol edin
import BireyselRoute from './routes/bireyselRoute.js';
import KurumsalRoute from './routes/kurumsalRoute.js';
import AuthRoute from './routes/authRoute.js';
import listRoute from './routes/listRoute.js';
import taskRoute from './routes/taskRoute.js';
import { login, register, registerkurumsal, verifyToken } from './controllers/authController.js'; // Relative path used here

dotenv.config();

const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: '*',
}));

app.use(express.json());

app.get('/', (_, res) => { res.json({ message: "welcome vertexforge" }) });
app.use('/Bireysel', BireyselRoute);
app.use('/Kurumsal', KurumsalRoute);
app.use('/auth', AuthRoute);
app.use('/list', listRoute);
app.use('/task', taskRoute);

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/registerkurumsal', registerkurumsal);

router.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'You have access to this route', user: req.user });
});

const server = http.createServer(app);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is live on port ${port}`);
});

export default router;
