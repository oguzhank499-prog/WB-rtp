# WB Kişisel 4.1 — AI sunucusu güvenlik ve test sürümü

- AI sunucusu varsayılan olarak yalnızca `127.0.0.1` üzerinde dinler; dış erişim için `WB_BIND_HOST` açıkça ayarlanmalıdır.
- `/api/health` uç noktası sunucu ve AI yapılandırma durumunu anahtarları ifşa etmeden bildirir.
- Gizli dosyalar, `.md` belgeleri ve `server/` altındaki sunucu kaynaklarının HTTP üzerinden sunulması engellendi.
- JSON ve statik yanıtlara temel güvenlik başlıkları eklendi.
- Sunucu uç noktaları için otomatik regresyon testi eklendi.
- Çevrimdışı önbellek sürümü 4.1'e yükseltildi.

**Sınırlar:** Bu güvenlik önlemleri üretim ortamı kimlik doğrulaması, HTTPS, sağlayıcı harcama limiti veya güvenlik denetimi yerine geçmez.
