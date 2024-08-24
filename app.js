window.onload = function() {
    const textoDigitado = document.getElementById('textoDigitado');
    const btCriptografar = document.getElementById('btCriptografar');
    const btDescriptografar = document.getElementById('btDescriptografar');
    const resultadoTexto = document.getElementById('resultadoTexto');

    // Função para salvar o texto
    function saveText() {
        let text = textoDigitado.value;
        localStorage.setItem('userText', text);
    }

    // Função para criptografar o texto
    function encryptText(text) {
        const rules = {
            'e': 'enter',
            'i': 'imes',
            'a': 'ai',
            'o': 'ober',
            'u': 'ufat'
        };
    
        let encryptedText = text.replace(/[eioua]/g, function(match) {
            return rules[match];
        });
    
        return encryptedText;
    }

    function decryptText(text) {
        const rules = {
            'enter': 'e',
            'imes': 'i',
            'ai': 'a',
            'ober': 'o',
            'ufat': 'u'
        };

        return text.replace(/enter|imes|ai|ober|ufat/g, match => rules[match]);
    }

    function validateText(text) {
        // Regex para letras minúsculas e sem acento
        const invalidCharsRegex = /[A-ZÀ-ÿ0-9]/;
        return !invalidCharsRegex.test(text);
    }

      // Função para exibir o resultado
    function displayResults() {
        const text = textoDigitado.value.trim();

        if (!validateText(text)) {
            alert("Apenas letras minúsculas e sem acento.");
            resultadoDiv.style.display = 'block';
            resultadoCriptografado.style.display = 'none';
        } else if (text === "") {
            // Mostrar a div inicial e ocultar o resultado criptografado
            resultadoDiv.style.display = 'block';
            resultadoCriptografado.style.display = 'none';
        } else {
            // Ocultar a div inicial e mostrar o resultado criptografado
            const encryptedText = encryptText(text);
            resultadoTextoCripto.textContent = encryptedText;

            resultadoDiv.style.display = 'none';
            resultadoCriptografado.style.display = 'block';
        }
    }

    // **Função para exibir o resultado da descriptografia
    function displayDecryptedResults() {
        const text = textoDigitado.value.trim();

        if (!validateText(text)) {
            alert("Apenas letras minúsculas e sem acento.");
            resultadoDiv.style.display = 'block';
            resultadoCriptografado.style.display = 'none';
        } else if (text === "") {
            resultadoDiv.style.display = 'block';
            resultadoCriptografado.style.display = 'none';
        } else {
            const decryptedText = decryptText(text); // **Alterada de encryptText para decryptText**
            resultadoTextoCripto.textContent = decryptedText; // **Alterada para descriptografar**

            resultadoDiv.style.display = 'none';
            resultadoCriptografado.style.display = 'block';
        }
    }

    // Adiciona o evento de clique ao botão de criptografar
    btCriptografar.addEventListener('click', displayResults);

    // **Adiciona o evento de clique ao botão de descriptografar** // **Linha adicionada**
    btDescriptografar.addEventListener('click', displayDecryptedResults);

    // Função para copiar o texto para a área de transferência
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Texto copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar texto: ', err);
        });
    }

    // Adiciona o evento de clique ao botão de copiar (resultado inicial)
    copiarCriptoButton.addEventListener('click', () => {
        const initialText = resultadoTexto.querySelector('.texto-grande').textContent;
        copyToClipboard(initialText);
    });

    // Adiciona o evento de clique ao botão de copiar (resultado criptografado)
    copiarCriptoButton.addEventListener('click', () => {
        const encryptedText = resultadoTextoCripto.textContent;
        copyToClipboard(encryptedText);
    });
};