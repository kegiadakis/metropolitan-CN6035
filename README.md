# 🎬 Εργασία Μαθήματος CN6035 – Mobile & Web App Development

**Author**: Ανδρέας Κεγιαδάκης
**Ημερομηνία παράδοσης**: Αύγουστος 2025

## 📌 Περιγραφή

Η εφαρμογή που υλοποίησα αφορά ένα σύστημα κρατήσεων για κινηματογράφους. Ο χρήστης μπορεί να κάνει εγγραφή, είσοδο, να δει διαθέσιμους κινηματογράφους, ταινίες, να κάνει κράτηση, να διαχειριστεί τις κρατήσεις του (επεξεργασία / διαγραφή), όλα μέσω μιας εφαρμογής **React Native** που συνδέεται με ένα **NestJS backend** και χρησιμοποιεί **MariaDB** βάση δεδομένων.

---

## 🛠️ Τεχνολογίες που χρησιμοποιήθηκαν

### Backend
- [NestJS](https://nestjs.com/) – Framework για modular backend ανάπτυξη
- [TypeORM](https://typeorm.io/) – ORM για MariaDB
- [class-validator](https://github.com/typestack/class-validator) – Validation για DTOs
- [Passport](https://docs.nestjs.com/security/authentication) – Authentication (local & JWT strategies)
- [MariaDB](https://mariadb.org/) – RDBMS, τρέχει μέσω Docker
- [Docker](https://www.docker.com/) – Για απομονωμένο DB environment

### Frontend (Mobile App)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Expo Router v2](https://expo.github.io/router/docs) – Για navigation βασισμένο σε filesystem
- [Axios](https://axios-http.com/) – Για API κλήσεις
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) – Για αποθήκευση token / user state

---

## 🧱 Backend - Επεξήγηση

Αντί για απλό Node.js + Express, χρησιμοποίησα **NestJS** μιας και πρακτικά ειναι 
express+typescript, με validation etc. all-in-one πακετο. 
Please no be too mad, architecture-wise it is very very similar.

Υπάρχουν modules για:

- `auth` – login με local strategy + jwt guards
- `users` – register + secured endpoints
- `movies`, `cinemas`, `reservations` – πλήρες CRUD

Επιπλέον:

- Χρησιμοποίησα **DTOs με class-validator** για validation
- Έβαλα και **JWT Auth Guard** με token generation.
- Τέλος εφτιαξά ενα sql script να προσθέτει δεδομένα στη βάση (**seed.sql**)

---

## 📱 Frontend – Επεξήγηση

Με χρήση του **Expo Router v2**, έχουμε τις οθόνες:

- `login.tsx`, `register.tsx`
- `cinemas.tsx` – ScrollView
- `movies.tsx` – FlatList
- `reservation.tsx` – Form κράτησης
- `my-reservations.tsx` – FlatList προσωπικών κρατήσεων
- `edit-reservation.tsx` – επεξεργασία κράτησης

Όλη η λογική διαχωρίστηκε σε:
- **`services/api.ts`** για backend requests μεσω axios 
- **`contexts/AuthContext.tsx`** για login/logout/token
- **`components/ui`** για custom buttons / input fields
- **`utils/storage.ts`** για token/user state

---

## ⚙️ Οδηγίες Εγκατάστασης & Εκτέλεσης

### 💾 Βάση Δεδομένων (MariaDB) (αν και θα προτιμούσα Mongo που λεγαμε στις διαλέξεις  )

1. **Χρειαζόμαστε εγκατεστημένο Docker για τη βάση της Μαρίας μας:**
   [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

2. **Για να τρέξει το container:**

```bash
cd database-config
docker compose up -d mariadb
```

---

## 🖥 Backend (NestJS)
1.	Πάμε στο φάκελο του backend:

```bash
cd backend
npm install --legacy-peer-deps
```

2. Φτιάχνουμε το .env μέσα στο backend/ να εμπεριέχει το τις μεταβλητές που χρειαζόμαστε.
``` (Ένα default .env ειναι το παρακάτω)
DB_HOST=localhost
DB_PORT=3306
DB_USER=cinema_user
DB_PASSWORD=cinemapass
DB_NAME=cinema_booking

JWT_SECRET=myjwtsecret
JWT_EXPIRES_IN=3600s
```

3. Ξεκινάμε το backend με:
```bash
npm run start:dev
```

4. (see troubleshooting in case backend implodes)

5. Αφού ανοίξει το backend και δεν βγαλει θέμα, τρέχουμε το παρακάτω για να δώσουμε σχήμα στη βάση:
```bash
mysql -h 127.0.0.1 -P 3306 -u root -p cinema_booking < ../database-config/seed.sql
```

--- 
## 📱 Frontend (React Native, ***basically Expo***)
1. Πάμε στο φάκελο για το frontend:
```bash
cd frontend
npm install
```

2. Στο constants/config.ts αλλάζουμε την IP για το backend, να δείχνει την LAN IP του υπολογιστή που τρέχει το backend μας. (Ώστε να βλέπει το κινητό μας το σερβερ μέσω του δικτύου μας).

3. Ξεκινάμε την εφαρμογή σε dev περιβαλλον με
```bash
npx expo start
```

4. Σκανάρουμε το QR που μας βγαζει με το κινητό μας. (Για iOS που χρησιμοποίησα εγω χρειαζόμαστε ExpoGO)

5. Success I hope ??

-- 
## ⚙️ Troubleshooting

Αν για οποιοδήποτε λογο αυτοκτονήσει η βάση ή η nest μας βγάζει error "Unable to connect to the database. Retrying (1)...
QueryFailedError: Duplicate entry '' for key 'IDX_97672ac88f789774dd47f7c8b"
Kάνουμε τα εξής (Assuming οτι ειμαστε στο φάκελο του backend μέσα):
1. Κλέινουμε τη nest (ctrl+c)

2. Τρέχουμε:
```bash
mysql -h 127.0.0.1 -P 3306 -u root -p
```
με κωδικό 1234

3. Σβήνουμε τη βάση εντελώς:
```mySQL
DROP database cinema_booking;
```

4. Ξαναφτιάχνουμε τη βάση και κλείνουμε τη σύνδεση:
```
CREATE database cinema_booking;
exit;
```

5. Ξαναδίνουμε σχήμα στη βάση:
```bash
mysql -h 127.0.0.1 -P 3306 -u root -p cinema_booking < ../database-config/schema.sql
```

6. Τρέχουμε το backend μέσα από το φάκελο του:
```bash
npm run start:dev
```

7. Κλείνουμε ξανά το backend (ctrl+c)

8. Εκτελούμε το αρχείο που θα δώσει πληροφορίες στη βάση:
```bash
mysql -h 127.0.0.1 -P 3306 -u root -p cinema_booking < ../database-config/seed.sql
```

9. et'voila, πρεπει να παιζει :P 
