function encryptText() {
    var inputText = document.getElementById("input-text").value.trim(); // Obtener texto
    
    // Validar que solo contiene letras minúsculas sin acentos
    if (isValidInput(inputText)) {
        var encryptedText = encrypt(inputText); // Encriptar el texto
        document.getElementById("output-text").value = encryptedText;
        document.getElementById("placeholder-image").style.display = "none"; // Ocultar la imagen
        hideErrorImage(); // Ocultar la imagen de error si el texto es válido
    } else {
        showErrorImage(); // Mostrar la imagen de error si el texto es inválido
    }
}

function decryptText() {
    var inputText = document.getElementById("output-text").value.trim(); // Obtener texto encriptado
    var decryptedText = decrypt(inputText);
    document.getElementById("input-text").value = ""; // Limpiar el campo de entrada
    document.getElementById("output-text").value = decryptedText; // Mostrar texto desencriptado

    // Mostrar la imagen de placeholder solo si el resultado está vacío
    if (decryptedText === "") {
        document.getElementById("placeholder-image").style.display = "block"; // Mostrar la imagen
    } else {
        document.getElementById("placeholder-image").style.display = "none"; // Ocultar la imagen
    }
    
    hideErrorImage(); // Ocultar la imagen de error si es necesario
}

function copyToClipboard() {
    var outputText = document.getElementById("output-text");
    outputText.select();
    outputText.setSelectionRange(0, 99999); /* Para dispositivos móviles */
    document.execCommand("copy");
    alert("Texto copiado al portapapeles: " + outputText.value);
    document.getElementById("input-text").value = ""; // Limpiar el campo de entrada
}

function isValidInput(text) {
    // Expresión regular para validar que solo contenga letras minúsculas sin acentos y espacios
    var regex = /^[a-z\s]+$/;
    return regex.test(text);
}

function encrypt(text) {
    // Definir reglas de encriptación
    var rules = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    // Aplicar reglas de encriptación al texto
    var encryptedText = text.replace(/[eioua]/g, function(match) {
        return rules[match];
    });

    return encryptedText;
}

function decrypt(text) {
    // Definir reglas de desencriptación
    var rules = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    // Aplicar reglas de desencriptación al texto
    var decryptedText = text.replace(/enter|imes|ai|ober|ufat/g, function(match) {
        return rules[match];
    });

    return decryptedText;
}

function showErrorImage() {
    var errorImage = document.getElementById("error-image");
    errorImage.style.display = "block";
    setTimeout(function() {
        errorImage.style.display = "none";
        showAlert(); // Mostrar la alerta después de que la imagen de error desaparezca
    }, 3000); // Duración de la imagen de error
}

function hideErrorImage() {
    var errorImage = document.getElementById("error-image");
    errorImage.style.display = "none";
}

function showAlert() {
    alert("El texto contiene mayúsculas o acentos. Por favor, revíselo.");
}
