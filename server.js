// server.js
const express = require('express');
const app = express();
const port = 3000;

// Kullanıcı adı ve HWID'leri saklamak için geçici bir bellek (in-memory)
let users = {};

// Sunucuya gelen isteklere JSON formatında yanıt vermek için middleware
app.use(express.json());

// Kullanıcı adı ve HWID kontrolü yapacak endpoint
app.post('/check-username', (req, res) => {
    const { username, hwid } = req.body;

    // Eğer kullanıcı adı daha önce kaydedildiyse, HWID kontrol et
    if (users[username]) {
        if (users[username] !== hwid) {
            return res.status(400).json({ message: 'Bu kullanıcı adı başka bir cihazdan giriş yaptı!' });
        }
    } else {
        // Kullanıcı adı yeni ise, kullanıcı adı ve HWID'yi kaydet
        users[username] = hwid;
    }

    return res.status(200).json({ message: 'Kullanıcı adı başarıyla kaydedildi!' });
});

// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});
