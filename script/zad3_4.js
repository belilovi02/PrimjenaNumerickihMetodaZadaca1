import { sekantnaMetoda } from "./sekantaMetoda.js"

// Definicija funkcija
const funkcija1 = (x) => x * x - 2; // Korijen kvadratnog broja
const funkcija2 = (x) => x ** 3 - x ** 2 + 2; // Kubična funkcija

// Elementi DOM-a
const x0Input = document.getElementById("x0");
const x1Input = document.getElementById("x1");
const epsilonInput = document.getElementById("epsilon");
const funkcijaRadio = document.getElementsByName("funkcija");
const rezultatDiv = document.getElementById("rjesenje");
const greskaDiv = document.getElementById("greska");
const tabela = document.getElementById("tabela");
const rijesiBtn = document.getElementById("rijesi");
const automatskoPopunjavanje = document.getElementById("automatskoPopunjavanje");

// Pomoćna funkcija za ispis rezultata u tabelu
const popuniTabelu = (iteracije) => {
  tabela.innerHTML = `<thead>
                        <tr>
                          <th>Iteracija</th>
                          <th>x<sub>0</sub></th>
                          <th>x<sub>1</sub></th>
                          <th>x<sub>2</sub></th>
                          <th>Vrijednost f(x<sub>1</sub>)</th>
                          <th>Greška</th>
                        </tr>
                      </thead>`;
  iteracije.forEach((it) => {
    tabela.innerHTML += `<tr>
                           <td>${it.iteracija}</td>
                           <td>${it.x0.toFixed(6)}</td>
                           <td>${it.x1.toFixed(6)}</td>
                           <td>${it.x2.toFixed(6)}</td>
                           <td>${it.vrijednostFunkcije.toFixed(6)}</td>
                           <td>${it.greska.toFixed(6)}</td>
                         </tr>`;
  });
};

// Automatsko popunjavanje
const popuniPodatke = () => {
  x0Input.value = 1.5;
  x1Input.value = 2;
  epsilonInput.value = 0.001;
  funkcijaRadio[0].checked = true;
};

// Obrada događaja na klik dugmeta
rijesiBtn.addEventListener("click", () => {
  const x0 = parseFloat(x0Input.value);
  const x1 = parseFloat(x1Input.value);
  const epsilon = parseFloat(epsilonInput.value);

  // Odabir funkcije
  const funkcija = funkcijaRadio[0].checked ? funkcija1 : funkcija2;

  // Reset rezultata
  rezultatDiv.innerHTML = "";
  greskaDiv.innerHTML = "";
  tabela.innerHTML = "";

  try {
    const { rjesenje, iteracije } = sekantnaMetoda(funkcija, x0, x1, epsilon);
    rezultatDiv.innerHTML = `<p>Rješenje: x = ${rjesenje.toFixed(6)}</p>`;
    popuniTabelu(iteracije);
  } catch (err) {
    greskaDiv.innerHTML = `<p>Greška: ${err.message}</p>`;
  }
});

// Provjera za automatsko popunjavanje
automatskoPopunjavanje.addEventListener("change", () => {
  if (automatskoPopunjavanje.checked) {
    popuniPodatke();
  } else {
    x0Input.value = "";
    x1Input.value = "";
    epsilonInput.value = "";
  }
});
