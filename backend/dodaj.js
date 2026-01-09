/* KLIENT ADMINA - Wersja z usuwaniem */

const readline = require('readline-sync');

const API_URL = "http://localhost:5000";

async function main() {
    console.log("\n--- ZDALNY PANEL ADMINA v2 ---");
    console.log(`Podłączanie do: ${API_URL}...`);
    
    // Test połączenia
    try {
        await fetch(`${API_URL}/products`);
        console.log("✅ Serwer odpowiada!");
    } catch (e) {
        console.log("❌ BŁĄD: Serwer nie odpowiada. Uruchom 'node server.js'!");
        process.exit();
    }

    while (true) {
        // Dodałem opcję nr 4: USUŃ
        const opcje = ['Dodaj Produkt', 'Dodaj Uzytkownika', 'Dodaj Opinie', '>>> USUŃ ELEMENT <<<', 'WYJDŹ'];
        const index = readline.keyInSelect(opcje, 'Co chcesz zrobic?');

        if (index === 4 || index === -1) { 
            console.log("Zamykanie...");
            process.exit();
        }

        // --- 1. DODAWANIE PRODUKTU ---
        if (index === 0) {
            console.log("\n>>> Dodawanie Produktu");
            const name = readline.question('Nazwa produktu: ');
            const price = readline.questionFloat('Cena: ');
            const category = readline.question('Kategoria: ');
            const description = readline.question('Opis: ');
            const imageURL = readline.question('Zdjecie URL: ');

            await wyslijNaSerwer('/products', 'POST', { name, price, category, description, imageURL});
        } 
        
        // --- 2. DODAWANIE UŻYTKOWNIKA ---
        else if (index === 1) {
            console.log("\n>>> Dodawanie Uzytkownika");
            const username = readline.question('Login: ');
            const password = readline.question('Haslo: ', { hideEchoBack: true });
            await wyslijNaSerwer('/users', 'POST', { username, password });
        } 
        
        // --- 3. DODAWANIE OPINII ---
        else if (index === 2) {
            console.log("\n>>> Dodawanie Opinii");
            // Wybór produktu
            const products = await pobierzZSerwera('/products');
            if (!products || products.length === 0) { console.log("Brak produktów."); continue; }
            
            const pIdx = readline.keyInSelect(products.map(p => `${p.name} (ID: ${p.id})`), 'Wybierz produkt:');
            if (pIdx === -1) continue;
            
            // Wybór usera
            const users = await pobierzZSerwera('/users');
            let uId = 1; // domyślne, jeśli nie uda się pobrać userów
            if (users && users.length > 0) {
                const uIdx = readline.keyInSelect(users.map(u => `${u.username}`), 'Autor:');
                if (uIdx !== -1) uId = users[uIdx].id;
            }

            const stars = readline.questionInt('Gwiazdki (1-5): ');
            const description = readline.question('Opis: ');

            await wyslijNaSerwer('/reviews', 'POST', {
                stars, description, ProductId: products[pIdx].id, UserId: uId
            });
        }

        // --- 4. USUWANIE (NOWOŚĆ!) ---
        else if (index === 3) {
            const coUsunac = ['Usun Produkt', 'Usun Opinie', 'Cofnij'];
            const subIndex = readline.keyInSelect(coUsunac, 'Co chcesz usunac?');

            // A. USUWANIE PRODUKTU
            if (subIndex === 0) {
                const products = await pobierzZSerwera('/products');
                if (!products.length) { console.log("Brak produktów do usunięcia."); continue; }

                const pIdx = readline.keyInSelect(products.map(p => `${p.name} (ID: ${p.id})`), 'Wybierz produkt do usunięcia:');
                if (pIdx !== -1) {
                    const id = products[pIdx].id;
                    if (readline.keyInYN(`Czy na pewno usunac ${products[pIdx].name}?`)) {
                        await wyslijNaSerwer(`/products/${id}`, 'DELETE');
                    }
                }
            }
            
            // B. USUWANIE OPINII
            else if (subIndex === 1) {
                // Pobieramy opinie (zakładam, że masz endpoint GET /reviews, który zwraca wszystkie)
                // Jeśli nie masz, trzeba będzie pobrać dla konkretnego produktu. 
                // Tutaj wersja, która pobiera wszystkie opinie z serwera:
                const reviews = await pobierzZSerwera('/reviews'); 
                
                if (!reviews || !reviews.length) { console.log("Brak opinii do usunięcia."); continue; }

                // Wyświetlamy skrót opinii
                const rIdx = readline.keyInSelect(reviews.map(r => 
                    `[${r.stars}*] ${r.description.substring(0, 20)}... (ID: ${r.id})`
                ), 'Wybierz opinie do usunięcia:');

                if (rIdx !== -1) {
                    const id = reviews[rIdx].id;
                    await wyslijNaSerwer(`/reviews/${id}`, 'DELETE');
                }
            }
        }
    }
}

// --- FUNKCJE POMOCNICZE ---

async function wyslijNaSerwer(endpoint, method, body = null) {
    try {
        const options = {
            method: method,
            headers: { 'Content-Type': 'application/json' }
        };
        if (body) options.body = JSON.stringify(body);

        const response = await fetch(`${API_URL}${endpoint}`, options);

        if (response.ok) {
            console.log("✅ Operacja udana!");
        } else {
            console.log(`❌ Błąd serwera: ${response.status}`);
        }
    } catch (e) {
        console.log("❌ Błąd połączenia:", e.message);
    }
}

async function pobierzZSerwera(endpoint) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`);
        if (!response.ok) return [];
        return await response.json();
    } catch (e) {
        return [];
    }
}

main();