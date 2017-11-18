# CHANGELOG

## it.1-2 (2017/10/02 - 2017/10/15)
- Api terv (NB)
- Sails.js szerver (BT)
- Mockupok (HB)
- Felhasználók kezelése (NB)
- Session alapú bejelentkezés (BT)

## it.3 (2017/10/16 - 2017/10/22)
- Felhasználók hozzáadása kliens oldalról (BT)
- Főoldal nézet: ejs (HB) 
- User controller: felhasználó kezelés kontroller segítségével (NB)
- Csomaglist nézet, csomag nézet, profil nézet: ejs (HB)
- Jelszavak hashelt tárolása: bcrypt használata (BT)

## it.4 (2017/10/13 - 2017/10/29)
- Auth policy: bejelentkezett, és nem bejelentkezett felhasználók jogosultságainak szabályozása (HB)
- Csomag model, controller: csomagok alapvető kezelése (NB)
- Admin policy: admin felhasználókör ellenőrzése (NB)
- Admin nézet: ejs
- Felhasználó létrehozása: bejelentkezve, csak admin felhasználó esetén (NB)
- Csomagok listázása, keresés a csomagok között, általános és részletes keresés
- Felhasználó adatainak módosítása kliens oldalról: a bejelentkezett felhasználó a profil oldalon módosíthatja saját adatait (teljes név, email, telefonszám) (HB)
- Jelszó változtatás kliens oldalról: a bejelentkezett felhasználó a profil oldalon módosíthatja saját jelszavát (BT)
- UI: aprobb javítások, fejlesztések

## it.5 (2017/10/30 - 2017/11/5)
- Lapozás: csomaglista, és a keresés eredményének lapozhatóvá tétele (BT)
- CSV exportálás: adott csomaglista exportálása .csv formátumba (HB)
- Lokalizáció: angol és magyar nyelv, alapértelmezetten angol (NB)
- Oldal nyomtatás: CSS print (HB)

## it.6 (2017/11/6 - 2017/11/12)
- Lapozás: oldalszám számításának javítása, keresés esetén (HB)
- UI: részletes keresésnél, valamint csomag felvételekor adminisztrátor és divízió választása legördülő listából, apróbb javítások...
- Adminisztrátorok és diviziók adatbázisba szervezése (NB)

## it.7 (2017/11/13 - 2017/11/19)
- Egyéb küldeménytípusok (levél, csomag, számla, ...): típústól függő beviteli mezők dinamikus változtatása
- Divíziók hozzáadása Admin felületről
- Adminisztrátorok hozzáadása Admin felületről
- Felhasználók, és adataik listázása (lapozás funkcióval)
- Admin felületről elérhető felhasználó lista
- Új csomag hozzáadásakor (üresen hagyott dátum esetén) keletkező Invalid Date hiba javítása
