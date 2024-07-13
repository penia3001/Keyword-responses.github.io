async function getResponse() {
    const message = document.getElementById('message').value.toLowerCase();
    const responseElement = document.getElementById('response');

    // JSON dosyasını yükle
    const responses = await fetch('responses.json')
        .then(response => response.json());

    // Metin ön işleme (küçük harfe çevirme ve özel karakterleri kaldırma)
    const preprocessText = text => text.toLowerCase().replace(/[^\w\s]/g, '');

    // Kullanıcı girdisini ön işlemden geçir
    const processedMessage = preprocessText(message);

    // İlgili tüm yanıtları bulma
    let relevantResponses = [];

    for (const [keyword, response] of Object.entries(responses)) {
        if (processedMessage.includes(preprocessText(keyword))) {
            relevantResponses.push(response);
        }
    }

    // Yanıtları göster
    if (relevantResponses.length > 0) {
        responseElement.innerHTML = relevantResponses.join('<br><br>');
    } else {
        responseElement.innerText = "Üzgünüz, sorunuzla ilgili yardımcı olamıyoruz. Lütfen müşteri hizmetlerimizle iletişime geçin.";
    }
}

document.getElementById('sendButton').addEventListener('click', getResponse);