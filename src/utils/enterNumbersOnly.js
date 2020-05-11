let dotCounter = 0;

export const validateCurrency = event => {
  event.persist();
  const which = event.which;
  const keyCode = Number(event.keyCode);

  // Check if is number
  // Check if is arrow
  // Check if is delete
  // Check if is backspace
  // Check if is dot (.)
  // Check if is keyboard combination => CTRL + (A || C || V)

  if (!event.target.value) {
    dotCounter = 0;
  }

  if (
    (which >= 48 && which <= 57) ||
    (which >= 96 && which <= 105) ||
    (keyCode >= 37 && keyCode <= 40) ||
    keyCode === 46 ||
    which === 8 ||
    keyCode === 190 ||
    keyCode === 110 ||
    (event.ctrlKey && (keyCode === 65 || keyCode === 86 || keyCode === 67))
  ) {
    if (keyCode === 190 || keyCode === 110) {
      if (!dotCounter) {
        dotCounter++;
      } else {
        event.preventDefault();
      }
    }
  } else {
    event.preventDefault();
  }
};
