# WB AI sunucusu (yerel geliştirme)

Node.js 20+ gerektirir. Proje klasöründen:

```bash
export OPENAI_API_KEY="YOUR_SECRET_KEY"
node server/server.mjs
```

Tarayıcı: `http://127.0.0.1:8787`. Durum kontrolü: `/api/health`.

Sunucu **varsayılan olarak yalnızca aynı bilgisayardan erişilebilir**. Telefon veya dış ağ için `WB_BIND_HOST=0.0.0.0` ayarlanabilir, fakat bunu yalnızca güvenilir yerel ağda ve uygun güvenlik kontrolleriyle yapın. İnternete açık kurulum için HTTPS, kimlik doğrulama, ters proxy, sağlayıcı harcama sınırları ve güvenlik denetimi gereklidir. API anahtarını tarayıcı koduna veya GitHub'a koymayın. Sorular AI sağlayıcısına iletilir. Statik GitHub Pages üzerinde AI çalışmaz.

Otomatik test: `node --test server/server.test.mjs` (API anahtarı gerekmez).
