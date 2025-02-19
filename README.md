# Holidaze

## An App for Booking Accommodation

![image](/public/screenshot.jpg)

Holidaze is a modern, responsive accommodation booking web application developed as part of my final exam project in frontend development. This application serves both a customer-facing side—allowing users to browse and book holiday venues—and an admin-facing side—enabling venue managers to register, manage venues, and handle bookings.

[![Netlify Status](https://api.netlify.com/api/v1/badges/f5ea5ddb-c805-43dd-b472-faeb31727eb5/deploy-status)](https://app.netlify.com/sites/holidaze-fuerteventura/deploys)

## Table of Contents:

- Project Overview
- Project Goals
- Features & User Stories
- Technical Requirements & Restrictions
- API Documentation
- Design & Planning Resources
- Setup & Installation
- Acknowledgements

## Project Overview:

Holidaze is an accommodation booking platform created for a newly launched service. The project involves building a brand-new frontend application based on an existing API, as documented in the [Noroff API Documentation](https://docs.noroff.dev/docs/v2). The application is divided into two main sections:

1. **Customer Side:** Users can view a list of venues, search for a specific venue, check availability on a calendar, and make bookings.
2. **Admin Side:** Users with a stud.noroff.no email can register as venue managers, create/update/delete venues, and manage bookings.

This project highlights my ability to design and develop a full-featured frontend application using modern web development practices.

## Project Goals:

- **Demonstrate Development Capabilities:** Showcase comprehensive frontend development skills acquired over the last two years.
- **User Experience & Design:** Deliver an intuitive and responsive UI that enhances user engagement.
- **API Integration:** Seamlessly integrate with an existing API to manage all booking functionalities.
- **Technical Proficiency:** Utilize approved technologies and tools as specified in the project brief.

## Features & User Stories:

The client’s requirements, defined through user stories, include:

- **Venue Browsing & Searching:**
  - A user may view a list of venues.
  - A user may search for a specific venue.
  - A user may view a specific venue page by id.
  - A user may view a calendar with available dates for a venue.
- **Customer Functionality:**
  - A user with a stud.noroff.no email may register as a customer.
  - A registered customer may create a booking at a venue.
  - A registered customer may view their upcoming bookings.
- **Venue Manager Functionality:**
  - A user with a stud.noroff.no email may register as a venue manager.
  - A registered venue manager may create a venue.
  - A registered venue manager may update a venue they manage.
  - A registered Venue manager may delete a Venue they manage
  - A registered venue manager may view bookings for a venue they manage.
- **User Account Management:**
  - A registered user may log in.
  - A registered user may update their avatar.
  - A registered user may log out.

## Technical Requirements & Restrictions

- **JavaScript Framework:** Must use an approved framework (e.g., React v16 or higher).
  - The project uses React v19
- **CSS Framework:** Must use an approved framework (e.g., Bootstrap v5+, Tailwind v3+, MUI v5+, Styled Components, or CSS Modules).
  - The project uses Tailwind v3.4.17
- **Hosting:** The application must be hosted on an approved static host (e.g., GitHub Pages or Netlify).
  - [![Netlify Status](https://api.netlify.com/api/v1/badges/f5ea5ddb-c805-43dd-b472-faeb31727eb5/deploy-status)](https://app.netlify.com/sites/holidaze-fuerteventura/deploys)
- **Design & Planning:** Utilize approved design and planning applications (e.g., Adobe XD, Figma, Sketch for design; Trello or GitHub Projects for planning).
  - Planning tool used is Github Projects while Design work has been utilizing Figma.

## API Documentation

All backend functionality is managed through the existing API. You can find the detailed API endpoints and documentation under Holidaze in the [Noroff API Documentation](https://docs.noroff.dev/docs/v2). Additionally, an [API Swagger](https://v2.api.noroff.dev/docs/static/index.html) is available for quick reference.

## Design & Planning Resources

- **Design Prototype:** [View Prototype]()
- **Style Guide:** [View Style Guide]()
- **Gantt Chart:** [View Gantt Chart]()
- **Kanban Board:** [View Kanban Board]()

## Setup & Installation

To run the project locally, follow these steps:

1. **Clone the Repository:**

```bash
git clone git@github.com:jonhenrikaavitsland/holidaze.git
cd holidaze
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Configure Environment Variables:**

Create a .env file in the root directory and add any required environment variables as specified in the documentation (e.g., API base URL):

```env
VITE_API_KEY=<YOUR_API_KEY>
VITE_API_URL=<YOUR_API_BASE_URL>
```

4. **Run the Application:**

```bash
npm run dev
```

The application should now be running on http://localhost:5173.

5. **Build for production:**

```bash
npm run build
```

## Acknowledgements

_This project was developed as a part of my final exam in my twp year frontend development education. I would like to thank the Noroff team for providing the API documentation and the approved resources that made this project possible. Special thanks to my peers, mentors, and instructors who provided invaluable feedback and support throughout the development process._
