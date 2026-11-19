'use strict';
// Curated entries: formula, Turkish name, charge, group. Charges are for ions, not oxidation states.
const shuffle=a=>{let b=a.slice();for(let i=b.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b},pick=a=>a[Math.floor(Math.random()*a.length)];
const raw=`H|Hidrojen||element
He|Helyum||element
Li|Lityum||element
Be|Berilyum||element
B|Bor||element
C|Karbon||element
N|Azot||element
O|Oksijen||element
F|Flor||element
Ne|Neon||element
Na|Sodyum||element
Mg|Magnezyum||element
Al|Alüminyum||element
Si|Silisyum||element
P|Fosfor||element
S|Kükürt||element
Cl|Klor||element
Ar|Argon||element
K|Potasyum||element
Ca|Kalsiyum||element
Sc|Skandiyum||element
Ti|Titanyum||element
V|Vanadyum||element
Cr|Krom||element
Mn|Mangan||element
Fe|Demir||element
Co|Kobalt||element
Ni|Nikel||element
Cu|Bakır||element
Zn|Çinko||element
Ga|Galyum||element
Ge|Germanyum||element
As|Arsenik||element
Se|Selenyum||element
Br|Brom||element
Kr|Kripton||element
Rb|Rubidyum||element
Sr|Stronsiyum||element
Y|İtriyum||element
Zr|Zirkonyum||element
Nb|Niyobyum||element
Mo|Molibden||element
Tc|Teknesyum||element
Ru|Rutenyum||element
Rh|Rodyum||element
Pd|Paladyum||element
Ag|Gümüş||element
Cd|Kadmiyum||element
In|İndiyum||element
Sn|Kalay||element
Sb|Antimon||element
Te|Tellür||element
I|İyot||element
Xe|Ksenon||element
Cs|Sezyum||element
Ba|Baryum||element
La|Lantan||element
Ce|Seryum||element
Pr|Praseodim||element
Nd|Neodim||element
Pm|Prometyum||element
Sm|Samaryum||element
Eu|Evropiyum||element
Gd|Gadolinyum||element
Tb|Terbiyum||element
Dy|Disprozyum||element
Ho|Holmiyum||element
Er|Erbiyum||element
Tm|Tulyum||element
Yb|İterbiyum||element
Lu|Lutesyum||element
Hf|Hafniyum||element
Ta|Tantal||element
W|Tungsten||element
Re|Reniyum||element
Os|Osmiyum||element
Ir|İridyum||element
Pt|Platin||element
Au|Altın||element
Hg|Cıva||element
Tl|Talyum||element
Pb|Kurşun||element
Bi|Bizmut||element
Po|Polonyum||element
At|Astatin||element
Rn|Radon||element
Fr|Fransiyum||element
Ra|Radyum||element
Ac|Aktinyum||element
Th|Toryum||element
Pa|Protaktinyum||element
U|Uranyum||element
Np|Neptünyum||element
Pu|Plütonyum||element
Am|Amerikyum||element
Cm|Küriyum||element
Bk|Berkelyum||element
Cf|Kaliforniyum||element
Es|Aynştaynyum||element
Fm|Fermiyum||element
Md|Mendelevyum||element
No|Nobelyum||element
Lr|Lavrenciyum||element
Rf|Rutherfordiyum||element
Db|Dubniyum||element
Sg|Seaborgiyum||element
Bh|Bohriyum||element
Hs|Hassiyum||element
Mt|Meitneriyum||element
Ds|Darmstadtiyum||element
Rg|Röntgenyum||element
Cn|Kopernikyum||element
Nh|Nihonyum||element
Fl|Flerovyum||element
Mc|Moskovyum||element
Lv|Livermoryum||element
Ts|Tennessin||element
Og|Oganesson||element
H⁺|Hidrojen iyonu|+1|ion
Li⁺|Lityum iyonu|+1|ion
Na⁺|Sodyum iyonu|+1|ion
K⁺|Potasyum iyonu|+1|ion
Ag⁺|Gümüş iyonu|+1|ion
Mg²⁺|Magnezyum iyonu|+2|ion
Ca²⁺|Kalsiyum iyonu|+2|ion
Ba²⁺|Baryum iyonu|+2|ion
Zn²⁺|Çinko iyonu|+2|ion
Al³⁺|Alüminyum iyonu|+3|ion
Fe²⁺|Demir(II) iyonu|+2|ion
Fe³⁺|Demir(III) iyonu|+3|ion
Cu⁺|Bakır(I) iyonu|+1|ion
Cu²⁺|Bakır(II) iyonu|+2|ion
Sn²⁺|Kalay(II) iyonu|+2|ion
Sn⁴⁺|Kalay(IV) iyonu|+4|ion
Pb²⁺|Kurşun(II) iyonu|+2|ion
Pb⁴⁺|Kurşun(IV) iyonu|+4|ion
Cl⁻|Klorür iyonu|-1|ion
Br⁻|Bromür iyonu|-1|ion
I⁻|İyodür iyonu|-1|ion
F⁻|Florür iyonu|-1|ion
O²⁻|Oksit iyonu|-2|ion
S²⁻|Sülfür iyonu|-2|ion
N³⁻|Nitrür iyonu|-3|ion
OH⁻|Hidroksit iyonu|-1|poly
NO₃⁻|Nitrat iyonu|-1|poly
NO₂⁻|Nitrit iyonu|-1|poly
SO₄²⁻|Sülfat iyonu|-2|poly
SO₃²⁻|Sülfit iyonu|-2|poly
HSO₄⁻|Hidrojen sülfat iyonu|-1|poly
HSO₃⁻|Hidrojen sülfit iyonu|-1|poly
CO₃²⁻|Karbonat iyonu|-2|poly
HCO₃⁻|Hidrojen karbonat iyonu|-1|poly
PO₄³⁻|Fosfat iyonu|-3|poly
HPO₄²⁻|Hidrojen fosfat iyonu|-2|poly
H₂PO₄⁻|Dihidrojen fosfat iyonu|-1|poly
NH₄⁺|Amonyum iyonu|+1|poly
CN⁻|Siyanür iyonu|-1|poly
CH₃COO⁻|Asetat iyonu|-1|poly
MnO₄⁻|Permanganat iyonu|-1|poly
MnO₄²⁻|Manganat iyonu|-2|poly
CrO₄²⁻|Kromat iyonu|-2|poly
Cr₂O₇²⁻|Dikromat iyonu|-2|poly
ClO⁻|Hipoklorit iyonu|-1|poly
ClO₂⁻|Klorit iyonu|-1|poly
ClO₃⁻|Klorat iyonu|-1|poly
ClO₄⁻|Perklorat iyonu|-1|poly
C₂O₄²⁻|Oksalat iyonu|-2|poly
S₂O₃²⁻|Tiyosülfat iyonu|-2|poly
O₂²⁻|Peroksit iyonu|-2|poly
NaCl|Sodyum klorür||ionic
KBr|Potasyum bromür||ionic
MgO|Magnezyum oksit||ionic
CaCl₂|Kalsiyum klorür||ionic
Al₂O₃|Alüminyum oksit||ionic
FeCl₂|Demir(II) klorür||ionic
FeCl₃|Demir(III) klorür||ionic
CuCl|Bakır(I) klorür||ionic
CuCl₂|Bakır(II) klorür||ionic
FeO|Demir(II) oksit||ionic
Fe₂O₃|Demir(III) oksit||ionic
Cu₂O|Bakır(I) oksit||ionic
CuO|Bakır(II) oksit||ionic
Na₂SO₄|Sodyum sülfat||ionic
Na₂SO₃|Sodyum sülfit||ionic
NaNO₃|Sodyum nitrat||ionic
NaNO₂|Sodyum nitrit||ionic
CaCO₃|Kalsiyum karbonat||ionic
NaHCO₃|Sodyum hidrojen karbonat||ionic
Al₂(SO₄)₃|Alüminyum sülfat||ionic
Fe₂(SO₄)₃|Demir(III) sülfat||ionic
FeSO₄|Demir(II) sülfat||ionic
CuSO₄|Bakır(II) sülfat||ionic
CuSO₃|Bakır(II) sülfit||ionic
Ca₃(PO₄)₂|Kalsiyum fosfat||ionic
(NH₄)₂SO₄|Amonyum sülfat||ionic
NH₄NO₃|Amonyum nitrat||ionic
KMnO₄|Potasyum permanganat||ionic
K₂Cr₂O₇|Potasyum dikromat||ionic
NaOH|Sodyum hidroksit||base
KOH|Potasyum hidroksit||base
Ca(OH)₂|Kalsiyum hidroksit||base
Ba(OH)₂|Baryum hidroksit||base
HCl|Hidroklorik asit||acid
HBr|Hidrobromik asit||acid
HI|Hidroiyodik asit||acid
HNO₃|Nitrik asit||acid
HNO₂|Nitröz asit||acid
H₂SO₄|Sülfürik asit||acid
H₂SO₃|Sülfüröz asit||acid
H₃PO₄|Fosforik asit||acid
H₂CO₃|Karbonik asit||acid
CH₃COOH|Asetik asit||acid
CO|Karbon monoksit||molecular
CO₂|Karbon dioksit||molecular
NO|Azot monoksit||molecular
NO₂|Azot dioksit||molecular
N₂O|Diazot monoksit||molecular
N₂O₄|Diazot tetraoksit||molecular
SO₂|Kükürt dioksit||molecular
SO₃|Kükürt trioksit||molecular
PCl₃|Fosfor triklorür||molecular
PCl₅|Fosfor pentaklorür||molecular
SF₆|Kükürt hekzaflorür||molecular
CuSO₄·5H₂O|Bakır(II) sülfat pentahidrat||hydrate
CoCl₂·6H₂O|Kobalt(II) klorür hekzahidrat||hydrate
Na₂CO₃·10H₂O|Sodyum karbonat dekahidrat||hydrate
CH₄|Metan||organic
C₂H₆|Etan||organic
C₃H₈|Propan||organic
C₄H₁₀|Bütan||organic
C₂H₄|Eten||organic
C₃H₆|Propen||organic
C₂H₂|Etin||organic
CH₃OH|Metanol||organic
C₂H₅OH|Etanol||organic
CH₃CHO|Etanal||organic
CH₃COCH₃|Propanon (aseton)||organic
CH₃CH₂COOH|Propanoik asit||organic
CH₃OCH₃|Dimetil eter||organic
CH₃CH₂NH₂|Etanamin||organic`;
const db=raw.split('\n').map((r,i)=>{let [formula,name,charge,group]=r.split('|');return {id:i,formula,name,charge:charge?Number(charge):null,group}});

// Generated combinations express charge-balanced FORMAL formulas, not proof of stability, isolability, or solubility.
// Ionic combinations are generated from a controlled set of commonly taught ions.
// All subscripts are computed by the least-common-multiple of ionic charge magnitudes.
const subs=['₀','₁','₂','₃','₄','₅','₆','₇','₈','₉'];
const sub=n=>String(n).split('').map(d=>subs[+d]).join('');
const gcd=(a,b)=>b?gcd(b,a%b):a;
const cat=[
 ['Li',1,'Lityum'],['Na',1,'Sodyum'],['K',1,'Potasyum'],['Rb',1,'Rubidyum'],['Cs',1,'Sezyum'],['Ag',1,'Gümüş'],
 ['Mg',2,'Magnezyum'],['Ca',2,'Kalsiyum'],['Sr',2,'Stronsiyum'],['Ba',2,'Baryum'],['Zn',2,'Çinko'],['Cd',2,'Kadmiyum'],
 ['Al',3,'Alüminyum'],['Fe',2,'Demir(II)'],['Fe',3,'Demir(III)'],['Cu',1,'Bakır(I)'],['Cu',2,'Bakır(II)'],
 ['Co',2,'Kobalt(II)'],['Co',3,'Kobalt(III)'],['Ni',2,'Nikel(II)'],['Sn',2,'Kalay(II)'],['Sn',4,'Kalay(IV)'],
 ['Pb',2,'Kurşun(II)'],['Pb',4,'Kurşun(IV)'],['Cr',3,'Krom(III)'],['Mn',2,'Mangan(II)'],['NH₄',1,'Amonyum']];
const an=[
 ['F',1,'florür',false],['Cl',1,'klorür',false],['Br',1,'bromür',false],['I',1,'iyodür',false],
 ['O',2,'oksit',false],['S',2,'sülfür',false],['N',3,'nitrür',false],
 ['OH',1,'hidroksit',true],['NO₃',1,'nitrat',true],['NO₂',1,'nitrit',true],
 ['SO₄',2,'sülfat',true],['SO₃',2,'sülfit',true],['CO₃',2,'karbonat',true],
 ['HCO₃',1,'hidrojen karbonat',true],['PO₄',3,'fosfat',true],['HPO₄',2,'hidrojen fosfat',true],
 ['H₂PO₄',1,'dihidrojen fosfat',true],['ClO',1,'hipoklorit',true],['ClO₂',1,'klorit',true],
 ['ClO₃',1,'klorat',true],['ClO₄',1,'perklorat',true],['MnO₄',1,'permanganat',true],
 ['CrO₄',2,'kromat',true],['Cr₂O₇',2,'dikromat',true],['C₂O₄',2,'oksalat',true],
 ['S₂O₃',2,'tiyosülfat',true],['CN',1,'siyanür',true],['CH₃COO',1,'asetat',true]];
function ionicFormula(c,a){const n=a[1]/gcd(c[1],a[1]),m=c[1]/gcd(c[1],a[1]);
 const part=(f,k,poly)=>k===1?f:(poly?'('+f+')':f)+sub(k);
 return part(c[0],n,c[0]==='NH₄')+part(a[0],m,a[3]);}
const existing=new Set(db.map(x=>x.formula));
for(const c of cat)for(const a of an){
 // Avoid chemically atypical combinations: silver oxide/hydroxide and several high-valence salts.
 if(c[0]==='Ag'&&['OH','O','S','N'].includes(a[0]))continue;
 if(c[0]==='NH₄'&&['O','N','OH'].includes(a[0]))continue;
 if(['Sn','Pb'].includes(c[0])&&c[1]===4&&['O','S','N','OH'].includes(a[0]))continue;
 const formula=ionicFormula(c,a);if(existing.has(formula))continue;
 const name=c[2]+' '+a[2];db.push({id:'g'+db.length,formula,name,charge:null,group:a[0]==='OH'?'base':'ionic',cation:c,anion:a});existing.add(formula);
}
const extra=[
 ['oxid','Fe₂O₃ bileşiğinde Fe yükseltgenme basamağı kaçtır?','+3',['+2','+3','+4','−3'],'Oksijen genellikle −2 olur; 3 oksijen toplam −6, iki Fe toplam +6.'],
 ['oxid','KMnO₄ bileşiğinde Mn yükseltgenme basamağı kaçtır?','+7',['+2','+4','+6','+7'],'K +1, dört O toplam −8 olduğundan Mn +7 olur.'],
 ['oxid','H₂SO₄ bileşiğinde S yükseltgenme basamağı kaçtır?','+6',['+4','+6','−2','+2'],'H toplam +2, O toplam −8; S +6 olmalıdır.'],
 ['oxid','Cr₂O₇²⁻ iyonunda Cr yükseltgenme basamağı kaçtır?','+6',['+3','+5','+6','+7'],'Yedi O −14, iyon yükü −2; iki Cr toplam +12.'],
 ['lewis','NH₃ molekülünde merkez atomda kaç ortaklanmamış elektron çifti vardır?','1',['0','1','2','3'],'Azot 5 değerlik elektronu taşır; üç N–H bağı ve bir yalnız çift oluşturur.'],
 ['lewis','CH₄ molekülünde karbonun hibritleşmesi nedir?','sp³',['sp','sp²','sp³','dsp²'],'Karbon dört sigma bağ yapar; tetrahedral düzen sp³.'],
 ['lewis','C₂H₄ molekülünde toplam kaç π bağı vardır?','1',['0','1','2','3'],'C=C çift bağında bir sigma, bir pi bağı bulunur.'],
 ['lewis','CO₂ molekülünün geometrisi nedir?','Doğrusal',['Doğrusal','Açısal','Üçgen düzlem','Tetrahedral'],'Merkez karbon çevresinde iki elektron bölgesi vardır.'],
 ['lewis','H₂O molekülünün geometrisi nedir?','Açısal',['Doğrusal','Açısal','Üçgen düzlem','Tetrahedral'],'Oksijende iki bağ ve iki yalnız çift vardır.'],
 ['lewis','NH₄⁺ iyonunun toplam formal yükü kaçtır?','+1',['−1','0','+1','+2'],'İyonun formal yükleri toplamı net iyon yüküne eşittir.'],
 ['periodic','Na elementinin atom numarası kaçtır?','11',['10','11','12','19'],'Sodyumun atom numarası 11’dir.'],
 ['periodic','Cl hangi gruptadır?','17',['1','2','16','17'],'Klor halojendir; 17. grupta yer alır.'],
 ['periodic','Mg hangi periyottadır?','3',['2','3','4','5'],'Magnezyumun elektron dizilimi 3. enerji düzeyinde biter.'],
 ['periodic','Ne hangi element sınıfındadır?','Soy gaz',['Alkali metal','Halojen','Soy gaz','Geçiş metali'],'Neon 18. grup soy gazıdır.'],
 ['periodic','Al elementinin yaygın iyon yükü kaçtır?','+3',['+1','+2','+3','−3'],'Alüminyum yaygın olarak Al³⁺ katyonu oluşturur.']
].map(([group,prompt,correct,options,explanation],i)=>({id:'x'+i,group,prompt,correct,options,explanation}));
// Verified, rule-based supplementary conceptual exercises (no randomized chemistry facts).
const supplemental=[];
const roman=n=>({1:'I',2:'II',3:'III',4:'IV',5:'V',6:'VI',7:'VII'})[n];
for(const c of cat.filter(c=>['Fe','Cu','Sn','Pb','Co','Ni','Cr','Mn'].includes(c[0]))){
 const oxy=an.find(a=>a[0]==='O'),chlor=an.find(a=>a[0]==='Cl');
 for(const a of [oxy,chlor]){
  const formula=ionicFormula(c,a);
  supplemental.push({id:'ox-'+formula,group:'oxid',prompt:formula+' bileşiğinde '+c[0]+' elementinin yükseltgenme basamağı kaçtır?',correct:'+'+c[1],options:shuffle(['+1','+2','+3','+4','+5','+6'].filter(x=>x!=='+'+c[1]).sort((x,y)=>Math.abs(+x.slice(1)-c[1])-Math.abs(+y.slice(1)-c[1])).slice(0,3).concat('+'+c[1])),explanation:'Bileşik nötrdür. '+a[2]+' iyonunun yükü −'+a[1]+'; metalin yükseltgenme basamağı +'+c[1]+' olur.'});
 }
}
for(const [formula,name,charge,group] of raw.split('\n').map(r=>r.split('|')).filter(r=>r[3]==='poly')){
 const value=Number(charge),correct=(value>0?'+':'−')+Math.abs(value);
 supplemental.push({id:'polycharge-'+formula,group:'charge',prompt:name+' yükü kaçtır?',correct,options:shuffle(['−3','−2','−1','+1','+2','+3'].filter(x=>x!==correct).sort((x,y)=>Math.abs(Number(x.replace('−','-'))-value)-Math.abs(Number(y.replace('−','-'))-value)).slice(0,3).concat(correct)),explanation:name+' formülü '+formula+' ve net yükü '+correct+' olur.'});
}
const elementRows=db.filter(x=>x.group==='element');
for(let i=0;i<elementRows.length;i++){
 const e=elementRows[i],number=i+1;
 supplemental.push({id:'atomic-'+number,group:'periodic',prompt:e.name+' elementinin atom numarası kaçtır?',correct:String(number),options:shuffle([...new Set([String((number+115)%118+1),String(number%118+1),String((number+1)%118+1),String((number+2)%118+1)].filter(x=>x!==String(number)))].slice(0,3).concat(String(number))),explanation:e.name+' ('+e.formula+') atom numarası '+number+' olan elementtir.'});
}
extra.push(...supplemental);
// Additional hand-authored conceptual exercises; answers and explanations reviewed for internal consistency.
const curatedConcepts = [
 ['lewis','HCN molekülünde merkez karbonun hibritleşmesi nedir?','sp',['sp','sp²','sp³','sp³d'],'H–C≡N yapısında karbonun iki elektron bölgesi vardır.'],
 ['lewis','C₂H₂ molekülünde toplam kaç π bağı bulunur?','2',['0','1','2','3'],'C≡C üçlü bağında bir sigma ve iki pi bağı bulunur.'],
 ['lewis','C₂H₆ molekülünde toplam kaç sigma bağı bulunur?','7',['5','6','7','8'],'Altı C–H ve bir C–C bağı sigma bağıdır.'],
 ['lewis','CO₂ molekülünde toplam kaç π bağı vardır?','2',['0','1','2','4'],'İki C=O çift bağının her birinde bir pi bağı bulunur.'],
 ['lewis','NH₄⁺ iyonunda azotun formal yükü kaçtır?','+1',['−1','0','+1','+2'],'Azot dört bağ yapar ve yalnız çift taşımaz: 5−4=+1.'],
 ['lewis','H₃O⁺ iyonunda oksijenin formal yükü kaçtır?','+1',['−1','0','+1','+2'],'Oksijen üç bağ ve bir yalnız çift taşır: 6−2−3=+1.'],
 ['lewis','BF₃ molekülünün merkez atom geometrisi nedir?','Üçgen düzlem',['Doğrusal','Üçgen düzlem','Tetrahedral','Açısal'],'Bor çevresinde üç bağ bölgesi vardır ve yalnız çift yoktur.'],
 ['lewis','PCl₅ molekülünün molekül geometrisi nedir?','Üçgen çift piramit',['Tetrahedral','Oktahedral','Üçgen çift piramit','Kare düzlem'],'Fosfor çevresinde beş bağ bölgesi bulunur.'],
 ['lewis','SF₆ molekülünün molekül geometrisi nedir?','Oktahedral',['Tetrahedral','Oktahedral','Üçgen düzlem','Açısal'],'Kükürt çevresinde altı bağ bölgesi vardır.'],
 ['lewis','NO₃⁻ iyonunun eşdeğer temel rezonans yapısı sayısı kaçtır?','3',['1','2','3','4'],'Çift bağ üç oksijenden herhangi birine yerleşebilir.'],
 ['organic','CH₃CH₂OH bileşiğinin fonksiyonel grubu hangisidir?','Alkol',['Eter','Alkol','Aldehit','Keton'],'Etanol hidroksil (–OH) grubu taşır.'],
 ['organic','CH₃CHO bileşiğinin fonksiyonel grubu hangisidir?','Aldehit',['Aldehit','Keton','Ester','Eter'],'Uçtaki –CHO grubu aldehittir.'],
 ['organic','CH₃COCH₃ bileşiğinin fonksiyonel grubu hangisidir?','Keton',['Alkol','Aldehit','Keton','Karboksilik asit'],'Karbonil karbonu iki karbona bağlıdır.'],
 ['organic','CH₃COOH bileşiğinin fonksiyonel grubu hangisidir?','Karboksilik asit',['Ester','Amin','Karboksilik asit','Eter'],'–COOH karboksil grubudur.'],
 ['organic','CH₃OCH₃ bileşiğinin fonksiyonel grubu hangisidir?','Eter',['Alkol','Eter','Keton','Amin'],'Oksijen iki karbon grubuna bağlıdır.'],
 ['organic','CH₃COOCH₃ bileşiğinin fonksiyonel grubu hangisidir?','Ester',['Ester','Eter','Aldehit','Amin'],'–COO– ester bağlantısıdır.'],
 ['organic','CH₃CH₂NH₂ bileşiğinin fonksiyonel grubu hangisidir?','Amin',['Amid','Amin','Nitril','Nitro'],'Azot bir karbon grubuna bağlı primer amin oluşturur.'],
 ['organic','CH₃CH₂CH₃ bileşiğinin IUPAC adı nedir?','Propan',['Propan','Propen','Propin','Bütan'],'Üç karbonlu doymuş açık zincirli alkandır.'],
 ['organic','CH₂=CHCH₃ bileşiğinin IUPAC adı nedir?','Propen',['Propan','Propen','Propin','Etan'],'Üç karbon ve bir çift bağ içerir.'],
 ['organic','CH₃CH(CH₃)CH₃ bileşiğinin IUPAC adı nedir?','2-Metilpropan',['Bütan','2-Metilpropan','2-Metilbütan','Propen'],'En uzun zincir üç karbonludur; ikinci karbonda metil vardır.'],
 ['organic','CH₃CH₂CH₂OH bileşiğinin IUPAC adı nedir?','Propan-1-ol',['Propan-1-ol','Propan-2-ol','Propanal','Propanon'],'Hidroksil uç karbona bağlıdır.'],
 ['organic','CH₃CH(OH)CH₃ bileşiğinin IUPAC adı nedir?','Propan-2-ol',['Propan-1-ol','Propan-2-ol','Propanal','Propanon'],'Hidroksil ikinci karbona bağlıdır.'],
 ['organic','CH₃CH₂COOH bileşiğinin IUPAC adı nedir?','Propanoik asit',['Etanoik asit','Propanoik asit','Bütanoik asit','Propanal'],'Karboksil karbonu dahil toplam üç karbon bulunur.'],
 ['organic','C₆H₆ bileşiğinin yaygın adı nedir?','Benzen',['Siklohekzan','Benzen','Hekzan','Toluen'],'C₆H₆ aromatik halkası benzendir.'],
 ['organic','Benzenin nitrasyonunda etkin elektrofil hangisidir?','NO₂⁺',['NO₃⁻','NO₂⁻','NO₂⁺','NH₄⁺'],'Nitrasyonun etkin elektrofil türü nitronyum iyonudur.'],
 ['organic','Bir alkenin HBr katılması hangi temel tepkime sınıfındadır?','Katılma',['Eliminasyon','Katılma','Yer değiştirme','Yanma'],'Çift bağ açılarak iki yeni sigma bağı oluşur.']
];
extra.push(...curatedConcepts.map(([group,prompt,correct,options,explanation],i)=>({id:'c'+i,group,prompt,correct,options,explanation})));

// Additional reviewed organic and bonding practice. Each option set contains one correct answer.
const advancedConcepts=[
['organic','CH₃CH₂CH₂CH₃ için doğru ad hangisidir?','Bütan',['Bütan','Büten','Bütin','2-Metilpropan'],'Dört karbonlu, yalnız tek bağ içeren düz zincirli alkan bütandır.'],
['organic','CH₃CH=CHCH₃ için doğru ad hangisidir?','Büt-2-en',['Büt-1-en','Büt-2-en','Bütan','Büt-2-in'],'Çift bağ ikinci ve üçüncü karbon arasındadır.'],
['organic','CH₃C≡CH için doğru ad hangisidir?','Propin',['Propan','Propen','Propin','Etin'],'Üç karbonlu molekülde üçlü bağ bulunur.'],
['organic','CH₃CH₂CH₂CHO için doğru ad hangisidir?','Bütanal',['Bütanon','Bütanal','Bütanol','Bütanoik asit'],'Uçtaki –CHO grubu aldehit, toplam dört karbon vardır.'],
['organic','CH₃CH₂COCH₃ için doğru ad hangisidir?','Bütan-2-on',['Bütan-1-ol','Bütanal','Bütan-2-on','Bütanoik asit'],'Karbonil grubu zincirin ikinci karbonundadır.'],
['organic','CH₃CH₂COOCH₃ hangi bileşik sınıfındadır?','Ester',['Eter','Ester','Keton','Amin'],'–COO– bağlantısı ester fonksiyonel grubudur.'],
['organic','CH₃CH₂CH₂COOH bileşiğinin adı nedir?','Bütanoik asit',['Propanoik asit','Bütanal','Bütanoik asit','Bütan-1-ol'],'Karboksil karbonu da sayılır: toplam dört karbon.'],
['organic','CH₃CH₂Br bileşiğinin adı nedir?','Bromoetan',['Bromometan','Bromoetan','1-Bromopropan','Etanol'],'İki karbonlu etan zincirinde brom bulunur.'],
['organic','CH₃CH(Cl)CH₃ bileşiğinin adı nedir?','2-Kloropropan',['1-Kloropropan','2-Kloropropan','2-Klorobütan','Klorometan'],'Klor ikinci karbona bağlıdır.'],
['organic','CH₃CH₂CH(CH₃)CH₃ için doğru ad nedir?','2-Metilbütan',['3-Metilbütan','2-Metilbütan','2-Metilpentan','Pentan'],'En uzun zincir dört karbonludur ve dallanma 2. karbondadır.'],
['organic','CH₃CH(CH₃)CH(CH₃)CH₃ için doğru ad nedir?','2,3-Dimetilbütan',['2,2-Dimetilbütan','2,3-Dimetilbütan','3,3-Dimetilbütan','2-Metilpentan'],'Dört karbonlu ana zincirde 2 ve 3 konumlarında metil grubu bulunur.'],
['organic','Birincil alkolün oksidasyonuyla uygun koşullarda ilk hangi sınıf oluşabilir?','Aldehit',['Keton','Eter','Aldehit','Alken'],'Birincil alkol kontrollü oksidasyonla aldehit verebilir.'],
['organic','İkincil alkolün oksidasyonuyla genellikle hangi sınıf oluşur?','Keton',['Aldehit','Keton','Ester','Eter'],'İkincil alkoller oksidasyonla ketona dönüşür.'],
['organic','Alkenlere H₂/Ni uygulanması hangi dönüşümdür?','Hidrojenasyon',['Nitrasyon','Hidrojenasyon','Halojenleme','Dehidrasyon'],'Çift bağa hidrojen katılarak alkan elde edilir.'],
['organic','CH₃CH₂CN bileşiğinde hangi fonksiyonel grup bulunur?','Nitril',['Amin','Amid','Nitril','Nitro'],'–C≡N nitril grubudur.'],
['organic','CH₃CONH₂ hangi fonksiyonel grubu taşır?','Amid',['Amin','Amid','Ester','Nitril'],'Karbonil karbonuna doğrudan bağlı –NH₂ amid grubudur.'],
['organic','Benzenin HNO₃/H₂SO₄ ile tepkimesinin ana ürünü nedir?','Nitrobenzen',['Anilin','Nitrobenzen','Toluen','Fenol'],'Elektrofilik aromatik yer değiştirme sonucu nitrobenzen oluşur.'],
['organic','2-Bromopropan + alkollü KOH, ısı koşullarında baskın dönüşüm hangisidir?','Eliminasyon',['Katılma','Eliminasyon','Polimerleşme','Yanma'],'Alkollü baz ve ısı çoğunlukla E2 eliminasyonunu destekler.'],
['organic','Bir alkenin bromlu suyun rengini gidermesinin temel nedeni nedir?','Br₂ katılması',['Br₂ katılması','Yanma','Nötralleşme','Çökelme'],'Brom çift bağa katılabilir.'],
['organic','2-Metilpropen + HBr (peroksitsiz) ana ürünü nedir?','2-Bromo-2-metilpropan',['1-Bromo-2-metilpropan','2-Bromo-2-metilpropan','2-Metilpropan-1-ol','2-Bromobütan'],'Markovnikov katılmasında daha kararlı tersiyer karbokatyon yolu tercih edilir.'],
['lewis','O₂ molekülünün yaygın Lewis gösteriminde bağ mertebesi kaçtır?','2',['1','2','3','0'],'O=O çift bağı bulunur.'],
['lewis','N₂ molekülünde iki azot arasında kaç π bağı vardır?','2',['0','1','2','3'],'N≡N üçlü bağının ikisi π, biri σ bağıdır.'],
['lewis','BF₃ merkez bor atomunun Lewis yapısında kaç bağ çifti bulunur?','3',['2','3','4','1'],'Bor üç B–F tek bağı kurar.'],
['lewis','H₂O molekülünde oksijen üzerinde kaç yalnız elektron çifti vardır?','2',['0','1','2','3'],'Oksijen iki O–H bağı kurar, iki yalnız çift taşır.'],
['lewis','CO₃²⁻ iyonunun eşdeğer temel rezonans yapısı sayısı kaçtır?','3',['1','2','3','4'],'C=O çift bağı üç oksijen arasında yer değiştirebilir.'],
['lewis','NH₃ molekülünde merkez atomun elektron bölgesi geometrisi nedir?','Tetrahedral',['Doğrusal','Üçgen düzlem','Tetrahedral','Oktahedral'],'Üç bağ çifti ve bir yalnız çift toplam dört elektron bölgesi oluşturur.'],
['lewis','BeCl₂ gaz fazında merkez atom çevresindeki bağ açısı yaklaşık kaç derecedir?','180°',['90°','109,5°','120°','180°'],'İki bağ bölgesi doğrusal düzen oluşturur.'],
['lewis','CH₄ molekülündeki H–C–H bağ açısı yaklaşık kaç derecedir?','109,5°',['90°','109,5°','120°','180°'],'Tetrahedral geometrinin ideal açısı yaklaşık 109,5°dir.'],
['lewis','C₂H₄ molekülündeki her karbonun hibritleşmesi nedir?','sp²',['sp','sp²','sp³','sp³d'],'Çift bağlı karbon çevresinde üç elektron bölgesi vardır.'],
['lewis','CH₃OH molekülünde karbonun hibritleşmesi nedir?','sp³',['sp','sp²','sp³','sp³d'],'Karbon dört sigma bağı kurar.']
];
extra.push(...advancedConcepts.map(([group,prompt,correct,options,explanation],i)=>({id:'a'+i,group,prompt,correct,options,explanation})));
const lewisDiagrams={
'NH₃':'<svg viewBox="0 0 240 155" role="img" aria-label="NH3 Lewis: azotta bir yalnız çift ve üç tek bağ"><g stroke="currentColor" stroke-width="3"><path d="M120 76 L120 122 M110 67 L68 42 M130 67 L172 42"/></g><g fill="currentColor" text-anchor="middle" font-size="24" font-weight="700"><text x="120" y="77">N</text><text x="120" y="145">H</text><text x="51" y="41">H</text><text x="189" y="41">H</text><circle cx="115" cy="30" r="3"/><circle cx="125" cy="30" r="3"/></g></svg>',
'H₂O':'<svg viewBox="0 0 240 150" role="img" aria-label="H2O Lewis: oksijende iki yalnız çift"><g stroke="currentColor" stroke-width="3"><path d="M105 81 L63 111 M135 81 L177 111"/></g><g fill="currentColor" text-anchor="middle" font-size="24" font-weight="700"><text x="120" y="81">O</text><text x="51" y="131">H</text><text x="189" y="131">H</text><circle cx="110" cy="37" r="3"/><circle cx="122" cy="37" r="3"/><circle cx="82" cy="66" r="3"/><circle cx="82" cy="78" r="3"/></g></svg>',
'CO₂':'<svg viewBox="0 0 260 120" role="img" aria-label="CO2 Lewis: O çift bağ C çift bağ O"><g stroke="currentColor" stroke-width="3"><path d="M80 50 H112 M80 61 H112 M150 50 H182 M150 61 H182"/></g><g fill="currentColor" text-anchor="middle" font-size="25" font-weight="700"><text x="60" y="65">O</text><text x="131" y="65">C</text><text x="203" y="65">O</text></g><g fill="currentColor"><circle cx="51" cy="23" r="3"/><circle cx="63" cy="23" r="3"/><circle cx="51" cy="91" r="3"/><circle cx="63" cy="91" r="3"/><circle cx="197" cy="23" r="3"/><circle cx="209" cy="23" r="3"/><circle cx="197" cy="91" r="3"/><circle cx="209" cy="91" r="3"/></g></svg>',
'CH₄':'<svg viewBox="0 0 240 155" role="img" aria-label="CH4 Lewis: karbon dört tek bağ"><g stroke="currentColor" stroke-width="3"><path d="M120 55 V25 M120 80 V118 M104 68 H64 M136 68 H176"/></g><g fill="currentColor" text-anchor="middle" font-size="24" font-weight="700"><text x="120" y="77">C</text><text x="120" y="20">H</text><text x="120" y="145">H</text><text x="48" y="77">H</text><text x="193" y="77">H</text></g></svg>'
};
const modes=[['mix','🎲 Karma test','Tüm kategoriler'],['element','⚛️ Element tanıma','Sembol ve ad'],['charge','⚡ İyon yükleri','Yük ayrımı'],['ion','🧪 İyon isimleri','Tek/çok atomlu'],['ionic','🧩 Bileşik adları','Akıllı çeldiriciler'],['builder','🔧 Formül oluştur','İyonları dengele'],['organic','🌿 Organik','Temel isimlendirme'],['oxid','⚖️ Yükseltgenme','Basamak hesapla'],['lewis','🔗 Lewis ve bağlar','Hibritleşme, geometri'],['periodic','🗂️ Periyodik tablo','Grup ve periyot'],['typing','⌨️ Şıksız cevap','Kendin yaz'],['speed','⏱️ Hızlı cevap','60 saniye'],['review','🧠 Akıllı tekrar','Yanlış ve zamanı gelen'],['mastery','🏆 Ustalık','Öğrenilenleri pekiştir']];
const $=s=>document.querySelector(s), all=(s)=>[...document.querySelectorAll(s)];
let state;try{state=JSON.parse(localStorage.getItem('kimyalab-state'))||{}}catch{state={}};state.records??={};state.xp??=0;
function save(){localStorage.setItem('kimyalab-state',JSON.stringify(state))}
function normalize(s){return String(s).replace(/[₀-₉]/g,c=>String('₀₁₂₃₄₅₆₇₈₉'.indexOf(c))).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g,c=>String('⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c))).replace(/⁺/g,'+').replace(/⁻/g,'-').replace(/−/g,'-').toLocaleLowerCase('tr-TR').replace(/[\s()\-.,]/g,'').replace(/ı/g,'i').replace(/ü/g,'u').replace(/ö/g,'o').replace(/ş/g,'s').replace(/ç/g,'c').replace(/ğ/g,'g')}
function distractors(entry,field,pool){
 let others=pool.filter(x=>x.id!==entry.id&&x[field]!==entry[field]);
 let ranked=others.map(x=>{
  let score=0;
  if(entry.cation&&x.cation){
   if(x.cation[0]===entry.cation[0])score+=8;
   if(x.cation[2]===entry.cation[2])score+=4;
   if(x.anion[0]===entry.anion[0])score+=8;
   if(x.anion[2].slice(0,3)===entry.anion[2].slice(0,3))score+=3;
  }else{
   if(x.group===entry.group)score+=5;
   if(x.name.slice(0,4)===entry.name.slice(0,4))score+=3;
   if(x.formula.slice(0,2)===entry.formula.slice(0,2))score+=3;
  }
  return {x,score:score+Math.random()*0.8};
 }).sort((a,b)=>b.score-a.score);
 let chosen=[];for(const {x} of ranked){if(!chosen.includes(x[field])&&x[field]!==entry[field])chosen.push(x[field]);if(chosen.length===3)break}
 return shuffle([entry[field],...chosen]);
}
function question(entry,mode){if(entry.prompt)return {...entry,options:shuffle(entry.options),mode};let type=mode==='mix'||mode==='review'||mode==='mastery'||mode==='speed'?pick(['name','formula']):mode==='typing'?pick(['name','formula']):mode==='builder'?'formula':pick(['name','formula']);if(mode==='charge')return {id:String(entry.id)+':charge',group:'charge',prompt:entry.name+' yükü kaçtır?',correct:(entry.charge>0?'+':'−')+Math.abs(entry.charge),options:shuffle(['−3','−2','−1','+1','+2','+3','+4'].filter(x=>x!==(entry.charge>0?'+':'−')+Math.abs(entry.charge)).sort((a,b)=>Math.abs(Number(a.replace('−','-'))-entry.charge)-Math.abs(Number(b.replace('−','-'))-entry.charge)).slice(0,3).concat([(entry.charge>0?'+':'−')+Math.abs(entry.charge)])),explanation:'İyonun formülü: '+entry.formula,mode};let field=type==='name'?'name':'formula';return {id:String(entry.id)+':'+type,group:entry.group,prompt:type==='name'?entry.formula:entry.name,correct:entry[field],options:distractors(entry,field,db),explanation:mode==='builder'&&entry.cation?'Yük dengelemesi: '+entry.cation[0]+' ('+entry.cation[1]+'+) ve '+entry.anion[0]+' ('+entry.anion[1]+'−). Ortak toplam yük sıfır olmalıdır.':type==='name'?'Doğru ad: '+entry.name+'.':'Doğru formül: '+entry.formula+'.'+(entry.cation?' Bu formül iyon yüklerinin dengelenmesiyle elde edilir; bileşiğin kararlı veya izole edilebilir olduğu anlamına gelmez.':''),mode,entry}}
function poolFor(mode){if(mode==='charge')return db.filter(x=>x.charge!==null);if(mode==='element')return db.filter(x=>x.group==='element');if(mode==='ion')return db.filter(x=>['ion','poly'].includes(x.group));if(mode==='builder')return db.filter(x=>x.cation&&x.anion);if(mode==='ionic')return db.filter(x=>['ionic','base','acid','molecular','hydrate'].includes(x.group));if(mode==='organic')return [...db,...extra].filter(x=>x.group==='organic');if(mode==='oxid'||mode==='lewis'||mode==='periodic')return extra.filter(x=>x.group===mode);if(mode==='review'||mode==='mastery'){let now=Date.now();let ids=Object.keys(state.records).filter(k=>mode==='review'?state.records[k].due<=now:state.records[k].streak>=2);let list=[...db,...extra].filter(x=>ids.some(k=>k===String(x.id)||k.startsWith(String(x.id)+':')));return list}return [...db,...extra]}
let session=null,timeout=null,ticker=null;
function page(name){all('nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===name));all('main>section').forEach(x=>x.classList.add('hide'));$('#'+name).classList.remove('hide');if(name==='home')home();if(name==='stats')stats();if(name==='dictionary')dictionary()}
function home(){let r=Object.values(state.records),mastered=r.filter(x=>x.streak>=3).length;$('#points').textContent=state.xp+' XP';$('#summary').textContent=r.length+' farklı soru çalışıldı · '+mastered+' ustalaşılan · '+r.filter(x=>x.due<=Date.now()).length+' tekrar bekliyor';$('#progress').value=Math.min(100,Math.round(mastered/(db.length+extra.length)*100));$('#progresslabel').textContent='%'+$('#progress').value;$('#modes').innerHTML=modes.map(([id,title,desc])=>`<button class="tile" data-mode="${id}">${title}<small>${desc}</small></button>`).join('');all('[data-mode]').forEach(b=>b.onclick=()=>start(b.dataset.mode))}
function start(mode){clearInterval(ticker);let pool=poolFor(mode),difficulty=$('#difficulty').value;if(difficulty==='easy')pool=pool.filter(x=>!['oxid','lewis'].includes(x.group));if(difficulty==='hard')pool=pool.filter(x=>x.group!=='element');if(difficulty==='medium')pool=pool.filter(x=>x.group!=='element'||mode==='element');if(!pool.length){alert(mode==='review'?'Şu an tekrar zamanı gelen soru yok.':'Bu ayarda soru bulunamadı.');return}let count=mode==='speed'?pool.length:Number($('#count').value);let items=shuffle(pool).slice(0,Math.min(count,pool.length));session={mode,items,at:0,correct:0,answered:false,started:Date.now(),deadline:mode==='speed'?Date.now()+60000:null};page('game');if(mode==='speed'){ticker=setInterval(()=>{if(!session)return clearInterval(ticker);const remaining=Math.max(0,Math.ceil((session.deadline-Date.now())/1000));$('#timer').textContent=remaining+' sn';if(!remaining)finish()},250)}else $('#timer').textContent='';show()}
function show(){if(!session)return;if(session.at>=session.items.length||session.deadline&&Date.now()>=session.deadline)return finish();let q=question(session.items[session.at],session.mode);session.q=q;session.answered=false;$('#counter').textContent=(session.at+1)+' / '+session.items.length;$('#gameprogress').value=Math.round(session.at/session.items.length*100);$('#score').textContent=session.correct+' doğru';$('#category').textContent=modes.find(m=>m[0]===session.mode)?.[1]||q.group;$('#prompt').textContent=q.prompt;$('#instruction').textContent=session.mode==='typing'?'Cevabı yaz ve kontrol et.':session.mode==='builder'?'İyon yüklerini dengele, formülü kendin oluştur.':'Doğru cevabı seç.';$('#feedback').innerHTML='';$('#next').classList.add('hide');const visual=$('#lewisvisual');visual.innerHTML='';const diagramKey=Object.keys(lewisDiagrams).find(k=>q.prompt.includes(k));if(q.group==='lewis'&&diagramKey){visual.innerHTML=lewisDiagrams[diagramKey];visual.classList.remove('hide')}else visual.classList.add('hide');let area=$('#answers');area.innerHTML='';if(session.mode==='typing'||session.mode==='builder'){if(session.mode==='builder'&&q.entry?.cation){const hint=document.createElement('div');hint.className='ion-hint';hint.textContent='Katyon: '+q.entry.cation[0]+' ('+q.entry.cation[1]+'+)   •   Anyon: '+q.entry.anion[0]+' ('+q.entry.anion[1]+'−)';area.append(hint)}let inp=document.createElement('input');inp.placeholder=session.mode==='builder'?'Bileşiğin formülünü yaz (örn. Al2(SO4)3)':'Cevabın';inp.setAttribute('autocomplete','off');inp.setAttribute('autocapitalize','off');inp.id='typed';let b=document.createElement('button');b.className='primary wide';b.textContent='Kontrol et';b.onclick=()=>{if(inp.value.trim())respond(inp.value)};inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&inp.value.trim())respond(inp.value)});area.append(inp,b)}else{q.options.forEach(v=>{let b=document.createElement('button');b.className='answer';b.textContent=v;b.onclick=()=>respond(v);area.append(b)})}if(session.deadline){clearTimeout(timeout);timeout=setTimeout(()=>{if(session)finish()},Math.max(0,session.deadline-Date.now()))}}
function respond(value){if(!session||session.answered)return;session.answered=true;let q=session.q,aliases=q.group==='organic'?[]:String(q.correct).split(/\s*\([^)]*\)\s*/).filter(Boolean),ok=[q.correct,...aliases].some(v=>normalize(value)===normalize(v));if(ok){session.correct++;state.xp+=10}let key=String(q.id),r=state.records[key]||{seen:0,correct:0,streak:0,due:0};r.seen++;if(ok){r.correct++;r.streak++;r.due=Date.now()+[0,86400000,3*86400000,7*86400000,14*86400000][Math.min(4,r.streak)]}else{r.streak=0;r.due=Date.now()}state.records[key]=r;save();all('.answer').forEach(b=>{b.disabled=true;if(normalize(b.textContent)===normalize(q.correct))b.classList.add('correct');else if(normalize(b.textContent)===normalize(value))b.classList.add('wrong')});$('#feedback').innerHTML=`<b style="color:${ok?'#5be2b2':'#ff929d'}">${ok?'✓ Doğru!':'✕ Yanlış'}</b><p>Doğru cevap: <b>${q.correct}</b></p><p class="muted">${q.explanation}</p>`;$('#next').classList.remove('hide');if(session.deadline&&Date.now()>=session.deadline)finish()}
function finish(){clearTimeout(timeout);clearInterval(ticker);if(!session)return;let s=session;session=null;$('#gameprogress').value=100;$('#prompt').textContent='Test tamamlandı!';$('#category').textContent='Sonuç';$('#instruction').textContent='';$('#answers').innerHTML='';$('#feedback').innerHTML=`<h2>${s.correct} doğru / ${Math.min(s.items.length,s.at+(s.answered?1:0))} cevap</h2><p>Yanlışların akıllı tekrar listesine eklendi.</p><button class="primary wide" id="again">Ana ekrana dön</button>`;$('#again').onclick=()=>page('home');$('#next').classList.add('hide')}
$('#next').onclick=()=>{session.at++;show()};$('#exit').onclick=()=>{clearTimeout(timeout);clearInterval(ticker);session=null;page('home')};all('nav button').forEach(b=>b.onclick=()=>{clearTimeout(timeout);clearInterval(ticker);session=null;page(b.dataset.page)});
function dictionary(){let term=normalize($('#search').value),matches=db.filter(x=>normalize(x.name+' '+x.formula).includes(term)).slice(0,90);$('#entries').innerHTML=matches.map(x=>`<div class="panel"><b>${x.formula}</b> — ${x.name}<br><small class="muted">${x.group}${x.cation?' · Yük dengesiyle oluşturulan formül (kararlılık/çözünürlük doğrulanmadı)':''}${x.charge!==null?' · Yük: '+(x.charge>0?'+':'')+x.charge:''}</small></div>`).join('')||'<p>Sonuç yok.</p>'}$('#search').oninput=dictionary;
function stats(){let r=Object.entries(state.records),wrong=r.filter(([k,v])=>v.seen>v.correct).sort((a,b)=>(b[1].seen-b[1].correct)-(a[1].seen-a[1].correct));let byid=new Map([...db,...extra].map(x=>[String(x.id),x]));const sourceFor=k=>byid.get(k)||byid.get(k.replace(/:(name|formula|charge)$/,''));$('#statcontent').innerHTML=`<div class="panel">Toplam cevap: ${r.reduce((s,[k,v])=>s+v.seen,0)}<br>Doğru cevap: ${r.reduce((s,[k,v])=>s+v.correct,0)}<br>Ustalık (3+ seri doğru): ${r.filter(([k,v])=>v.streak>=3).length}</div><h3>Zayıf noktalar</h3>`+wrong.slice(0,20).map(([k,v])=>`<div class="panel">${sourceFor(k)?.name||sourceFor(k)?.prompt||'Soru'}<br><span class="muted">${v.correct}/${v.seen} doğru · Seri: ${v.streak}</span></div>`).join('');if(!wrong.length)$('#statcontent').innerHTML+='<p class="muted">Henüz yanlış cevap kaydedilmedi.</p>'}
$('#reset').onclick=()=>{if(confirm('Tüm ilerleme silinsin mi?')){state={records:{},xp:0};save();stats()}};
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').catch(()=>{});
home();

if(typeof window!=='undefined')window.WB_DIAGNOSTICS={db,extra,ionicFormula,cat,an,poolFor,question};
