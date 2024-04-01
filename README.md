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

5. **Testing:**
   
   You can run the tests using:
   ```bash
   npm run test
