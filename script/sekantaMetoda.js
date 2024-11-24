export const sekantnaMetoda = (funkcija, x0, x1, epsilon) => {
  const iteracije = [];
  let x2;
  let greska;
  let iteracija = 1;

  do {
    // Računanje sekantne metode
    x2 = x1 - (funkcija(x1) * (x1 - x0)) / (funkcija(x1) - funkcija(x0));
    greska = Math.abs(x2 - x1);

    // Dodavanje rezultata iteracije
    iteracije.push({
      iteracija,
      x0,
      x1,
      x2,
      vrijednostFunkcije: funkcija(x1),
      greska,
    });

    x0 = x1;
    x1 = x2;
    iteracija++;
  } while (greska > epsilon);

  return {
    rjesenje: x2,
    iteracije,
  };
};
