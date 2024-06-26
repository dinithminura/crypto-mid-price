# Global Price Index API

This repository contains the source code for a REST API that computes the global price index of the BTC/USDT trading pair using order book data from multiple exchanges.

## Overview

As a market maker, having a global price index is essential. This API fetches order book data from three different exchanges (Binance, Kraken, and Huobi), computes the mid-price for each order book, and returns the average of these mid-prices.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dinithminura/crypto-mid-price.git

2. **Install dependencies:**
   
   Navigate to the project directory and run:
   ```bash
   npm install

3. **Set up environment variables:**
   
   Create a ``.env`` file in the root directory and add the necessary environment variables. You can use the ```.env.example``` file as a template.

4. **Start dev server:**
   
   Run the following command to start the server:
   ```bash
   npm run dev

5. **Test suite:**
   
   You can run the tests using:
   ```bash
   npm run test

## Running the App with Docker

1. **Create .env file:**
   
   Create a `.env` file by following .env.example. Since all the connector apis are public, same values added in example file.
   ```bash
   cp .env.example .env
   
2. **Build docker image:**

   Execute the following command in your terminal:
   ```bash
   docker build -f infrastructure/docker/Dockerfile -t crypto-mid-price-image .

4. **Run docker container:**
   
   run docker container using the following command:
   ```bash
   docker run -p 3000:3000 --env-file=.env crypto-mid-price-image

5. **Verify the app is running:**
   
   Open a web browser and navigate to `http://localhost:3000`. You should see "Server is running!" indicating that your app is running successfully.


## API Endpoints

- `GET /api/global-price-index`: Returns the global price index of the BTC/USDT trading pair.
- `GET /api/health-check`: Returns OK with 200, and can be used as the endpoint to check the server health (for deployments).

