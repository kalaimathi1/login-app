# Login App (Frontend + Spring Boot + MySQL)

## Structure

```text
login-app/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/loginapp/...
│       └── resources/application.properties
├── database/
│   └── schema.sql
└── README.md
```

## Prereqs

- Java 17+
- Maven 3.9+
- MySQL 8+

## Database setup (MySQL)

Create a database, then run the schema:

```sql
CREATE DATABASE login_app;
USE login_app;
SOURCE database/schema.sql;
```

## Backend config

Edit:

- `backend/src/main/resources/application.properties`

Set your MySQL username/password:

```properties
spring.datasource.username=root
spring.datasource.password=CHANGE_ME
```

## Run backend (Spring Boot)

From `login-app/backend/`:

```bash
mvn clean spring-boot:run
```

Backend runs on `http://localhost:8080`.

API:

- `POST http://localhost:8080/api/login`
- JSON body: `{"email":"a@b.com","password":"secret1"}`
- Response: `{"success":true,"message":"..."}`

## Run frontend

No separate frontend server is required.

Spring Boot serves the UI from:

- `backend/src/main/resources/static/`

After starting the backend, open:

- `http://localhost:8080/`

## Notes

- Frontend validation: required email + regex format, required password min 6 chars.
- Backend validation: Jakarta Bean Validation (`@Email`, `@NotBlank`, `@Size(min=6)`).
- Passwords are stored as BCrypt hashes (never plaintext).
- Login attempts are recorded in `login_attempts` with IP + timestamp.

