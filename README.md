# Car Sales Chatbot

## Project Overview

This project implements a conversational AI chatbot designed to assist users in finding cars based on their queries. The chatbot leverages a data-driven approach to provide relevant car information, making it a practical example of integrating data engineering principles with a user-facing application. The backend processes car sales data, while the frontend provides an intuitive chat interface.

## Features

- **Interactive Chat Interface**: A modern and responsive chat UI for seamless user interaction.
- **Car Search**: Users can ask questions about specific car manufacturers or models.
- **Data-Driven Responses**: The chatbot retrieves and displays car details from a pre-loaded dataset.
- **Dynamic Car Listings**: Displays car information in an organized, multi-column format.
- **Typing Indicator**: Provides visual feedback when the bot is processing a request.
- **Responsive Design**: Optimized for various screen sizes.
- **Custom Scrollbar**: Enhanced UI with a custom-styled scrollbar.
- **Developer Credits**: Footer with developer information and a link to the GitHub repository.

## Tech Stack

This project is built with a combination of modern web technologies and Python for backend data processing.

### Frontend

- **Next.js 16.0.1**: A React framework for building performant and scalable web applications.
- **React 19.2.0**: JavaScript library for building user interfaces.
- **Tailwind CSS 4**: A utility-first CSS framework for rapid UI development.
- **TypeScript 5**: A superset of JavaScript that adds static typing.

### Backend

- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+.
- **Pandas**: A powerful data manipulation and analysis library for Python, used here for:
    - **CSV Data Loading**: Efficiently loading car sales data from `car_sales_data.csv`.
    - **Data Cleaning**: Removing spaces from column names for easier access.
    - **Feature Engineering**: Creating a `full_name` column by concatenating `Manufacturer` and `Model` for improved search capabilities.
    - **Data Filtering**: Querying the dataset based on user input to find matching cars.
- **CORS Middleware**: Configured to allow secure communication between the Next.js frontend and the FastAPI backend.

## Data Source

The chatbot utilizes car sales data stored in `data/car_sales_data.csv`. This dataset is loaded and processed by the FastAPI backend to serve car-related queries.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- pip (Python package installer)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-github-repo/car-sales-chatbot.git
    cd car-sales-chatbot
    ```

2.  **Backend Setup:**
    ```bash
    cd server
    python -m venv venv
    venv\Scripts\activate  # On Windows
    # source venv/bin/activate  # On macOS/Linux
    pip install -r requirements.txt # You'll need to create this file
    ```
    *Note: Create a `requirements.txt` file in the `server` directory with the following content:*
    ```
    fastapi
    uvicorn
    pandas
    python-dotenv
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1.  **Start the Backend Server:**
    ```bash
    cd server
    venv\Scripts\activate  # On Windows
    # source venv/bin/activate  # On macOS/Linux
    uvicorn main:app --reload
    ```
    The backend server will run on `http://127.0.0.1:8000`.

2.  **Start the Frontend Development Server:**
    ```bash
    cd ../client
    npm run dev
    ```
    The frontend application will be accessible at `http://localhost:3000`.

## Usage

Open your browser and navigate to `http://localhost:3000`. You can start typing questions about cars in the chat interface, such as "Show me Honda Civic" or "Tell me about Ford Mustang."

## Contributing

Feel free to fork the repository, open issues, or submit pull requests.
