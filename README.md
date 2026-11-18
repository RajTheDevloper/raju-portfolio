# 🚀 Full-Stack Content Management System (CMS)

A robust, production-grade Content Management System featuring a decoupled React.js frontend and a secure Spring Boot micro-services backend. Built with enterprise-level security, containerized architecture, and automated testing.

---

## 🛠️ Tech Stack

* **Backend:** Java 17/21, Spring Boot, Spring Security, Spring Data JPA, Hibernate, Maven
* **Frontend:** React.js, JavaScript, HTML5, CSS3
* **Database & Caching:** PostgreSQL, Hibernate ORM
* **DevOps & Tooling:** Docker, Docker Compose, JUnit 5, Mockito, Swagger / OpenAPI

---

## 🔑 Key Engineering Highlights

* **Stateless Security:** Implemented robust JWT (JSON Web Token) authentication utilizing custom Spring Security filter chains to protect administrative and resource endpoints.
* **Optimized Data Persistence:** Designed normalized relational schemas in PostgreSQL, managed efficiently via Spring Data JPA and Hibernate with optimized query mapping.
* **Containerized Deployment:** Orchestrated multi-tier services using Docker and Docker Compose, ensuring seamless environment parity from local development to production.
* **Testing & Documentation:** Maintained high code reliability with comprehensive unit and integration test suites using JUnit 5 & Mockito, alongside interactive API documentation generated via Swagger.

---

## 🏗️ Architecture Overview

 [ React.js Frontend ] 
         │ (HTTPS / REST API + JWT Header)
         ▼
 [ Spring Boot Backend API ]
         ├── Spring Security (JWT Filter Chain)
         ├── Business Service Layer
         └── Spring Data JPA / Hibernate
                   │
                   ▼
         [ PostgreSQL Database ]
---

⚙️ Getting Started Locally
Prerequisites
Java 17 or higher installed

Maven installed

PostgreSQL running locally or via Docker

Node.js & npm (for the React frontend)

1. Clone the Repository
   git clone [https://github.com/RajTheDevloper/raju-portfolio.git](https://github.com/RajTheDevloper/raju-portfolio.git)
    cd raju-portfolio
   
---

2. Configure the Backend (application.properties)
Update your database credentials in src/main/resources/application.properties:

properties:
spring.datasource.url=jdbc:postgresql://localhost:5432/your_db_name
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

---

3. Run the Backend
   - mvn clean install
   - mvn spring-boot:run

---

4. Run via Docker Compose (Alternative)
To spin up the entire application stack instantly:
- docker-compose up --build

---

📚 API Documentation
Once the Spring Boot application is running locally, you can explore and test all endpoints interactively via Swagger UI:
👉 http://localhost:8080/swagger-ui/index.html

---

👨‍💻 Author
Raju B
Github: https://github.com/RajTheDevloper
LinkedIn: https://www.linkedin.com/in/raju-b-98b97a26a

Here is a high-impact, professional `README.md` template designed specifically to catch a recruiter's or hiring manager's eye the moment they open your GitHub repository.

It highlights your architecture, security implementation, and tech stack right at the top so they don't have to dig through code to see what you built.

---

```markdown
# 🚀 Full-Stack Content Management System (CMS)

A robust, production-grade Content Management System featuring a decoupled React.js frontend and a secure Spring Boot micro-services backend. Built with enterprise-level security, containerized architecture, and automated testing.

---

## 🛠️ Tech Stack

* **Backend:** Java 17/21, Spring Boot, Spring Security, Spring Data JPA, Hibernate, Maven
* **Frontend:** React.js, JavaScript, HTML5, CSS3
* **Database & Caching:** PostgreSQL, Hibernate ORM
* **DevOps & Tooling:** Docker, Docker Compose, JUnit 5, Mockito, Swagger / OpenAPI

---

## 🔑 Key Engineering Highlights

* **Stateless Security:** Implemented robust JWT (JSON Web Token) authentication utilizing custom Spring Security filter chains to protect administrative and resource endpoints.
* **Optimized Data Persistence:** Designed normalized relational schemas in PostgreSQL, managed efficiently via Spring Data JPA and Hibernate with optimized query mapping.
* **Containerized Deployment:** Orchestrated multi-tier services using Docker and Docker Compose, ensuring seamless environment parity from local development to production.
* **Testing & Documentation:** Maintained high code reliability with comprehensive unit and integration test suites using JUnit 5 & Mockito, alongside interactive API documentation generated via Swagger.

---

## 🏗️ Architecture Overview

```text
 [ React.js Frontend ] 
         │ (HTTPS / REST API + JWT Header)
         ▼
 [ Spring Boot Backend API ]
         ├── Spring Security (JWT Filter Chain)
         ├── Business Service Layer
         └── Spring Data JPA / Hibernate
                   │
                   ▼
         [ PostgreSQL Database ]

```

---

## ⚙️ Getting Started Locally

### Prerequisites

* Java 17 or higher installed
* Maven installed
* PostgreSQL running locally or via Docker
* Node.js & npm (for the React frontend)

### 1. Clone the Repository

```bash
git clone [https://github.com/RajTheDevloper/raju-portfolio.git](https://github.com/RajTheDevloper/raju-portfolio.git)
cd raju-portfolio

```

### 2. Configure the Backend (`application.properties`)

Update your database credentials in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/your_db_name
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

```

### 3. Run the Backend

```bash
mvn clean install
mvn spring-boot:run

```

### 4. Run via Docker Compose (Alternative)

To spin up the entire application stack instantly:

```bash
docker-compose up --build

```

---

## 📚 API Documentation

Once the Spring Boot application is running locally, you can explore and test all endpoints interactively via Swagger UI:
👉 **[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)**

---

## 👨‍💻 Author

**Raju B**

* [GitHub](https://github.com/RajTheDevloper)
* [LinkedIn](https://www.linkedin.com/in/raju-b-98b97a26a)


***

### How to use this:
1. Open your `raju-portfolio` repository on GitHub.
2. If the project is inside a subfolder, you can place this `README.md` inside that subfolder (or at the root if it's the main project in the repo).
3. Copy and paste the text above. It instantly signals to any technical recruiter that you understand production workflows, security, and documentation.




