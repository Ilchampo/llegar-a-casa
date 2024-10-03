# Llegar a Casa | BackEnd

Repository for web application Llegar a Casa backend developed in Node.

## Table of Contents

- [Llegar a Casa | BackEnd](#llegar-a-casa--backend)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Routes](#routes)
  - [Scrappers](#scrappers)
  - [Deployment](#deployment)

## Introduction

Llegar a Casa is a backend service for the Llegar a Casa web application. It is developed using Node.js and Express, and it provides various endpoints to interact with the application's data.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/Ilchampo/llegar-a-casa.git
   cd llegar-a-casa
    ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
    PORT=3000
    ENVIRONMENT=development
    CORS_ORIGIN_WHITELIST=http://localhost:3000
    SCRAPPER_VEHICLE_INFO_URL=https://servicios.epmtsd.gob.ec/vehiculo_seguro/resultado_vehiculo.php
    SCRAPPER_PERSON_REPORT_URL='https://www.gestiondefiscalias.gob.ec/siaf/informacion/web/noticiasdelito/index.php
   ```

## Configuration
The project uses a `tsconfig.json` file for TypeScript configuration and a `.prettierrc` file for code formatting. Ensure these files are properly configured for your development environment.

## Routes
**1. GET Reporst by license plate**
   ```
    @route  GET /reports/:licensePlate
    @params licensePlate
    @desc   Get reports data by license plate
   ```

**2. GET Vehicle information by license plate**
   ```
    @route  GET /vehicle/:licensePlate
    @params licensePlate
    @desc   Get vehicle data by license plate
   ```

## Scrappers
The project includes scrappers to fetch data from external sources. The scrappers are located in the `src/helpers/infoScrapper.ts` file.

## Deployment
To deploy the project, follow these steps:

1. Build the project:
    `npm run build`

2. Start the server
    `npm start`

3. Ensure your environment variables are set correctly in your deployment environment.