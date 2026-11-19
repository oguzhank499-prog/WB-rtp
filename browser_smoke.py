from playwright.sync_api import sync_playwright
from pathlib import Path
url='http://127.0.0.1:8765/index.html'
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=b.new_page(viewport={'width':390,'height':844})
 errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(url,wait_until='domcontentloaded')
 page.locator('nav button[data-page="explore"]').click()
 page.locator('#wb42-limit').click()
 assert '3' in page.locator('#wb42-limit-out').inner_text()
 page.locator('#wb42-vsepr').click()
 assert 'Üçgen piramit' in page.locator('#wb42-vsepr-out').inner_text()
 page.locator('#wb42-ph').click()
 assert '2' in page.locator('#wb42-ph-out').inner_text()
 assert not errors,errors
 print('PASS browser: explore, limiting reagent, VSEPR, pH; no JS page errors')
 b.close()
