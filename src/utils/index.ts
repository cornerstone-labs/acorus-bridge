export function validate(event: React.FormEvent<HTMLInputElement>) {
  let pattern = /^[0-9.]+$/;
  let newValue = '';
  let decimalCount = 0;
  let zeroCount = 0;

  if (event.currentTarget.value[0] === '.') {
    newValue += '0';
  }

  for (let i = 0; i < event.currentTarget.value.length; i++) {
    let char = event.currentTarget.value[i];

    if (char === '.') {
      if (zeroCount > 0) {
        newValue += '0';
        zeroCount = 0;
      }
      if (decimalCount === 0) {
        newValue += char;
        decimalCount++;
      }
    } else if (char === '0') {
      zeroCount++;
    } else if (pattern.test(char)) {
      if (zeroCount > 0) {
        newValue += '0'.repeat(zeroCount);
        zeroCount = 0;
      }
      newValue += char;
    }
  }

  if (zeroCount > 0) {
    newValue += '0'.repeat(zeroCount);
  }

  event.currentTarget.value = newValue;
}
