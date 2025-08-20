# Solar Power Plant Service Booking

Welcome to the Solar Power Plant Service Booking website! # Saffron InfoTech Website

This is the official website for Saffron InfoTech, a company specializing in renewable energy solutions.

## Getting Started

Follow these steps to set up the project locally for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/ramchandra06032004/saffronInfoTech-website.git
cd saffronInfoTech-website
```

### 2. Set Up Environment Variables

Create a `.env` file in the root of the project directory. Copy the contents of `.env.example` (if it exists) or use the template below. Replace the placeholder values with your actual credentials.

```properties
# MongoDB Connection String
MONGO_URI="your_mongodb_connection_string"

# NextAuth Secret for session encryption
NEXTAUTH_SECRET="your_super_secret_key"

# Mailjet API Keys for sending emails
MJ_APIKEY_PUBLIC="your_mailjet_public_key"
MJ_APIKEY_PRIVATE="your_mailjet_private_key"

# Resend API Key (alternative email service)
RESEND_API_KEY="your_resend_api_key"

# Razorpay API Keys for payments
YOUR_KEY_ID="your_razorpay_key_id"
YOUR_KEY_SECRET="your_razorpay_key_secret"
```

### 3. Install Dependencies

Install the required npm packages:

```bash
npm install
```

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).



