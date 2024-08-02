## Features

1. **Retrieve All Questions**: Access all personality questions.
2. **Filter Questions by Trait**: Retrieve questions by specific traits (e.g., OPENNESS, CONSCIENTIOUSNESS).
3. **Assess Responses**: Compute and return the average score for each trait based on user responses.
4. **Dynamic Question Generation (Future)**: Generate new questions using LLMs.
5. **Dynamic Assessment (Future)**: Assess user responses using LLMs.
6. **Utility Functions**: Placeholder functions for LLM prompt engineering and response validation.

## Endpoints

### Get All Questions

- **URL**: `/questions`
- **Method**: `GET`
- **Response**: Returns a list of all personality questions.

### Get Questions by Trait

- **URL**: `/questions/{trait}`
- **Method**: `GET`
- **Path Parameter**: 
  - `trait`: The trait to filter questions by (e.g., OPENNESS, CONSCIENTIOUSNESS).
- **Response**: Returns a list of questions filtered by the specified trait.

### Assess Responses

- **URL**: `/assess`
- **Method**: `POST`
- **Request Body**: 
  ```json
  {
    "responses": [
      {
        "index": 0,
        "answer": 5
      },
      {
        "index": 1,
        "answer": 4
      }
    ]
  }
  ```
- **Response**: Returns average scores for each trait.

### Generate Questions using LLM (Future)

- **URL**: `/llm/generate-questions`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "prompt": "Generate questions for trait OPENNESS"
  }
  ```
- **Response**: Returns a list of dynamically generated questions.

### Assess Responses using LLM (Future)

- **URL**: `/llm/assess`
- **Method**: `POST`
- **Request Body**: 
  ```json
  {
    "responses": [
      {
        "index": 0,
        "answer": 5
      },
      {
        "index": 1,
        "answer": 4
      }
    ]
  }
  ```
- **Response**: Returns assessment results processed by LLM.

## Future Work

- **Integration with LLM APIs**: Replace placeholder functions with actual LLM API calls for dynamic question generation and response assessment.
- **Advanced Validation and Checks**: Implement comprehensive validation and error handling for LLM responses.

## Example Usage

### Get All Questions
```bash
curl -X 'GET' 'http://127.0.0.1:8000/questions' -H 'accept: application/json'
```

### Get Questions by Trait
```bash
curl -X 'GET' 'http://127.0.0.1:8000/questions/OPENNESS' -H 'accept: application/json'
```

### Assess Responses
```bash
curl -X 'POST' 'http://127.0.0.1:8000/assess' -H 'accept: application/json' -H 'Content-Type: application/json' -d '{
  "responses": [
    {
      "index": 0,
      "answer": 5
    },
    {
      "index": 1,
      "answer": 4
    }
  ]
}'
```

### Generate Questions using LLM (Future)
```bash
curl -X 'POST' 'http://127.0.0.1:8000/llm/generate-questions' -H 'accept: application/json' -H 'Content-Type: application/json' -d '{
  "prompt": "Generate questions for trait OPENNESS"
}'
```

### Assess Responses using LLM (Future)
```bash
curl -X 'POST' 'http://127.0.0.1:8000/llm/assess' -H 'accept: application/json' -H 'Content-Type: application/json' -d '{
  "responses": [
    {
      "index": 0,
      "answer": 5
    },
    {
      "index": 1,
      "answer": 4
    }
  ]
}'
```
