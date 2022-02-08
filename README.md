# Festou - Front-end
```console
  work-in-progress 
  -----------------------------------
  Projeto em desenvolvimento....
```

#### About the project:
   The Festou project was developed as an academic exercise to the Full Stack Developer course at [Infnet Institute](https://www.infnet.edu.br/infnet/).

#### Project Description:
   The project is a web application, the business model works as a marketplace. The project has three types of users, the plataform admin, suppliers and costumers. 
   
    Admin Actions:
      - Validate new Suppliers account
      - Create, edit, deactivate and delete categories
      - denie a new supplier account
      - Activate and deactivate supplier
      - Remove supplier account
      - Activate and deactivate product
      - Delete product
      - Activate and deactivate client
      - Remove client account

    Suppliers Actions:
      - Edit self account info
      - Deactivate self account info
      - Create, edit and delete product 
      - Deactivate and activate product

    Client Actions:
      - Edit self account info
   
#### About this repository:
  This is the API RESTful of the Festou Project, was developed to interact with the project's frontend, that can be found on this link => [Festou Frontend repo](https://github.com/sue1en/festou-frontend). The project was build using NodeJs and MongoDB to the database ( full list at the [project packege.json](https://github.com/sue1en/NerdBox-Api/blob/main/package.json).
    
## Tecnologies/ Libs
  - JavaScript
  - NodeJS
  - ExpressJs
  - MongoDB
  - Mongoose
  - Cors
  - Dotenv
  - MD5
  - Joi
  - Jsonwebtoken
  - Uuid
  - Sendgrid/mail

## Requeriment:
  - NodeJS

## Developer:
- Suelen Batista 
[GitHub](https://github.com/sue1en)
[GitLab](https://gitlab.com/suelen.batista)

## First Steps:
1. Download and install [NodeJS](https://nodejs.org/en/) (choose the option for your operating system). If you already has the nodeJS in your computer go to the next step.
2. Download and install [MongoDB](https://docs.mongodb.com/guides/server/install/) (choose the option for your operating system). If you already has the MongoDB in your computer go to the next step.
3. Clone the project to a folder of your choice.
4. At the terminal in the project backend main folder, install the dependencies with the command <b>`npm install`</b>.
5. Create a <b>`.env`</b> file at the project backend main folder, like the example below:

  ```  
    PORT=3338

    # Your database name. Example:  
    MONGO_DB_NAME=My_project_db

    # Service address used in Mongo. Example:
    MONGO_DB_HOST=localhost:27011
      
  ```
8. To run the project type <b>`npm run dev`</b> at the terminal on the main folder.

## Routers
```console
  ## Rotas:
  - Categories:
    /categorias
    /categorias/:categoryId
    /categorias/:categoryId/products

  - Supplier:
    /supplier
    /supplier/:supplierId
    /supplier/:supplierId/delete
    /supplier/:supplierId/ativa
    /supplier/:supplierId/inativa
    /supplier/:supplierId/products
    /supplier/:supplierId/products/:productId

  - Product:
    /products
    /products/:productId

  - Clients:
    /clients
    /clients/:clientId
    /clients/:clientId/delete
    /clients/:clientId/ativa
    /clients/:clientId/inativa
```