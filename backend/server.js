

const express = require('express');
const { Sequelize, DataTypes, Op } = require('sequelize');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const ACCESS_TOKEN_SECRET = "haslo_access";
const REFRESH_TOKEN_SECRET = "haslo_refresh";
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';
app.use(express.json());
app.use(cors());


const db = new Sequelize({ dialect: 'sqlite', storage: './baza.sqlite', logging: false });

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

const Order = db.define('Order', {
    totalPrice: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'completed' }
});

const OrderItem = db.define('OrderItem', {
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    priceAtPurchase: { type: DataTypes.FLOAT, allowNull: false },
    productName: { type: DataTypes.STRING, allowNull: false }
});


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.user = decoded;
        next();
    });
};


app.get('/products', async (req, res) => {
    try {
        const { minPrice, maxPrice, categories, name, id = null } = req.query;
        if (id && id !== "null" && id !== "undefined") {
            const product = await Product.findByPk(id);
            return res.json(product);
        }

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
            whereClause.category = categories;
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

        if (!productID) {
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
    try {
        const existingUser = await User.findOne({ where: { username: req.body.username } });
        if (existingUser) {
            return res.status(409).json({ error: "Użytkownik już istnieje" });
        }

        const user = await User.create(req.body);
        res.json({ message: "OK" });
    } catch (e) {
        console.error("Błąd rejestracji:", e);
        res.status(500).json({ error: "Błąd serwera podczas rejestracji" });
    }
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username, password: req.body.password } });
    if (!user) return res.status(401).send("Błąd");

    const accessToken = jwt.sign({ id: user.id, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refreshToken = jwt.sign({ id: user.id, role: user.role }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });

    res.json({
        token: accessToken,
        refreshToken: refreshToken,
        role: user.role,
        username: user.username,
        id: user.id
    });
});

app.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ error: "Brak refresh tokena" });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Nieprawidłowy lub wygasły refresh token" });
        }

        const newAccessToken = jwt.sign(
            { id: decoded.id, role: decoded.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPIRY }
        );

        res.json({ token: newAccessToken });
    });
});

app.delete('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;

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

app.delete('/reviews/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;

        const review = await Reviews.findByPk(id);
        if (!review) {
            return res.status(404).json({ message: "Nie znaleziono opinii" });
        }

        if (req.user.role !== 'admin' && review.UserId !== req.user.id) {
            return res.status(403).json({ error: "Brak uprawnień do usunięcia tej opinii" });
        }

        await review.destroy();
        res.json({ message: "Usunięto opinię" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

app.get('/reviews/all', verifyToken, async (req, res) => {
    try {
        let reviews;
        if (req.user.role === 'admin') {
            reviews = await Reviews.findAll({
                order: [['createdAt', 'DESC']]
            });
        } else {
            reviews = await Reviews.findAll({
                where: { UserId: req.user.id },
                order: [['createdAt', 'DESC']]
            });
        }
        res.json(reviews);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Błąd pobierania opinii" });
    }
});

app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.json(product);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);

Product.hasMany(Reviews);
User.hasMany(Reviews);

app.post('/cart', verifyToken, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        let cartItem = await Cart.findOne({
            where: {
                UserId: req.user.id,
                ProductId: productId
            }
        });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({
                UserId: req.user.id,
                ProductId: productId,
                quantity: quantity
            });
        }
        res.json({ message: "Dodano do koszyka" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Błąd dodawania do koszyka" });
    }
});

app.delete('/cart/:id', verifyToken, async (req, res) => {
    try {
        const result = await Cart.destroy({
            where: {
                id: req.params.id,
                UserId: req.user.id
            }
        });
        res.json({ message: "Usunięto z koszyka" });
    } catch (e) {
        res.status(500).json({ error: "Błąd usuwania z koszyka" });
    }
});

app.patch('/cart/:id', verifyToken, async (req, res) => {
    try {
        const { quantity } = req.body;
        if (quantity < 1) return res.status(400).json({ error: "Ilość musi być >= 1" });

        const cartItem = await Cart.findOne({
            where: {
                id: req.params.id,
                UserId: req.user.id
            }
        });

        if (cartItem) {
            cartItem.quantity = quantity;
            await cartItem.save();
            res.json({ message: "Zaktualizowano ilość" });
        } else {
            res.status(404).json({ error: "Nie znaleziono elementu" });
        }
    } catch (e) {
        res.status(500).json({ error: "Błąd aktualizacji" });
    }
});

app.post('/reviews', verifyToken, async (req, res) => {
    try {
        const { productId, stars, description } = req.body;

        const existingReview = await Reviews.findOne({
            where: { UserId: req.user.id, ProductId: productId }
        });

        if (existingReview) {
            return res.status(400).json({ error: "Możesz dodać tylko jedną opinię do produktu" });
        }

        await Reviews.create({
            UserId: req.user.id,
            ProductId: productId,
            stars,
            description
        });
        res.json({ message: "Dodano opinię" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Błąd dodawania opinii" });
    }
});



Product.hasMany(Reviews);
User.hasMany(Reviews);
Reviews.belongsTo(Product);
Reviews.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);

app.post('/orders', verifyToken, async (req, res) => {
    try {
        const cartItems = await Cart.findAll({
            where: { UserId: req.user.id },
            include: [Product]
        });

        if (cartItems.length === 0) {
            return res.status(400).json({ error: "Koszyk jest pusty" });
        }

        const totalPrice = cartItems.reduce((sum, item) => {
            return sum + (item.quantity * item.Product.price);
        }, 0);

        const order = await Order.create({
            UserId: req.user.id,
            totalPrice: totalPrice,
            status: 'completed'
        });

        for (const item of cartItems) {
            await OrderItem.create({
                OrderId: order.id,
                ProductId: item.Product.id,
                quantity: item.quantity,
                priceAtPurchase: item.Product.price,
                productName: item.Product.name
            });
        }

        await Cart.destroy({ where: { UserId: req.user.id } });

        res.json({ message: "Zamówienie złożone!", orderId: order.id });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Błąd składania zamówienia" });
    }
});

app.get('/orders', verifyToken, async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { UserId: req.user.id },
            include: [{ model: OrderItem }],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Błąd pobierania historii" });
    }
});

app.get('/orders/:id', verifyToken, async (req, res) => {
    try {
        const order = await Order.findOne({
            where: { id: req.params.id, UserId: req.user.id },
            include: [{ model: OrderItem }]
        });
        if (!order) return res.status(404).json({ error: "Nie znaleziono" });
        res.json(order);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Błąd" });
    }
});


app.listen(5001, async () => {
    await db.sync({ alter: true });
    console.log("Serwer: http://localhost:5001");
});