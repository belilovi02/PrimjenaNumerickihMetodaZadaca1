import { sekantnaMetoda } from './sekantaMetoda.js';

document.getElementById('rjesiBtn').addEventListener('click', function () {
    // Preuzimanje unesenih parametara
    const r = parseFloat(document.getElementById('r').value);
    const epsilon = parseFloat(document.getElementById('epsilon').value);

    // Funkcija koju rješavamo: f(α) = (r * sin(α)) / α - 3r / 4
    function f(α) {
        if (α === 0) return NaN; // Ako je α = 0, vraćamo NaN da izbjegnemo dijeljenje s nulom
        return (r * Math.sin(α)) / α - (3 * r / 4);
    }

    // Definiramo početne vrijednosti za metodu sekante
    let x0 = 0.1; // Početna vrijednost α (npr. 0.1, izbjegavamo 0 zbog dijeljenja)
    let x1 = 1.0; // Druga početna vrijednost α

    // Pokrećemo sekantnu metodu
    const rezultat = sekantnaMetoda(f, x0, x1, epsilon);

    // Prikazivanje rezultata
    document.getElementById('rezultat').innerHTML = `Rješenje: α = ${rezultat.rjesenje}`;

    // Prikazivanje iteracija u tabeli
    let tabela = '<table class="table table-striped"><thead><tr><th>Iteracija</th><th>x0</th><th>x1</th><th>x2</th><th>Funkcija(x1)</th><th>Greška</th></tr></thead><tbody>';
    for (let iteracija of rezultat.iteracije) {
        tabela += `<tr>
            <td>${iteracija.iteracija}</td>
            <td>${iteracija.x0}</td>
            <td>${iteracija.x1}</td>
            <td>${iteracija.x2}</td>
            <td>${iteracija.vrijednostFunkcije}</td>
            <td>${iteracija.greska}</td>
        </tr>`;
    }
    tabela += '</tbody></table>';
    document.getElementById('iteracije').innerHTML = tabela;
});
