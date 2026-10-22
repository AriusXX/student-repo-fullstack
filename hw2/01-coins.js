/** Exercise 01 - Coins **/

// Add your function here
function calculateChange(amount) {
  // Validate input
  if (typeof amount !== "number" || isNaN(amount)) {
    return "Error: please enter a valid number";
  }
  if (amount < 0) {
    return "Error: the number cannot be negative";
  }
  if (amount > 100) {
    return "Error: the number is too large";
  }

  // Convert to whole cents to avoid floating-point errors
  let cents = Math.round(amount * 100);

  if (cents === 0) {
    return "No change needed";
  }

  // Coin values in cents and their names (same order)
  const values = [100, 25, 10, 5, 1];
  const singular = ["dollar", "quarter", "dime", "nickel", "penny"];
  const plural = ["dollars", "quarters", "dimes", "nickels", "pennies"];

  const parts = [];

  for (let i = 0; i < values.length; i++) {
    const count = Math.floor(cents / values[i]);
    cents = cents % values[i];

    if (count === 1) {
      parts.push("1 " + singular[i]);
    } else if (count > 1) {
      parts.push(count + " " + plural[i]);
    }
  }

  return parts.join(", ");
}

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

console.log();

// Add additional test cases here

//boundaries
console.log(calculateChange(0));
// $0 ==> No change needed
console.log(calculateChange(0.01));
// $0.01 ==> 1 penny
console.log(calculateChange(100));
// $100 ==> 100 dollars
console.log(calculateChange(100.01));
// $100.01 ==> Error: the number is too large

console.log();

// Single coins
console.log(calculateChange(1.0));
// $1.00 ==> 1 dollar
console.log(calculateChange(0.25));
// $0.25 ==> 1 quarter
console.log(calculateChange(0.1));
// $0.10 ==> 1 dime

console.log();

// Invalid input
console.log(calculateChange(-5));
// -$5 ==> Error: the number cannot be negative
console.log(calculateChange("abc"));
// "abc" ==> Error: please enter a valid number
