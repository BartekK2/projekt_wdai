// Skrypt do aktualizacji zdjecia kurtki zimowej

const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize({ dialect: 'sqlite', storage: './baza.sqlite', logging: false });

const Product = db.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    category: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    description: DataTypes.TEXT
});

async function updateJacketImage() {
    console.log("Aktualizacja zdjecia kurtki zimowej...");

    await db.sync();

    const jacket = await Product.findOne({
        where: { name: 'Kurtka Zimowa Puchowa' }
    });

    if (!jacket) {
        console.log("Nie znaleziono kurtki zimowej w bazie.");
        return;
    }

    console.log("Znaleziono: " + jacket.name + " (ID: " + jacket.id + ")");
    console.log("Stary URL: " + jacket.imageURL);


    jacket.imageURL = "/images/puffer_jacket.png";
    await jacket.save();

    console.log("Nowy URL: " + jacket.imageURL);
    console.log("Zdjecie zostalo zaktualizowane w bazie.");

    process.exit(0);
}

updateJacketImage();

