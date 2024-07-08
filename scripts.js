function encryptText() {
    var inputText = document.getElementById("input-text").value.trim(); // Obtener texto
    
    // Validar que solo contiene letras minúsculas sin acentos
    if (isValidInput(inputText)) {
        var encryptedText = encrypt(inputText); // Encriptar el texto directamente
        document.getElementById("output-text").value = encryptedText;
    } else {
        // Mostrar alerta si el texto contiene mayúsculas o acentos
        alert("Su texto contiene mayúsculas o acentos. Por favor, revíselo.");
    }
}

function decryptText() {
    // Intentar obtener texto del portapapeles para manejar casos de pegado
    navigator.clipboard.readText().then(clipboardText => {
        var inputText = clipboardText.trim(); // Obtener texto del portapapeles

        // Validar que solo contiene letras minúsculas sin acentos
        if (!isValidInput(inputText)) {
            // Mostrar alerta si el texto contiene mayúsculas o acentos
            alert("El texto pegado contiene mayúsculas o acentos. Por favor, revíselo.");
            return;
        }

        var decryptedText = decrypt(inputText);
        document.getElementById("output-text").value = decryptedText;
    }).catch(err => {
        console.error('No se pudo leer el portapapeles: ', err);
    });
}

function copyToClipboard() {
    var outputText = document.getElementById("output-text");
    outputText.select();
    outputText.setSelectionRange(0, 99999); /* Para dispositivos móviles */
    document.execCommand("copy");
    alert("Texto copiado al portapapeles: " + outputText.value);

    // Limpiar el campo de entrada después de copiar el texto encriptado
    document.getElementById("input-text").value = "";
}

function isValidInput(text) {
    // Expresión regular para validar que solo contenga letras minúsculas sin acentos
    var regex = /^[a-zñáéíóúü]+$/i;
    return regex.test(text);
}

function encrypt(text) {
    // Definir reglas de encriptación
    var rules = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat',
        'E': 'enter', // Agregar las reglas para letras mayúsculas
        'I': 'imes',
        'A': 'ai',
        'O': 'ober',
        'U': 'ufat'
    };

    // Aplicar reglas de encriptación al texto
    var encryptedText = text.replace(/[eiouEIUAO]/g, function(match) {
        return rules[match];
    });

    return encryptedText;
}

function decrypt(text) {
    // Definir reglas de desencriptación (inversas de las reglas de encriptación)
    var inverseRules = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u',
        'Enter': 'E', // Agregar las reglas inversas para letras mayúsculas
        'Imes': 'I',
        'Ai': 'A',
        'Ober': 'O',
        'Ufat': 'U'
    };

    // Aplicar reglas de desencriptación al texto
    var decryptedText = text.replace(/(enter|imes|ai|ober|ufat|Enter|Imes|Ai|Ober|Ufat)/g, function(match) {
        return inverseRules[match];
    });

    return decryptedText;
}
