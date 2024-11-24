import { prostaIteracija } from "./prostaIteracija.js";

// Funkcije koje koristimo za metodu proste iteracije
const funkcija1 = (x) => Math.sqrt(2); // Za funkciju x^2 - 2, koristimo g(x) = sqrt(2)
const funkcija2 = (x) => Math.cbrt(x * x - 2); // Za funkciju x^3 - x^2 + 2, koristimo g(x) = cube root (x^2 - 2)

// Elementi korisničkog interfejsa
const aproksimacija = document.getElementById("aproksimacija");
const tacnost = document.getElementById("tacnost");
const maxIteracija = document.getElementById("maxIteracija");
const automatskoPopunjavanje = document.getElementById("automatskoPopunjavanje");
const jednacina = document.getElementsByName("jednacina");
const rijesiBtn = document.getElementById("rijesi");
const greska = document.getElementById("greska");
const rjesenje = document.getElementById("rjesenje");
const tabela = document.getElementById("tabela");

// Parametri za automatsko popunjavanje
const parametri = [
  { aproksimacija: 1.5, tacnost: 1e-4 }, // Za funkciju 1
  { aproksimacija: -1, tacnost: 1e-6 }, // Za funkciju 2
];

// Funkcija za automatsko popunjavanje
const popuniParametre = (jednacina) => {
  aproksimacija.value = parametri[jednacina - 1].aproksimacija;
  tacnost.value = parametri[jednacina - 1].tacnost;
};

const obrisiParametre = () => {
  aproksimacija.value = "";
  tacnost.value = "";
};

// Promjena parametara pri izboru jednadžbe
const promijeniParametre = (e) => {
  if (e.currentTarget.checked) {
    if (jednacina[0].checked) popuniParametre(1);
    else if (jednacina[1].checked) popuniParametre(2);
  } else obrisiParametre();
};

automatskoPopunjavanje.addEventListener("change", promijeniParametre);

const promijeniJednacinu = (e) => {
  if (automatskoPopunjavanje.checked) {
    if (jednacina[0].checked) popuniParametre(1);
    else if (jednacina[1].checked) popuniParametre(2);
  }
};

document.body.addEventListener("change", promijeniJednacinu);

// Funkcija za popunjavanje tabele
const popuniTabelu = (podaci) => {
  if (!podaci) return;
  tabela.innerHTML = "";
  tabela.innerHTML = `<thead>
                        <tr>
                          <td>Broj iteracije</td>
                          <td>Aproksimacija</td>
                          <td>Vrijednost funkcije</td>
                          <td>Greška</td>
                        </tr>
                      </thead>`;
  podaci.forEach((p) => {
    tabela.innerHTML += `<tr>
                            <td>${p.iteracija}</td>
                            <td>${p.aproksimacija.toFixed(6)}</td>
                            <td>${p.vrijednostFunkcije.toFixed(6)}</td>
                            <td>${p.greska.toFixed(6)}</td>
                        </tr>`;
  });
};

// Funkcija za rješavanje
const rijesi = () => {
  greska.innerHTML = "";
  rjesenje.innerHTML = "";
  tabela.innerHTML = "";
  if (!jednacina[0].checked && !jednacina[1].checked) {
    alert("Izaberite jednačinu.");
    return;
  }
  if (!aproksimacija.value || !tacnost.value) {
    alert("Unesite sva potrebna polja.");
    return;
  }

  const funkcija = jednacina[0].checked ? funkcija1 : funkcija2;
  let rez, podaci;

  try {
    [rez, podaci] = prostaIteracija(
      funkcija,
      Number.parseFloat(aproksimacija.value),
      Number.parseFloat(tacnost.value),
      maxIteracija.value ? Number.parseInt(maxIteracija.value) : 1000 // Povećaj broj iteracija na 1000
    );

    rjesenje.innerHTML = `Rješenje: ${rez.toFixed(6)}`;
    popuniTabelu(podaci);
  } catch (err) {
    greska.innerHTML = `Greška: ${err.message}`;
  }
};

rijesiBtn.addEventListener("click", rijesi);
