# Autonomous ICU Finder Robot

A web application designed to streamline the process of finding and reserving ICU beds in emergency medical situations. The system leverages Node.js, React.js, MongoDB, Redis, and Nodemailer to provide a seamless and efficient experience for patients, families, and hospitals.

---

## Features

1. **Hospital and ICU Database Management**
   - Stores details of hospitals, ICU capacities, locations, and specializations.
   - Profiles each ICU with medical equipment, doctor availability, and condition-handling capabilities.

2. **Proximity-Based Search**
   - Integrates with geolocation services to find hospitals near the patient.
   - Ranks hospitals by ICU availability, distance, and suitability for the patient’s condition.

3. **ICU Reservation System**
   - Automatically reserves ICU beds once a match is confirmed.
   - Notifies hospitals with reservation details and patient requirements.

4. **Emergency Dispatch**
   - Facilitates communication with hospital emergency teams and dispatches ambulances.
   - Sends real-time notifications to all parties involved.

5. **Advanced Notifications**
   - Uses Nodemailer for email notifications to hospitals and patients' families.
   - Employs Redis for efficient real-time messaging and cache management.

---

## Tech Stack

### Frontend
- **React.js**: For building a responsive and user-friendly interface.

### Backend
- **Node.js**: Powered by Express.js to handle API requests and business logic.

### Database
- **MongoDB**: Stores hospital, ICU, and patient data.
- **Redis**: Provides caching for proximity searches and temporary data.

### Notification System
- **Nodemailer**: For sending email notifications.
