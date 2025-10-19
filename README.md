# 📝 Todo Application

A **simple Todo Application** built using **Java** and **Spring Boot** with **PostgreSQL**.
This application allows users to efficiently manage tasks by creating, updating, and deleting todos. ✅

---

## 📑 Table of Contents

* [Features](#features)
* [Technologies Used](#technologies-used)
* [Installation](#installation)
* [Usage](#usage)
* [API Endpoints](#api-endpoints)
* [Project Structure](#project-structure)
* [Contributing](#contributing)
* [License](#license)

---

## ✨ Features

* Add new todos with **title** and **description** 📝
* Mark todos as **completed** ✅
* **Edit** or **delete** existing todos ✏️🗑️
* Persistent storage using **PostgreSQL** 🗄️
* RESTful API endpoints for managing todos 🌐
* **Secure authentication** using JWT 🔒

---

## 🛠️ Technologies Used

* **Backend:** Java, Spring Boot
* **Database:** PostgreSQL
* **ORM:** Spring Data JPA 🗄️
* **Lombok** for boilerplate reduction ✨
* **Security:** Spring Security 🔒
* **JWT** for authentication and authorization 🔑
* **Build Tool:** Maven
* **Version Control:** Git & GitHub

---

## ⚡ Installation

Follow these steps to get the project up and running locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/Christober-S/TodoApplication.git
   cd TodoApplication
   ```

2. **Set up PostgreSQL**

   * Create a new database, e.g., `tododb`
   * Update `src/main/resources/application.properties` with your database credentials:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/tododb
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Build and run the application**

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. **Access the application**

   Open your browser or API client at: `http://localhost:8080` 🌐

---

## 🚀 API Endpoints

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| GET    | `/todos`      | Get all todos 📝           |
| POST   | `/todos`      | Add a new todo ➕           |
| PUT    | `/todos/{id}` | Update an existing todo ✏️ |
| DELETE | `/todos/{id}` | Delete a todo 🗑️          |

---

## 📂 Project Structure

```
TodoApplication/
│
├── src/main/java/com/todoapp
│   ├── controllers/  # REST controllers 🌐
│   ├── models/       # Todo model 📝
│   ├── repositories/ # Database repositories 🗄️
│   └── services/     # Service layer ⚙️
│
├── src/main/resources
│   └── application.properties  # Database & Spring Boot config ⚙️
│
├── pom.xml                  # Maven dependencies 📦
└── README.md
```

---

## 🤝 Contributing

1. Fork the repository 🍴

2. Create a new branch 🌿

   ```bash
   git checkout -b feature/your-feature
   ```

3. Make your changes and commit 💾

   ```bash
   git commit -m "Add feature"
   ```

4. Push to the branch 🚀

   ```bash
   git push origin feature/your-feature
   ```

5. Open a **Pull Request** on GitHub 🔀

---

## ⚖️ License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
