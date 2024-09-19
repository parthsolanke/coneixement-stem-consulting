### **Overview**
- **System Features**: Describes the new features in detail.
- **System Design**: Provides an overview of the system architecture.
- **Requirements**: Outlines functional and non-functional requirements.
- **Use Cases**: Illustrates use cases for each feature.
- **Appendices**: Contains supplementary information.

---

## **2. Extra-Features**

### **2.1 Marketplace**

**Description:**
The marketplace feature allows students to purchase educational resources, such as books, courses, and materials, relevant to their career paths.

**Functional Requirements:**
- Students can browse and search for resources.
- Filtering options by category, price, and relevance.
- Integration with payment gateways for secure transactions.
- Option to review and rate purchased items.

**Non-Functional Requirements:**
- Scalability to handle large numbers of users and transactions.
- Secure handling of payment information.
- Responsive design for accessibility on various devices.

### **2.2 Book Counselors for Students**

**Description:**
This feature enables students to book sessions with professional career counselors directly through the platform.

**Functional Requirements:**
- Students can search for counselors by expertise, availability, and ratings.
- Booking system with calendar integration for scheduling sessions.
- Automated notifications for upcoming sessions.
- Secure video conferencing integration for online sessions.

**Non-Functional Requirements:**
- High availability to accommodate time zone differences.
- Secure data handling, especially for personal information.
- User-friendly interface for seamless booking.

### **2.3 Chat with Peers and Seniors**

**Description:**
This feature allows students to interact with peers and seniors who have experience in their fields of interest.

**Functional Requirements:**
- Real-time chat system with text, audio, and video options.
- Group chat functionality for discussion groups.
- Moderation tools to ensure a safe and constructive environment.
- Option to search for and connect with seniors based on career paths.

**Non-Functional Requirements:**
- Low latency for real-time communication.
- Scalability to support large chat groups.
- Data encryption for secure communication.

### **2.4 Career Path Simulator**

**Description:**
The career path simulator allows students to explore different career trajectories and visualize potential outcomes based on their choices.

**Functional Requirements:**
- Interactive UI for selecting and simulating career paths.
- Integration with ML models to predict potential career outcomes.
- Visualization tools like graphs and timelines to represent career progression.
- Option to compare different career paths side-by-side.

**Non-Functional Requirements:**
- High computational performance for real-time simulation.
- Responsive design for compatibility across devices.
- Secure handling of user data and preferences.

---

## **3. System Design**

### **3.2 Data Flow Diagram**

- **Marketplace:** Data flow between user, UI, backend API, and payment gateway.
- **Counselor Booking:** Interaction between user, UI, backend API, calendar service, and video conferencing service.
- **Chat System:** Real-time data flow between users, chat server, and backend API.
- **Career Path Simulator:** Data flow from user input to ML models and visualization tools.

---

## **4. Requirements**

### **4.1 Functional Requirements**

- **Marketplace:**
  - FR1: Ability to browse, search, and filter educational resources.
  - FR2: Secure payment processing and transaction management.

- **Counselor Booking:**
  - FR3: Search and book counselors based on expertise and availability.
  - FR4: Integration with video conferencing for online sessions.

- **Chat System:**
  - FR5: Real-time text, audio, and video chat functionality.
  - FR6: Group chat and user moderation tools.

- **Career Path Simulator:**
  - FR7: Interactive career path selection and simulation.
  - FR8: Visualization of career outcomes with comparison options.

### **4.2 Non-Functional Requirements**

- **Performance:** The system should handle concurrent users efficiently, with low latency and high availability.
- **Security:** All personal data, payment information, and communications must be encrypted and securely stored.
- **Scalability:** The system must be able to scale to accommodate a growing number of users and data.
- **Usability:** The UI should be intuitive and accessible, providing a seamless experience across devices.

---

## **5. Use Cases**

### **5.1 Marketplace**

**Use Case 1:** A student searches for a book on "Data Science."
- **Actor:** Student
- **Precondition:** Student is logged in.
- **Flow:**
  1. The student navigates to the marketplace.
  2. Searches for "Data Science."
  3. Filters results by price and rating.
  4. Selects a book and proceeds to checkout.
  5. Completes the purchase using a payment gateway.
- **Postcondition:** The book is added to the student's purchased resources.

### **5.2 Book Counselors**

**Use Case 2:** A student books a session with a career counselor.
- **Actor:** Student
- **Precondition:** Student is logged in.
- **Flow:**
  1. The student navigates to the counselor booking page.
  2. Searches for counselors by expertise.
  3. Selects a counselor and views available time slots.
  4. Books a session and receives a confirmation email.
- **Postcondition:** The session is scheduled and added to the student’s calendar.

### **5.3 Chat with Peers**

**Use Case 3:** A student joins a group chat with peers interested in "Engineering."
- **Actor:** Student
- **Precondition:** Student is logged in.
- **Flow:**
  1. The student navigates to the chat section.
  2. Searches for "Engineering" chat groups.
  3. Joins a group and participates in the conversation.
  4. Sends and receives messages in real-time.
- **Postcondition:** The student interacts with peers in the chosen group.

### **5.4 Career Path Simulator**

**Use Case 4:** A student simulates a career path in "Software Engineering."
- **Actor:** Student
- **Precondition:** Student is logged in.
- **Flow:**
  1. The student navigates to the career path simulator.
  2. Selects "Software Engineering" as the desired career path.
  3. Adjusts parameters like education level and work experience.
  4. Runs the simulation and views the projected career trajectory.
  5. Compares it with alternative career paths.
- **Postcondition:** The student gains insights into the potential outcomes of different career choices.
