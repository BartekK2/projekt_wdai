// Skrypt do dodania przykladowych produktow do bazy danych

const API_URL = "http://localhost:5001";

const sampleProducts = [
    // Buty
    { name: "Nike Air Max 90", price: 549.99, category: "Buty", description: "Klasyczne sneakersy Nike z kultową podeszwą Air Max. Idealne na co dzień.", imageURL: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
    { name: "Adidas Ultraboost", price: 699.99, category: "Buty", description: "Najwygodniejsze buty do biegania z technologią Boost.", imageURL: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400" },
    { name: "Converse Chuck Taylor", price: 299.99, category: "Buty", description: "Ponadczasowe trampki w stylu vintage.", imageURL: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400" },

    // Odziez
    { name: "Bluza Oversize Czarna", price: 179.99, category: "Odzież", description: "Wygodna bawełniana bluza w stylu oversize. Idealna na jesień.", imageURL: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
    { name: "Kurtka Zimowa Puchowa", price: 599.99, category: "Odzież", description: "Ciepła kurtka puchowa na najzimniejsze dni. Wodoodporna.", imageURL: "/images/puffer_jacket.png" },
    { name: "T-shirt Biały Basic", price: 59.99, category: "Odzież", description: "Klasyczny biały t-shirt z 100% bawełny organicznej.", imageURL: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
    { name: "Jeansy Slim Fit", price: 249.99, category: "Odzież", description: "Stylowe jeansy o dopasowanym kroju w kolorze ciemnoniebieskim.", imageURL: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400" },

    // Bizuteria
    { name: "Złoty Łańcuszek 585", price: 1299.99, category: "Biżuteria", description: "Elegancki złoty łańcuszek próby 585. Długość 50cm.", imageURL: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
    { name: "Srebrne Kolczyki Koła", price: 149.99, category: "Biżuteria", description: "Minimalistyczne kolczyki koła ze srebra 925.", imageURL: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" },
    { name: "Bransoletka z Perłami", price: 199.99, category: "Biżuteria", description: "Delikatna bransoletka z naturalnymi perłami słodkowodnymi.", imageURL: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400" },

    // Kosmetyki
    { name: "Krem Nawilżający", price: 89.99, category: "Kosmetyki", description: "Intensywnie nawilżający krem do twarzy z kwasem hialuronowym.", imageURL: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400" },
    { name: "Serum Witamina C", price: 129.99, category: "Kosmetyki", description: "Rozświetlające serum z witaminą C. Redukuje przebarwienia.", imageURL: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400" },
    { name: "Perfumy Unisex 100ml", price: 299.99, category: "Kosmetyki", description: "Eleganckie perfumy o świeżym, drzewnym zapachu.", imageURL: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400" },

    // Dla dzieci
    { name: "Pluszowy Miś 60cm", price: 79.99, category: "Dla dzieci", description: "Duży, miękki pluszowy miś. Idealny prezent dla malucha.", imageURL: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=400" },
    { name: "Klocki Konstrukcyjne 500szt", price: 149.99, category: "Dla dzieci", description: "Zestaw klocków konstrukcyjnych rozwijających kreatywność.", imageURL: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400" },
    { name: "Puzzle 1000 elementów", price: 49.99, category: "Dla dzieci", description: "Puzzle z pięknym widokiem górskim. Dla całej rodziny.", imageURL: "https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=400" },
];

async function addProducts() {
    console.log("Dodawanie produktow do bazy danych...");

    for (const product of sampleProducts) {
        try {
            const response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });

            if (response.ok) {
                console.log("Dodano: " + product.name);
            } else {
                console.log("Blad: " + product.name + " - Status: " + response.status);
            }
        } catch (e) {
            console.log("Blad polaczenia dla: " + product.name);
        }
    }

    console.log("Gotowe! Produkty zostaly dodane.");
}

addProducts();
