# Full-Stack Messaging Application

This project is a full-stack application built with NestJS and Next.js, using RabbitMQ for asynchronous communication between microservices. It consists of three main services along with supporting services for database and email testing.

## Project Overview

The application allows users to submit messages through a frontend form. Submitted messages are saved in a PostgreSQL database and a confirmation email is sent asynchronously using RabbitMQ.

### Components

1. **Save Service**  
   - **Tech:** NestJS, TypeORM, PostgreSQL  
   - **Responsibility:** Receives messages via REST API and publishes them to RabbitMQ.  
   - **API Endpoint:**  
     ```
     POST /messages
     {
       "name": "John Doe",
       "email": "john@example.com",
       "message": "Hello!"
     }
     ```
   - **Environment Variables:**
     ```
     POSTGRES_HOST=postgres
     POSTGRES_PORT=5432
     POSTGRES_USER=postgres
     POSTGRES_PASSWORD=<your_password>
     POSTGRES_DB=interview_db
     RABBITMQ_URL=amqp://rabbitmq:5672
     ```

2. **Email Service**  
   - **Tech:** NestJS, Nodemailer, RabbitMQ  
   - **Responsibility:** Listens to RabbitMQ for messages and sends confirmation emails.  
   - **Queue & Exchange:**  
     - Exchange: messages  
     - Queue: email-queue  
     - Routing key: email  
   - **Environment Variables:**
     ```
     RABBITMQ_URL=amqp://rabbitmq:5672
     SMTP_HOST=mailhog
     SMTP_PORT=1025
     SMTP_FROM=no-reply@example.com
     SMTP_USER=
     SMTP_PASS=
     ```
   - **Testing Emails:** Open `http://localhost:8025` to see captured emails in Mailhog.

3. **Frontend**  
   - **Tech:** Next.js, React  
   - **Responsibility:** Provides a simple form for submitting messages to the Save Service.  
   - **Environment Variables:**
     ```
     NEXT_PUBLIC_SAVE_URL=http://save-service:3001
     ```
   - **Usage:** Visit `http://localhost:3000` in your browser to submit messages.

### Supporting Services

- **PostgreSQL** – Stores submitted messages. Accessible on port 5432.  
- **RabbitMQ** – Message broker for decoupling Save Service and Email Service. Management UI: http://localhost:15672 (guest/guest).  
- **Mailhog** – Captures sent emails locally. Web UI: http://localhost:8025.  

## Running the Project

1. Build and start all services:

  # Full-Stack Messaging Application

This project is a full-stack application built with NestJS and Next.js, using RabbitMQ for asynchronous communication between microservices. It consists of three main services along with supporting services for database and email testing.

## Project Overview

The application allows users to submit messages through a frontend form. Submitted messages are saved in a PostgreSQL database and a confirmation email is sent asynchronously using RabbitMQ.

### Components

1. **Save Service**  
   - **Tech:** NestJS, TypeORM, PostgreSQL  
   - **Responsibility:** Receives messages via REST API and publishes them to RabbitMQ.  
   - **API Endpoint:**  
     ```
     POST /messages
     {
       "name": "John Doe",
       "email": "john@example.com",
       "message": "Hello!"
     }
     ```
   - **Environment Variables:**
     ```
     POSTGRES_HOST=postgres
     POSTGRES_PORT=5432
     POSTGRES_USER=postgres
     POSTGRES_PASSWORD=<your_password>
     POSTGRES_DB=interview_db
     RABBITMQ_URL=amqp://rabbitmq:5672
     ```

2. **Email Service**  
   - **Tech:** NestJS, Nodemailer, RabbitMQ  
   - **Responsibility:** Listens to RabbitMQ for messages and sends confirmation emails.  
   - **Queue & Exchange:**  
     - Exchange: messages  
     - Queue: email-queue  
     - Routing key: email  
   - **Environment Variables:**
     ```
     RABBITMQ_URL=amqp://rabbitmq:5672
     SMTP_HOST=mailhog
     SMTP_PORT=1025
     SMTP_FROM=no-reply@example.com
     SMTP_USER=
     SMTP_PASS=
     ```
   - **Testing Emails:** Open `http://localhost:8025` to see captured emails in Mailhog.

3. **Frontend**  
   - **Tech:** Next.js, React  
   - **Responsibility:** Provides a simple form for submitting messages to the Save Service.  
   - **Environment Variables:**
     ```
     NEXT_PUBLIC_SAVE_URL=http://save-service:3001
     ```
   - **Usage:** Visit `http://localhost:3000` in your browser to submit messages.

### Supporting Services

- **PostgreSQL** – Stores submitted messages. Accessible on port 5432.  
- **RabbitMQ** – Message broker for decoupling Save Service and Email Service. Management UI: http://localhost:15672 (guest/guest).  
- **Mailhog** – Captures sent emails locally. Web UI: http://localhost:8025.  

## Running the Project

  1. Build and start all services:
  - docker-compose up --build
  2. Verify service availability:
  - Frontend: http://localhost:3000  
  - Mailhog UI: http://localhost:8025  
  - RabbitMQ Management UI: http://localhost:15672  
  - PostgreSQL: Port 5432  

  3. Submit a message via the frontend:
  - It will be saved in the PostgreSQL database (Save Service).  
  - It will trigger an email that can be viewed in Mailhog (Email Service).  

  ## Key Notes

  - Asynchronous communication between services is handled by RabbitMQ.  
  - Mailhog captures emails locally; real emails are not sent.  
  - Docker Compose ensures all services start in the correct order using `depends_on`.  
  - The system is designed for testing and can be extended to real SMTP servers for production.

