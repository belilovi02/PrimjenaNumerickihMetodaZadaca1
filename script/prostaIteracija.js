export const prostaIteracija = (funkcija, pocetnaVrijednost, tolerancija, maxIteracija = 100) => {
  let aproksimacija = pocetnaVrijednost;
  let podaci = [];
  
  for (let i = 1; i <= maxIteracija; i++) {
    const novaVrijednost = funkcija(aproksimacija);
    const greska = Math.abs(novaVrijednost - aproksimacija);

    podaci.push({
      iteracija: i,
      aproksimacija,
      vrijednostFunkcije: novaVrijednost,
      greska,
    });

    if (greska < tolerancija) return [novaVrijednost, podaci];
    aproksimacija = novaVrijednost;
  }

  throw new Error("Dostignut je maksimalan broj dozvoljenih iteracija.");
};
