/*
TODO:

trzeba dodać opinie - szybko pójdzie ale mi sie nie chce teraz
i koszyk jeszcze chyba że to już lokalnie w sumie
a i zamówienia
*/


const express = require('express');
const { Sequelize, DataTypes, Op } = require('sequelize');
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
    category: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    description: DataTypes.TEXT
});


const Cart = db.define('Cart', {
    quantity: { 
        type: DataTypes.INTEGER, 
        defaultValue: 1,
        allowNull: false
    }
});

const Reviews = db.define('Reviews', {
    stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    description: {
        type: DataTypes.TEXT
    }
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


app.get('/products', async (req, res) => {
    try {
        const { minPrice, maxPrice, categories, name } = req.query;

        const whereClause = {};

        if (minPrice || maxPrice) {
            whereClause.price = {};
            if (minPrice) {
                whereClause.price[Op.gte] = Number(minPrice);
            }
            if (maxPrice) {
                whereClause.price[Op.lte] = Number(maxPrice);
            }
        }
        if (categories) {
            whereClause.category = categories; // sequelize od razu przetłumaczy na where category in [...]
        }
        if (name) {
            whereClause.name = { [Op.like]: `%${name}%` };
        }

        const products = await Product.findAll({
            where: whereClause
        });

        res.json(products);

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

app.get('/reviews', async (req, res) => {
    try {
        const { productID } = req.query;

        const whereClause = {};

        if(!productID){
            res.status(500).json({ error: 'Błąd podczas pobierania opinii (Brak productid)' });
            return;
        }

        whereClause.ProductId = productID;

        const reviews = await Reviews.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']]
        });

        res.json(reviews);

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Błąd podczas pobierania opinii' });
    }
});

app.get('/cart', verifyToken, async (req, res) => {
    try {
        const userCart = await Cart.findAll({
            where: { 
                UserId: req.user.id
            },
            include: [{
                model: Product,
            }]
        });

        const cleanList = userCart.map(item => ({
            cartId: item.id,
            quantity: item.quantity,
            productId: item.Product.id,
            name: item.Product.name,
            price: item.Product.price,
            category: item.Product.category,
            totalPrice: item.quantity * item.Product.price
        }));

        res.json(cleanList);

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Nie udało się pobrać koszyka" });
    }
});


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

// --- USUWANIE PRODUKTU ---
app.delete('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        // Product.destroy to funkcja Sequelize do usuwania
        const result = await Product.destroy({
            where: { id: id }
        });

        if (result > 0) {
            res.json({ message: "Usunięto pomyślnie" });
        } else {
            res.status(404).json({ message: "Nie znaleziono takiego produktu" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// --- USUWANIE OPINII ---
app.delete('/reviews/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const result = await Reviews.destroy({
            where: { id: id }
        });

        if (result > 0) {
            res.json({ message: "Usunięto opinię" });
        } else {
            res.status(404).json({ message: "Nie znaleziono opinii" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Endpoint do DODAWANIA produktów (tego Ci brakuje!)
app.post('/products', async (req, res) => {
    try {
        // Tworzymy produkt z danych przesłanych przez admina
        const product = await Product.create(req.body);
        res.json(product);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

// Użytkownik ma wiele pozycji w koszyku
User.hasMany(Cart);
Cart.belongsTo(User);

// Produkt może być w wielu koszykach
Product.hasMany(Cart);
Cart.belongsTo(Product);

// Użytkownik pisze opinie dowolną ilość razy, i dowolnie dużo ma każdy produkt
Product.hasMany(Reviews);
User.hasMany(Reviews);
Reviews.belongsTo(Product);




app.listen(5000, async () => {
    // await db.sync();
    await db.sync({ alter: true });
    console.log("Serwer: http://localhost:5000");
});