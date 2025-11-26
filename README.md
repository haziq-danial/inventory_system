# 📘 **Inventory Management System – Development Setup**

A simple inventory management system built with:

* **Laravel (Backend API)**
* **React + Vite (Frontend)**
* **Axios**
* **Tailwind CSS**
* **MySQL / SQLite**
* **Lucide Icons**

This README explains how to set up the project locally for development.

---

# 🚀 **Requirements**

# Make sure you have installed:

### **Backend**

* PHP 8.2+
* Composer
* MySQL 8+ (or SQLite)

### **Frontend**

* Node.js 18+
* npm or yarn

---

# 🛠️ **Backend Setup (Laravel API)**

Inside `/backend` folder:

```bash
cd backend
cp .env.example .env
```

### **Configure database in `.env`:**

For MySQL:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=inventory_db
DB_USERNAME=root
DB_PASSWORD=
```

For SQLite:

```
DB_CONNECTION=sqlite
```

Create SQLite file if needed:

```bash
touch database/database.sqlite
```

---

### **Install dependencies**

```bash
composer install
```

---

### **Generate app key**

```bash
php artisan key:generate
```

---

### **Run migrations**

```bash
php artisan migrate
```

This will create tables:

* manufacturers
* inventory_types
* inventories

---

# 🎨 **Frontend Setup (React + Vite)**

```bash
npm install
```

---

### **Start development server**

```bash
npm run dev
```

---

# 🔥 **Development Workflow**

### Start backend:

```
php artisan serve
```

### Start frontend:

```
npm run dev
```

Make changes → auto reload.

---