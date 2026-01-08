// server.js
const express = require('express');
const app = express();
const port = 3000;

// Kullanıcı adlarını saklamak için geçici bir bellek (in-memory)
let usedNames = [];

// Sunucuya gelen isteklere JSON formatında yanıt vermek için middleware
app.use(express.json());

// Kullanıcı adı kontrolü yapacak endpoint
app.post('/check-username', (req, res) => {
    const { username } = req.body;

    // Eğer kullanıcı adı daha önce alınmışsa, hata döndür
    if (usedNames.includes(username)) {
        return res.status(400).json({ message: 'Bu isim zaten alınmış!' });
    }

    // Kullanıcı adını kaydet
    usedNames.push(username);

    // Başarılı mesajı döndür
    return res.status(200).json({ message: 'Kullanıcı adı başarıyla kaydedildi!' });
});

// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});
