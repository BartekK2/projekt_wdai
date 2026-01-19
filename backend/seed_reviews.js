// Skrypt do dodania opinii dla produktow

const API_URL = "http://localhost:5001";

// Opinie dla produktow
const uniqueReviews = {
    "Nike Air Max 90": [
        { stars: 5, description: "Te Air Maxy to klasyka! Podeszwa Air daje niesamowitą amortyzację." },
        { stars: 4, description: "Stylowe i wygodne. Noszę je codziennie do pracy." },
        { stars: 5, description: "Kupiłem drugą parę bo pierwsza tak mi się spodobała!" },
    ],
    "Adidas Ultraboost": [
        { stars: 5, description: "Technologia Boost to rewolucja! Biega się w nich jak po chmurach." },
        { stars: 5, description: "Najlepsze buty do biegania jakie miałem. Warte swojej ceny." },
        { stars: 4, description: "Świetne do maratonów. Stopy nie bolą nawet po 20km." },
    ],
    "Converse Chuck Taylor": [
        { stars: 5, description: "Klasyczne Conversy - zawsze modne, zawsze stylowe!" },
        { stars: 4, description: "Świetnie wyglądają z jeansami. Trzeba je rozchodzić." },
        { stars: 4, description: "Kupiłem czarne i białe - obie pary super." },
    ],
    "Bluza Oversize Czarna": [
        { stars: 5, description: "Mega wygodna bluza! Idealna do relaksu w domu." },
        { stars: 4, description: "Materiał gruby i ciepły. Świetna na jesień." },
        { stars: 5, description: "Oversizeowy krój jest idealny. Noszę ją non stop." },
    ],
    "Kurtka Zimowa Puchowa": [
        { stars: 5, description: "Ciepła jak piec! Nawet w -15 stopniach nie marzłem." },
        { stars: 4, description: "Lekka a jednocześnie bardzo ciepła. Polecam na zimę." },
        { stars: 5, description: "Wodoodporna - sprawdziłem w deszczu ze śniegiem." },
    ],
    "T-shirt Biały Basic": [
        { stars: 5, description: "Podstawa każdej garderoby. Świetna jakość bawełny." },
        { stars: 4, description: "Dobrze leży, nie odkształca się po praniu." },
        { stars: 5, description: "Kupiłem 5 sztuk - idealne pod koszule." },
    ],
    "Jeansy Slim Fit": [
        { stars: 5, description: "Świetny krój slim fit! Podkreślają sylwetkę." },
        { stars: 4, description: "Wygodne nawet przy siedzeniu cały dzień w biurze." },
        { stars: 4, description: "Kolor ciemnoniebieski bardzo elegancki." },
    ],
    "Złoty Łańcuszek 585": [
        { stars: 5, description: "Piękny łańcuszek! Żona była zachwycona prezentem." },
        { stars: 5, description: "Próba 585 - prawdziwe złoto, świetna jakość." },
        { stars: 4, description: "Elegancki i dyskretny. Idealny do garnituru." },
    ],
    "Srebrne Kolczyki Koła": [
        { stars: 5, description: "Przepiękne kolczyki! Dostałam mnóstwo komplementów." },
        { stars: 5, description: "Srebro 925 - nie uczulam się. Polecam!" },
        { stars: 4, description: "Minimalistyczne i eleganckie. Idealne na co dzień." },
    ],
    "Bransoletka z Perłami": [
        { stars: 5, description: "Delikatna i kobieca. Perły są naturalne i pięknie lśnią." },
        { stars: 5, description: "Kupiłam jako prezent dla mamy - była zachwycona!" },
        { stars: 4, description: "Elegancka bransoletka, dobrze wykonana." },
    ],
    "Krem Nawilżający": [
        { stars: 5, description: "Moja skóra nigdy nie była tak nawilżona! Kwas hialuronowy działa cuda." },
        { stars: 4, description: "Świetnie się wchłania, nie pozostawia tłustej warstwy." },
        { stars: 5, description: "Używam rano i wieczorem - efekty widoczne po tygodniu." },
    ],
    "Serum Witamina C": [
        { stars: 5, description: "Przebarwienia zaczęły znikać po 2 tygodniach stosowania!" },
        { stars: 5, description: "Skóra jest rozświetlona i bardziej jednolita." },
        { stars: 4, description: "Dobre serum, ale trzeba stosować regularnie." },
    ],
    "Perfumy Unisex 100ml": [
        { stars: 5, description: "Zapach trzyma się cały dzień! Drzewno-świeży, idealny." },
        { stars: 4, description: "Elegancki zapach, dostałem wiele komplementów." },
        { stars: 5, description: "Perfumy unisex - używamy z żoną oboje." },
    ],
    "Pluszowy Miś 60cm": [
        { stars: 5, description: "Córka śpi z nim każdej nocy! Miękki i przytulny." },
        { stars: 5, description: "Świetna jakość wykonania. Bezpieczny dla dzieci." },
        { stars: 5, description: "Idealny prezent na urodziny. Dziecko było zachwycone!" },
    ],
    "Klocki Konstrukcyjne 500szt": [
        { stars: 5, description: "Syn buduje niesamowite konstrukcje! Rozwijają kreatywność." },
        { stars: 4, description: "Dużo elementów, dzieci bawią się godzinami." },
        { stars: 5, description: "Lepsze niż LEGO za tę cenę. Polecam!" },
    ],
    "Puzzle 1000 elementów": [
        { stars: 5, description: "Świetna zabawa dla całej rodziny! Widok górski przepiękny." },
        { stars: 4, description: "Dobra jakość puzzli, elementy dobrze pasują." },
        { stars: 5, description: "Układaliśmy przez tydzień - super wspomnienia." },
    ],
};

async function addUniqueReviews() {
    console.log("Dodawanie opinii...");

    // Utwórz użytkowników
    const users = ['Kasia_PL', 'Marek85', 'Anna_Shop'];
    const tokens = [];

    for (const username of users) {
        try {
            await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password: 'haslo123' })
            });

            const loginRes = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password: 'haslo123' })
            });

            if (loginRes.ok) {
                const data = await loginRes.json();
                tokens.push(data.token);
                console.log("Uzytkownik: " + username);
            }
        } catch (e) { }
    }

    if (tokens.length === 0) {
        console.log("Brak tokenow.");
        return;
    }

    // Pobierz produkty
    const productsRes = await fetch(`${API_URL}/products`);
    const products = await productsRes.json();

    if (!products || products.length === 0) {
        console.log("Brak produktow.");
        return;
    }

    console.log("Produktow: " + products.length);

    let added = 0;

    for (const product of products) {
        const reviews = uniqueReviews[product.name];

        if (!reviews) {
            console.log("Brak opinii dla: " + product.name);
            continue;
        }

        for (let i = 0; i < reviews.length; i++) {
            const review = reviews[i];
            const token = tokens[i % tokens.length];

            try {
                const res = await fetch(`${API_URL}/reviews`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        productId: product.id,
                        stars: review.stars,
                        description: review.description
                    })
                });

                if (res.ok) added++;
            } catch (e) { }
        }

        console.log(product.name + " - 3 opinie");
    }

    console.log("Dodano " + added + " opinii.");
}

addUniqueReviews();
