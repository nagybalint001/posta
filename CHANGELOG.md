# CHANGELOG

## it.1-2 (2017/10/03 - 2017/10/16)
- Api terv (NB)
- Sails.js szerver (BT)
- Mockupok (HB)
- Felhasználók kezelése (NB)
- Session alapú bejelentkezés (BT)

## it.3 (2017/10/17 - 2017/10/23)
- Felhasználók hozzáadása kliens oldalról (BT)
- Főoldal nézet: ejs (HB) 
- User controller: felhasználó kezelés kontroller segítségével (NB)
- Csomaglist nézet, csomag nézet, profil nézet: ejs (HB)
- Jelszavak hashelt tárolása: bcrypt használata (BT)

## it.4 (2017/10/24 - 2017/10/30)
- Auth policy: bejelentkezett, és nem bejelentkezett felhasználók jogosultságainak szabályozása (HB)
- Csomag model, controller: csomagok alapvető kezelése (NB)
- Admin policy: admin felhasználókör ellenőrzése (NB)
- Admin nézet: ejs
- Felhasználó létrehozása: bejelentkezve, csak admin felhasználó esetén (NB)
- Csomagok listázása, keresés a csomagok között, általános és részletes keresés
- Felhasználó adatainak módosítása kliens oldalról: a bejelentkezett felhasználó a profil oldalon módosíthatja saját adatait (teljes név, email, telefonszám) (HB)
- Jelszó változtatás kliens oldalról: a bejelentkezett felhasználó a profil oldalon módosíthatja saját jelszavát (BT)
- UI: aprobb javítások, fejlesztések

## it.5 (2017/10/31 - 2017/11/06)
- Lapozás: csomaglista, és a keresés eredményének lapozhatóvá tétele (BT)
- CSV exportálás: adott csomaglista exportálása .csv formátumba (HB)
- Lokalizáció: angol és magyar nyelv, alapértelmezetten angol (NB)
- Oldal nyomtatás: CSS print (HB)

## it.6 (2017/11/07 - 2017/11/13)
- Lapozás: oldalszám számításának javítása, keresés esetén (HB)
- UI: részletes keresésnél, valamint csomag felvételekor adminisztrátor és divízió választása legördülő listából, apróbb javítások...
- Adminisztrátorok és diviziók adatbázisba szervezése (NB)

## it.7 (2017/11/14 - 2017/11/20)
- Egyéb küldeménytípusok (levél, csomag, számla, ...): típústól függő beviteli mezők dinamikus változtatása
- Divíziók hozzáadása Admin felületről
- Adminisztrátorok hozzáadása Admin felületről
- Felhasználók, és adataik listázása (lapozás funkcióval)
- Admin felületről elérhető felhasználó lista
- Új csomag hozzáadásakor (üresen hagyott dátum esetén) keletkező Invalid Date hiba javítása

## it.8 (2017/11/21 - 2017/11/27)
- Néhány unit test
- Statisztikák felület
- Swagger api leírás frissítése
- Dokumentációk elkészítése
