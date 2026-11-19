# WB Kişisel 4.0

- WB AI için isteğe bağlı çevrimiçi soru çözme paneli eklendi.
- API anahtarını tarayıcıya koymayan Node.js sunucu prototipi (`server/server.mjs`) eklendi.
- Temel rate limit, girdi sınırı, origin kontrolü, zaman aşımı ve gizli anahtarın sunucuda tutulması.
- GitHub Pages gibi yalnızca statik dağıtımlarda AI çalışmaz; çevrimdışı arama korunur.
- Üretim için kimlik doğrulama ve güvenlik sertleştirmesi gerekir.
