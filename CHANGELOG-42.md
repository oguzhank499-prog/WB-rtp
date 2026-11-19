# WB Kişisel 4.2 — AI sunucusu istek güvenliği

- Yerel modda Host başlığı doğrulanıyor; DNS rebinding türü isteklere karşı ek koruma.
- Gelen AI soru gövdesi artık UTF-8 bayt sayısına göre 12 KB ile sınırlandırılıyor.
- İstek okuma süresine 10 saniye sınırı eklendi.
- Dakikalık soru sınırı 1–60 arasında güvenli aralığa sabitlendi ve hata mesajı yapılandırılmış sınırı gösteriyor.
- İki ek sunucu regresyon testi: Host kontrolü ve yöntem/güvenlik başlığı.
- PWA önbellek sürümü 4.2 olarak güncellendi.

Sınırlar: AI sağlayıcısına canlı istek yapılmadı; sunucu kimlik doğrulaması ve HTTPS hâlâ üretim kurulumu için gerekli.
