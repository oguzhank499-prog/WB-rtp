(()=>{'use strict';
const root=document.getElementById('wb-assistant');if(!root)return;
const panel=document.createElement('section');panel.className='panel wb-knowledge';
panel.innerHTML='<h3>📚 Akademi Kaynaklı Soru Arama</h3><p class="muted">WB Akademi içindeki 20 konuya dayalı çevrimdışı arama. Bu bir üretken yapay zekâ değildir; eşleşen ders notlarını gösterir.</p><label for="wb-knowledge-q">Kimya sorusu veya anahtar sözcük</label><input id="wb-knowledge-q" placeholder="Örn. sınırlayıcı reaktif, rezonans, gazlar" autocomplete="off"><button type="button" id="wb-knowledge-search" class="primary wide">Akademide ara</button><div id="wb-knowledge-results" aria-live="polite"></div>';
root.appendChild(panel);
const q=panel.querySelector('#wb-knowledge-q'),out=panel.querySelector('#wb-knowledge-results');
const norm=s=>String(s||'').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i').replace(/[^a-z0-9çğıöşü]+/gi,' ').trim();
const words=s=>norm(s).split(/\s+/).filter(w=>w.length>2);
const add=(parent,tag,txt,cls)=>{const e=document.createElement(tag);if(cls)e.className=cls;e.textContent=txt;parent.appendChild(e);return e};
function search(){out.replaceChildren();const terms=words(q.value);if(!terms.length){add(out,'p','En az bir konu veya anahtar sözcük yaz.','muted');return}const topics=Array.isArray(window.WB_CURRICULUM)?window.WB_CURRICULUM:[];
const hits=topics.map(t=>{const title=norm(t.title),cat=norm(t.category),body=norm([t.lesson,t.question,t.why,t.challenge].join(' '));let score=0;for(const w of terms){if(title.includes(w))score+=5;if(cat.includes(w))score+=2;if(body.includes(w))score+=1}return {t,score}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,5);
if(!hits.length){add(out,'p','Akademide eşleşen konu bulunamadı. Farklı anahtar sözcük dene. Bu arama yeni yanıt üretmez.','muted');return}
add(out,'p',hits.length+' eşleşen akademi konusu · Kaynak: WB Kimya Akademisi','muted');for(const {t} of hits){const article=document.createElement('article');article.className='wb-knowledge-hit';add(article,'h4',t.title+' · '+t.category);add(article,'p',t.lesson);if(t.why){add(article,'strong','Örnek çözüm açıklaması');add(article,'p',t.why)}if(t.challenge){add(article,'strong','Kendin dene');add(article,'p',t.challenge)}add(article,'small','Yerel eğitim içeriği; otomatik bilimsel doğrulama değildir.','muted');out.appendChild(article)}}
panel.querySelector('#wb-knowledge-search').addEventListener('click',search);q.addEventListener('keydown',e=>{if(e.key==='Enter')search()});
})();