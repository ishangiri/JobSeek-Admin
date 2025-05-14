# JobSeek-Admin

JobSeek-Admin is a MERN (MongoDB, Express, React, Node.js) stack application designed to help users manage job applications efficiently. It provides features to track job statuses, add notes, and organize job-related information.

# Complete App
https://jobseek-admin-ishan-giris-projects.vercel.app/

## Features

- User authentication and authorization
- Add, edit, and delete job applications
- Track job statuses (e.g., applied, interviewing, offered, rejected)
- Search and filter job applications
- Responsive design for mobile and desktop

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/JobSeek-Admin.git
    cd jobify
    ```

2. Install server dependencies:
    ```bash
    cd server
    npm install
    ```

3. Install client dependencies:
    ```bash
    cd ../client
    npm install
    ```

4. Create a `.env` file in the `server` directory and add the following:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    JWT_LIFETIME=1d
    ```

5. Start the development servers:
    - Server: 
      ```bash
      cd server
      npm run dev
      ```
    - Client:
      ```bash
      cd client
      npm start
      ```

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. Register or log in to your account.
3. Start adding and managing your job applications.

## Technologies Used

- **Frontend**: React, Context API, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: Tailwind CSS, Styled Components, ShadcnUI

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## Acknowledgments

- Inspired by the need for better job application management tools.
- Thanks to the open-source community for their amazing tools and libraries.
