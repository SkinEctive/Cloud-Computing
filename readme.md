# Backend API Documentation 🧑‍💻

## SkinEctive Backend API 🔗

```http
  http://localhost:8080/
```

## API Endpoints

| Endpoint                      | Method | Input                                          | Description                  | Status      |
| ----------------------------- | ------ | ---------------------------------------------- | ---------------------------- | ----------- |
| /register                     | POST   | email, fName, lName, password, confirmPassword | Register new account         | ✅ Completed |
| /login                        | POST   | email, password                                | Login to application         | ✅ Completed |
| /users                        | GET    | -                                              | Get all users data           | ✅ Completed |
| /users/:userId                | GET    | userId                                         | Get user data by ID          | ✅ Completed |
| /users/:userId/changeDetails  | POST   | email, fName, lName (optional), age            | Update user's data           | ✅ Completed |
| /users/:userId/changePassword | POST   | oldPassword, newPassword, confirmNewPassword   | Update user's password       | ✅ Completed |
| /users/:userId/delete         | DELETE | -                                              | Remove user's account        | ✅ Completed |
| /articles                     | GET    | -                                              | Get all articles data        | ✅ Completed |
| /articles/:articleId          | GET    | articleId                                      | Get article data by ID       | ✅ Completed |
| /articles/:userId/create      | POST   | title, content                                 | Create data                  | ✅ Completed |
| /articles/:userId/delete      | DELETE | articleId                                      | Remove selected article      | ✅ Completed |
| /diseases                     | GET    | -                                              | Get all diseases data        | ✅ Completed |
| /diseases/:diseaseId          | GET    | diseaseId                                      | Get diseases data by ID      | ✅ Completed |
| /disease/:userId/add          | POST   | diseaseId, diseaseName, diseaseAdvice          | Post new disease to database | ✅ Completed |
| /scraper/                     | POST   | keyword                                        | Retrieve skincare product    | ✅ Completed |
| /clinic/location              | POST   | latitude, langitude                            | Retrieve nearby clinic       | ✅ Completed |
| /clinic/search                | POST   | keyword                                        | Retrieve searched nearby clinic  | ✅ Completed |

## Machine Learning Endpoints

To run the SkinEctive's Machine Learning Endpoints, access the link below:

```http
  http://localhost:8080/
```

## How to run this API on your local machine 💻

If you want to run this API Server on your local machine, you need to do this steps:

1. Clone this repository. `git clone -b master https://github.com/SkinEctive/Cloud-Computing.git`
2. Change directory to the root project
3. Type `npm ci` in the terminal to install all dependencies needed.
4. Activate your xampp and create database name `skinective_test3`.
5. Type `npx prisma migrate dev` in the terminal to migrate your databases (if needed, type `npx prisma generate` first).
6. Run your application with `npm run start-dev` in the terminal.
