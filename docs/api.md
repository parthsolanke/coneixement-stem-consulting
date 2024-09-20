## **Career Guidance Quiz API Documentation**

### **Base URL**: `/api`

### **Available Endpoints**:

---

### 2. **POST /quiz**
   - **Description**: 
     Generates a career guidance quiz and validates the response. The quiz consists of 15 questions, each associated with a specific personality trait.
   - **Request**:
     - **Method**: `POST`
     - **URL**: `/api/quiz`
     - **Request Body**: No input required.
   - **Response**:
     - **Status Code**: `200 OK` (On Success)
     - **Content**: A JSON object containing the quiz questions.
       ```json
       {
         "questions": [
           {
             "index": 1,
             "question": "I enjoy trying new things and exploring different ideas.",
             "trait": "Openness"
           },
           {
             "index": 2,
             "question": "I am always organized and on time for appointments.",
             "trait": "Conscientiousness"
           },
           ...
         ]
       }
       ```
   - **Response Model**: 
     - **Quiz**:
       - `questions`: A list of questions where each question is an object with the following attributes:
         - **index**: `int` - The question number.
         - **question**: `str` - The quiz question text.
         - **trait**: `str` - The personality trait associated with the question (e.g., Openness, Conscientiousness).
   - **Errors**:
     - **400 Bad Request**: If the generated quiz is invalid.
       ```json
       {
         "detail": "Response must contain exactly 15 questions."
       }
       ```
     - **500 Internal Server Error**: If an internal server error occurs while generating or validating the quiz.
       ```json
       {
         "detail": "Internal server error message"
       }
       ```
   - **Example**:
     ```bash
     curl -X 'POST' 'http://127.0.0.1:8000/api/quiz'
     ```

---

### **Error Handling**:

- **400 Bad Request**: Indicates that there was an issue with the generated quiz or invalid data was found.
- **500 Internal Server Error**: Occurs when there is an issue processing the quiz, such as when an exception is raised during quiz generation or validation.

---

### **Example Usage**:

#### 1. **POST Generate Quiz**:
```bash
curl -X POST 'http://127.0.0.1:8000/api/quiz'
```
Response (Success):
```json
{
  "questions": [
    {
      "index": 1,
      "question": "I enjoy trying new things and exploring different ideas.",
      "trait": "Openness"
    },
    {
      "index": 2,
      "question": "I am always organized and on time for appointments.",
      "trait": "Conscientiousness"
    },
    ...
  ]
}
```
