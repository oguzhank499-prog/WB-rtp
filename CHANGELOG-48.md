# WB Kişisel 4.8 — Elektrik yükü korunumu

- Elektron oku önizlemesinde toplam formal yük başlangıç ve ürün için hesaplanır.
- Elektron muhasebesinde toplam yük korunmuyorsa ürün reddedilir.
- Başarılı adım sonucuna `chargeBefore` ve `chargeAfter` alanları eklenir.
- Çok büyük taslaklara sınır eklenir (150 atom, 300 bağ).
- Heterolitik ayrılma, nükleofilik bağ oluşumu ve karboksilat rezonansı için regresyon testleri.

Sınır: Toplam yükün korunması mekanizmanın kimyasal olarak doğru olduğunu kanıtlamaz.
