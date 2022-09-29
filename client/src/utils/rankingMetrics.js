export const firstMetric = (x, y) => {
  let xScore = parseInt(x["matchStats"]["Win"]) * 3 + parseInt(x["matchStats"]["Draw"]);
  let yScore = parseInt(y["matchStats"]["Win"]) * 3 + parseInt(y["matchStats"]["Draw"]);

  if (xScore < yScore) {
    return -1;
  } else if (yScore < xScore) {
    return 1;
  } else {
    return 0;
  }
}

export const secondMetric = (x, y) => {
  if (parseInt(x["matchStats"]["Goals"]) > parseInt(y["matchStats"]["Goals"])) {
    return 1;
  } else if (parseInt(x["matchStats"]["Goals"]) < parseInt(y["matchStats"]["Goals"])) {
    return -1;
  } else {
    return 0;
  }
}

export const thirdMetric = (x, y) => {
  let xScore = parseInt(x["matchStats"]["Win"]) * 5 + parseInt(x["matchStats"]["Draw"]) * 3 + parseInt(x["matchStats"]["Lose"]) * 1;
  let yScore = parseInt(y["matchStats"]["Win"]) * 5 + parseInt(y["matchStats"]["Draw"]) * 3 + parseInt(y["matchStats"]["Lose"]) * 1;

  if (xScore < yScore) {
    return -1;
  } else if (yScore < xScore) {
    return 1;
  } else {
    return 0;
  }
}

export const forthMetric = (x, y) => {
  let xDate = new Date(x["registrationDate"]);
  let yDate = new Date(y["registrationDate"]);
  if (xDate > yDate) {
    return 1;
  } else if (xDate < yDate) {
    return -1;
  } else {
    return 0;
  }
}