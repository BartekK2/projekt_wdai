/*jak coś to to jest tylko dla nas i wzięte z ai trzeba by to było później usunąć z gita*/
/* po prostu opcja dodawania danych na szybko xd*/

const { Sequelize, DataTypes } = require('sequelize');
const readline = require('readline-sync');

const db = new Sequelize({ dialect: 'sqlite', storage: './baza.sqlite', logging: false });

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

async function main() {
    await db.sync();
    console.log("\n--- SYSTEM DODAWANIA DANYCH ---");
    
    const opcje = ['Dodaj Produkt', 'Dodaj Uzytkownika'];
    const index = readline.keyInSelect(opcje, 'Co chcesz zrobic?');

    if (index === 0) {
        console.log("\n>>> Dodawanie Produktu");
        const name = readline.question('Nazwa produktu: ');
        const price = readline.questionFloat('Cena: ');
        const category = readline.question('Kategoria: ');

        try {
            await Product.create({ name, price, category });
            console.log("✅ Produkt zostal dodany do bazy!");
        } catch (e) {
            console.log("❌ Blad podczas dodawania produktu.");
        }

    } else if (index === 1) {
        console.log("\n>>> Dodawanie Uzytkownika");
        const username = readline.question('Login: ');
        const password = readline.question('Haslo: ', { hideEchoBack: true });
        const role = readline.question('Rola (admin/user) [domyslnie user]: ') || 'user';

        try {
            await User.create({ username, password, role });
            console.log(`✅ Uzytkownik ${username} dodany jako ${role}!`);
        } catch (e) {
            console.log("❌ Blad: Uzytkownik o takim loginie moze juz istniec.");
        }
    }

    console.log("\nZamykanie...");
    await db.close();
    process.exit();
}

main();