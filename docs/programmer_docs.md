# Fejlesztői dokumentáció

## Architektúra:

Frontend:
  - html, ejs, i18n
  - Bootstrap

Backend:
  - Node.js
  - Sails
  - mongodb

<p>Az alkalmazás MVC architektúrát követi. Ennek a megvalósításának az alapját a Sails js keretrendszer adja. Ennek a vázlatos felépítése látható az alábbi ábrán.</p>

<p align="center">
<img src="./assets/architecture.png">
</p>

## Backend:

<p>Az alkalmazás alapját a Sails js keretrendszer adja, ami Node.js-re épül. A félév során ezt egészítettük ki saját modellek, kontrollerek és nézetek implementálásával. Minden modell-hez tartozik kontroller is, így a Sails biztosít hozzá REST api szerű hozzáférést. Útvonalak és policyk definiálásával kötöttük ezeket a modelleket és kontrollereket nézetekhez.</p>

Itt találhatóak az előbb említett komponensek:
 - <a href="../api/controllers">Kontrollerek</a>
 - <a href="../api/models">Modellek</a>
 - <a href="../api/policies">Policyk</a>
 - <a href="../views">Nézetek</a>

### Web api:

<p>Az API leírása elérhető /docs címen.</p>
<p>Az alkalmazás REST api-szerű backend-el rendelkezik, azonban vannak eltérések. A kommunikáció nem állapotmentes, session-t használunk a bejelentkezett felhasználók nyílvántartására. </p>
<p>A modell módosítására szolgáló kéréseket a /api útvonalhoz kell címezni, természetesen a megfelelő modell nevét utánaírva. Ennek a részletesebb leírása a /docs címen található</p>

## Frontend:

<p>A korábban már említett nézetek ejs segítségével készültek el. Moduláris a felépítése, azaz a különböző nézeteken ismétlődő részeket csak egyszer írtuk meg, a többi helyen csak hivatkozunk rájuk. Ilyen például a navigációs menü, vagy a felhasználókat/csomagokat listázó részeken a listaelemek.</p>
<p>A nézetek formázásához alapvetően bootstrap-et használunk.</p>
<p>Kliens oldalon viszonylag kevés szkript található, lényegében csak a felület interaktívabbá tételéért felelős kódrészletek vannak csak. A listázások és a lekérdezések szerver oldalon történnek.</p>

### Lokalizáció:

<p>Az alkalmazás magyar és angol nyelven is meg tudja jeleníteni a szövegeket, a http kérésben küldött preferenciáknak megfelelően. Ehhez az i18n modult használjuk.</p>


## Telepítés

<p>(linuxon a sudo parancs is szükséges lehet)</p>

<p>A program telepítéséhez először az itt található repository-t kell klónozni.</p>
<p>Utána célszerű a sails-t globálisan telepíteni, de ez csak egy opcionális lépés.</p>

```
npm install -g sails
```

<p>Az összes függőség telepíthető az alábbi parancs kiadásával:</p>

```
npm install
```

<p>Futtatni az alábbi parancsok valamelyikével lehet:</p>

```
node app.js --port=80
```

```
sails lift --port=80
```

## Tesztelés

<p>Néhány kisebb tesztet is elkészítettünk a programunkhoz. Ezeket az alábbi parancs kiadásával tudjuk futtatni:</p>

```
npm test
```

