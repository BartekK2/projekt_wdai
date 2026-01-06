const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const HASLO_JWT = "haslo"; // tak, wiem że to powinno być ukryte
app.use(express.json());
app.use(cors());


const db = new Sequelize({ dialect: 'sqlite',  storage: './baza.sqlite', logging: false });

const Product = db.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    category: DataTypes.STRING
});

const User = db.define('User', {
    username: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'user' }
});



const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    
    jwt.verify(token, HASLO_JWT, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.user = decoded;
        next();
    });
};

app.get('/products', async (req, res) => res.json(await Product.findAll()));

app.post('/register', async (req, res) => {
    const user = await User.create(req.body);
    res.json({ message: "OK" });
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username, password: req.body.password } });
    if (!user) return res.status(401).send("Błąd");
    
    const token = jwt.sign({ id: user.id, role: user.role }, HASLO_JWT, { expiresIn: '1h' });
    res.json({ token, role: user.role, username: user.username });
});

app.delete('/admin/delete-product/:id', verifyToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send("Brak uprawnień");
    await Product.destroy({ where: { id: req.params.id } });
    res.send("Usunięto");
});

app.listen(5000, async () => {
    await db.sync();
    console.log("Serwer: http://localhost:5000");
});