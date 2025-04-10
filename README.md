# Doctor Appointment System

A comprehensive web application for managing doctor appointments, built with Next.js and React. This system allows healthcare providers to schedule, manage, and track patient appointments with an intuitive user interface.

![Doctor Appointment System] link - https://doctor-appointment-booking-sys.netlify.app/
## Features

- **Appointment Management**: Create, view, edit, and delete appointments
- **Calendar Views**: Toggle between month and week views
- **Doctor Selection**: Browse and select doctors by specialty
- **Search Functionality**: Search for patients, doctors, or appointments
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 14
- **UI Components**: Custom components with shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data Persistence**: Local Storage (can be extended to use a database)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/codebyarindam/Doctor-Appointment-Booking-System.git
   cd Doctor-Appointment-Booking-System
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

\`\`\`
doctor-appointment-system/
├── app/                    # Next.js app directory
│   ├── globals.css         # Global styles
│   ├── layout.js           # Root layout
│   └── page.js             # Main page component
├── components/             # React components
│   ├── ui/                 # UI components (shadcn/ui)
│   ├── AppointmentDetails.js  # Appointment details modal
│   ├── AppointmentModal.js    # Appointment creation/editing modal
│   ├── Calendar.js            # Calendar component
│   ├── DoctorSearch.js        # Doctor search component
│   ├── MonthView.js           # Month view calendar
│   ├── Sidebar.js             # Application sidebar
│   ├── WeekView.js            # Week view calendar
│   └── ...                    # Other components
├── context/                # React context providers
│   ├── AppointmentContext.js  # Appointment state management
│   ├── DoctorContext.js       # Doctor state management
│   └── ThemeContext.js        # Theme state management
├── lib/                    # Utility functions
│   ├── date-utils.js          # Date manipulation utilities
│   └── utils.js               # General utilities
└── public/                 # Static assets
\`\`\`

## Usage Guide

### Creating an Appointment

1. Click on a date in the calendar
2. Fill in the appointment details in the modal
3. Select a doctor (you can browse doctors by specialty)
4. Click "Book Appointment"

### Viewing Appointment Details

1. Click on an appointment in the calendar
2. View the details in the modal that appears
3. From here, you can edit or delete the appointment

### Switching Calendar Views

Use the "Month" and "Week" buttons in the view toggle to switch between calendar views.

### Searching

Use the search bar at the top to find patients, doctors, or appointments. You can filter the search results by type.

### Dark/Light Mode

Toggle between dark and light modes using the sun/moon switch in the top right corner.

## Data Persistence

The application currently uses browser local storage to persist data. This means:

- Data is stored in the user's browser
- Data will persist between page refreshes and browser sessions
- Data is not shared between different browsers or devices

To implement a more robust data persistence solution, you could:

1. Replace the local storage implementation with API calls to a backend server
2. Update the context providers to fetch and update data from the server
3. Implement authentication to secure the data

## Customization

### Themes

The application uses a teal/emerald color scheme by default. To change this:

1. Modify the color variables in `tailwind.config.js`
2. Update the gradient and color classes in `app/globals.css`

### Adding New Appointment Types

To add new appointment types:

1. Update the `APPOINTMENT_TYPES` array in `components/AppointmentModal.js`
2. Add a new color mapping in the `getAppointmentColor` function in `lib/date-utils.js`
3. Add the corresponding CSS class in `app/globals.css`

## Known Issues and Limitations

- **Calendar Navigation**: Currently, the "Today" button in week view doesn't reset to the current date
- **Appointment Conflicts**: The system detects conflicts but could benefit from a visual calendar conflict display
- **Mobile Optimization**: While responsive, some complex views like week view could be further optimized for very small screens
- **Data Validation**: More comprehensive form validation could be implemented
- **Performance**: For large numbers of appointments, performance optimizations may be needed

## Future Enhancements

- **Patient Management**: Add a dedicated patient management section
- **Recurring Appointments**: Support for scheduling recurring appointments
- **Notifications**: Email or SMS notifications for upcoming appointments
- **Reports**: Generate reports on appointment statistics
- **Online Payments**: Integration with payment gateways for appointment fees
- **Multi-language Support**: Internationalization for different languages
- **Calendar Integrations**: Sync with external calendars (Google, Outlook, etc.)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

