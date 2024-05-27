# Flighthub Project

## Instructions to Run the Project

### Setup the frontend

1. **Clone the repository**:

   ```bash
   git clone https://github.com/RobPanneton/flighthub-project.git
   cd flighthub-project
   cd app
   ```

2. **Create a .env file for the frontend in the app folder:**:

   ```bash
   touch .env
   ```

3. **Add the following line to the .env file:**:

   ```bash
   REACT_APP_FLIGHT_API_URL=http://localhost:1337
   ```

4. **Install depdencies**:

   ```bash
   npm install
   ```

### Setup the DB - You will need to have postgresql installed on your machine

1. **Setup the DB**:

   ```bash
   from the root of the project
   cd backend
   ```

2. **Create a .env file for the backend in the backend folder:**:

   ```bash
   touch .env
   ```

3. **Add the following values to the .env:**:

   ```bash
   DB_USERNAME=postgres
   DB_PASSWORD=admin
   DB_DATABASE=flighthub_rob_p
   DB_HOST=localhost
   PORT=1337
   DB_PORT=5432
   ```

4. **Initialize the postgres DB:**:

   ```bash
   psql -U postgres
   - enter your password
   CREATE DATABASE flighthub_rob_p;
   GRANT ALL PRIVILEGES ON DATABASE flighthub_rob_p TO postgres;
   ctrl+c
   ```

5. **Install dependencies. From backend folder:**:

   ```bash
   npm install
   ```

6. **Initialize the Database Schema:**:

   ```bash
   npm run migration-migrate
   ```

7. **Seed the database:**:

   ```bash
   npm run seed
   ```

8. **Start the server:**:

   ```bash
   npm run dev
   ```

### Start the frontend

1. **Start the app. While the backend is running, from the app folder run:**:

   ```bash
   npm start
   ```

## Project Structure and Architecture

The project is designed using a component-based architecture, promoting reusability and maintainability. The backend is built using Node.js and PostgreSQL, with data manipulation handled via TypeORM.

## Backend Components

- Flights: Manages flight data, including creating, updating, and retrieving flight details.
- Airports: Manages airport data, including details such as codes, cities, and countries.
- Airlines: Manages airline data, ensuring accurate and up-to-date information.
- Trips: Manages generating trip options

## Frontend Context

- TripsContext: Manages the state and logic related to trips, including fetching, form state management and some slight input validation.
- AirportsContext: Manages fetching and storing state related to available airports.
- AirlinesContext: Manages fetching and storing state for airline logos and names.

## Technical Choices

- Node.js: Chosen for its performance and scalability, allowing for efficient handling of I/O operations.
- TypeORM: Used for object-relational mapping, making database interactions easier and more maintainable.
- PostgreSQL: Chosen for its robustness and powerful features, suitable for handling complex queries and large datasets.
- a bit about react
- SASS/SCSS: Used for styling to leverage features like variables, making the CSS more maintainable and scalable.
- React: Selected for building a dynamic and responsive user interface, facilitating a smooth user experience.

## Trade-offs and Future Improvements

### Trade-offs

- Error Handling: Currently, error handling is minimal. More robust error handling is needed, especially for database operations and API endpoints.
- Using POST Instead of GET: The decision to use POST instead of GET for fetching trips allows for the inclusion of a JSON body in the request, which can be beneficial for sending complex query parameters and ensuring better organization of request data.
- No Docker Container: The decision was made not to use a Docker container to simplify the process of setting up and running the project. While Docker offers benefits in terms of consistency and ease of setup across different environments, it introduced complexities that were deemed unnecessary for this project.

### Future Improvements

- Typeahead: Add typeahead functionality to improve user experience during search.
- Search and Replace: Implement search and replace functionality for writing out city names.
- Error State for Inputs: Enhance error handling for user inputs to provide better feedback and prevent invalid data submission.
- Unit Tests: Increase the coverage of unit tests to ensure the reliability of individual components.
- Integration Tests: Add integration tests to verify the interactions between different components and the overall system behavior.

By focusing on these areas, the app can be made more robust and user-friendly, ensuring a better overall experience.
