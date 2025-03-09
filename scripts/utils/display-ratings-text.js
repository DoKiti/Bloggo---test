export function displayingRatingsText(amount) {
  if(amount < 1000) {
    return amount
  } else if(amount < 1000000) {
    return amount
  } else {
    return `a lot`
  }
}

export function displayingRatingsTextP(amount) {
  if(amount < 1000) {
    return amount
  } else if(amount < 1000000) {
    return `${amount / 1000}k`
  } else {
    return `a lot`
  }
}
