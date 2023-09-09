# phoebe

[Phoebe](https://phoebe.onrender.com/) is a solo project created by Randy Hac, crafted as part of AppAcademy's project. Modeled after Asana, Phoebe offers users a platform to manage productivity that allows users to create projects, add team members, and organize the processes of tasks.

## Technologies Used
Phoebe was built using the following technologies:

### Backend:
- **Javascript**
- **Sequelize**
  - sequelize-express

### Frontend:
- **JavaScript**
- **React**
- **Redux**
- **Framer Motion**
- **Tailwind**

## Table of Contents
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Backend Setup: Flask](#backend-setup-flask)
  - [Frontend Setup: React](#frontend-setup-react)
- [Operating](#operating)
- [Accord Showcase!](#accord-showcase)
- [Wiki Documents](#wiki-documents)
- [Future Features](#future-features)
- [Technical Implementation Details](#technical-implementation-details)
- [Authors](#authors)

## Installation

### Backend Setup: SQL

1. **Clone the Repository**
    ```bash
    git clone https://github.com/randydhack/Phoebe.git
    ```

2. **Install Dependencies**
    ```bash
    pipenv install -r requirements.txt
    ```

3. **Configure Environment Settings**
    - Create a `.env` file using the provided example, adjusting settings suitable for your development environment.
    - Ensure the SQLite3 database connection URL is present in the `.env` file.
    - Set a unique name for the `SCHEMA` environment variable, using the `snake_case` convention.

4. **Setup and Start the SQL Server**
    ```bash
    npm install
    npx dotenv sequelize db:migrate
    npx dotenv sequelize db:seed:all
    npm start
    ```

### Frontend Setup: React

1. **Navigate to the React App Folder**
    ```bash
    cd frontend
    ```

2. **Install Dependencies and Start the App**
    ```
    npm install
    npm start
    ```

3. With both backend and frontend running, you're ready to experience Phoebe. Cheers!

## Operating

For subsequent sessions, ensure you have two terminal windows:

1. **Backend Server** (ensure the database is migrated and seeded as mentioned in the installation process)
    ```bash
    cd backend
    npm start
    ```

2. **Frontend Server**
    ```bash
    cd frontend
    npm start
    ```

Enjoy Phoebe!

## Phoebe Showcase!
![LogRegFor](https://github.com/abramfelix1/Accord/assets/62622410/dca799ac-7997-4f01-89d2-62c3af04d7cc)
![Welcome](https://github.com/abramfelix1/Accord/assets/62622410/2ba38185-2aa5-4861-bb6e-78903f10338d)
![ChatDash](https://github.com/abramfelix1/Accord/assets/62622410/c4c60d58-a30d-463a-a0e2-fc295f9c0ad1)


## [Wiki Documents](https://github.com/abramfelix1/Accord/wiki)
- [Database Schema](https://github.com/randydhack/phoebe/wiki/Database-Schema)
- [Features](https://github.com/randydhack/phoebe/wiki/Features)
- [Backend Routes](https://github.com/randydhack/phoebe/wiki/Backend-Routes)
- [User Stories](https://github.com/randydhack/phoebe/wiki/User-Stories)


## Future Features

- **AWS**: Allow users to add image to project and profile.
- **Drop-and-Drop**: Users can drag and drop sections and cards.

## Technical Implementation Details




## Authors
* Randy's [Github](https://github.com/randydhack) and [LinkedIn](https://www.linkedin.com/in/randy-hac-4577a71b0/)

