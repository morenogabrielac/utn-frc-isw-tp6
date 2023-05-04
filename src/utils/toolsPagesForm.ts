function onlyNumbers(event: React.ChangeEvent<HTMLInputElement>, n: number): void {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
    const regex = /^[0-9]*$/; // Expresión regular para permitir solo números
    if (!regex.test(inputValue)) {
      // Si el input no es un número, reemplazamos todos los caracteres no numéricos por una cadena vacía
      input.value = inputValue.replace(/[^\d]/g, '');
      return;
    }
    if (inputValue.length > n) {
      // Si el input tiene más de n dígitos, reemplazamos los dígitos adicionales por una cadena vacía a partir del dígito 19
      input.value = inputValue.slice(0, n) + inputValue.slice(n).replace(/[0-9]/g, '');
      return;
    }
  }
  
  function formatInput(event: React.ChangeEvent<HTMLInputElement>): void {
    "le pone '/' pero no me deja borrarla"
    const inputValue = event.target.value.replace(/\D/g, '').substring(0, 6);
    const formattedValue = `${inputValue.substring(0, 2)}/${inputValue.substring(2)}`;
    event.target.value = formattedValue;
  }

  function formatInputExpiryDate(event: React.ChangeEvent<HTMLInputElement>): void {
    const inputValue = event.target.value.replace(/\D/g, '');
    let formattedValue = '';
  
    if (inputValue.length > 2) {
      formattedValue = `${inputValue.substring(0, 2)}/${inputValue.substring(2, 6)}`;
    } else {
      formattedValue = inputValue;
    }
  
    event.target.value = formattedValue;
  }
  

  export {onlyNumbers,formatInputExpiryDate};