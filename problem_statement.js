const fs = require("fs");

// Convert string from given base to decimal (BigInt safe)
function convertToDecimal(value, base) {
  return BigInt(parseInt(value, base));
}

// Build polynomial coefficients from roots
function buildPolynomial(roots) {
  let coeffs = [1n]; // start with P(x) = 1

  for (let r of roots) {
    let newCoeffs = Array(coeffs.length + 1).fill(0n);

    for (let i = 0; i < coeffs.length; i++) {
      newCoeffs[i] += coeffs[i] * -r; // multiply by (-r)
      newCoeffs[i + 1] += coeffs[i];  // shift for x term
    }

    coeffs = newCoeffs;
  }
  return coeffs;
}

function main(path_to_file) {
  // Read JSON input from stdin
  const inputData = fs.readFileSync(path_to_file, "utf-8");
  const input = JSON.parse(inputData);

  const n = parseInt(input.keys.n);
  const k = parseInt(input.keys.k);

  let roots = [];

  for (let key in input) {
    if (key === "keys") continue;
    const base = parseInt(input[key].base);
    const value = input[key].value;
    const root = convertToDecimal(value, base);
    roots.push(root);
  }

  // Only take first k roots
  const selected = roots.slice(0, k);

  // Build polynomial
  const coeffs = buildPolynomial(selected);

  // Constant term = first coefficient
  const constant = coeffs[0];

  console.log(constant.toString());
}

main("./test_case.json")
main("./test_case_2.json");
