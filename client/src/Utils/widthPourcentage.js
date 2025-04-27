export const widthPourcentage = (width, pourcentage) => {
  if (pourcentage === 0) {
    width = "w-1/10";
  } else if (pourcentage > 5 && pourcentage <= 10) {
    width = "w-2/20";
  } else if (pourcentage > 10 && pourcentage <= 15) {
    width = "w-3/20";
  } else if (pourcentage > 15 && pourcentage <= 20) {
    width = "w-1/5";
  } else if (pourcentage > 20 && pourcentage <= 25) {
    width = "w-1/4";
  } else if (pourcentage > 25 && pourcentage <= 30) {
    width = "w-1/3";
  } else if (pourcentage > 30 && pourcentage <= 35) {
    width = "w-7/20";
  } else if (pourcentage > 35 && pourcentage <= 40) {
    width = "w-2/5";
  } else if (pourcentage > 40 && pourcentage <= 45) {
    width = "w-9/20";
  } else if (pourcentage > 45 && pourcentage <= 50) {
    width = "w-1/2";
  } else if (pourcentage > 50 && pourcentage <= 55) {
    width = "w-11/20";
  } else if (pourcentage > 55 && pourcentage <= 60) {
    width = "w-3/5";
  } else if (pourcentage > 60 && pourcentage <= 65) {
    width = "w-13/20";
  } else if (pourcentage > 65 && pourcentage <= 70) {
    width = "w-7/10";
  } else if (pourcentage > 75 && pourcentage <= 80) {
    width = "w-3/4";
  } else if (pourcentage > 80 && pourcentage <= 85) {
    width = "w-4/5";
  } else if (pourcentage > 85 && pourcentage <= 90) {
    width = "w-17/20";
  } else if (pourcentage > 90 && pourcentage <= 95) {
    width = "w-9/10";
  } else if (pourcentage > 95 && pourcentage < 100) {
    width = "w-19/20";
  } else {
    width = "w-full";
  }

  return width;
};
