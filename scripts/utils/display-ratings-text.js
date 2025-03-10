export function displayingRatingsText(amount) {
  if (amount < 1000) {
    return amount;
  } else if (amount < 1000000) {
    // Round down to one decimal place
    const formattedAmount = Math.floor((amount / 1000) * 10) / 10;
    return `${formattedAmount}k`;
  } else {
    return `a lot`;
  }
}