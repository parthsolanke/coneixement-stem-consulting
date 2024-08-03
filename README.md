# coneixement-STEM-consulting
A comprehensive tool to guide students in grades 8-12 towards suitable STEM career paths. Features include personality quizzes, career recommendations, and detailed result reports tailored to STEM fields.

### Project Structure

```
coneixement-STEM-consulting/
├── .github/
│   └── ISSUE_TEMPLATE/
│       └── feature_request.md  
├── docs/
│   ├── requirements.md
│   ├── contributing.md
│   └── code_of_conduct.md
├── backend/
│   ├── __init__.py
│   ├── main.py
│   ├── quiz/
│   │   ├── __init__.py
│   │   └──  # quiz modules
│   ├── report/
│   │   ├── __init__.py
│   │   └── generate_report.py
│   └── utils/
│       ├── __init__.py
│       └── # utility modules
├── frontend/
│   ├── public/
│   │   └── # public files
│   ├── src/
│   │   ├── components/
│   │   │   └── # React components
│   │   ├── styles/
│   │   │   └── # CSS/SCSS files
│   │   ├── App.js
│   │   ├── index.js
│   │   └── # other frontend modules
│   ├── package.json
│   └── # other configuration files
├── tests/
│   ├── __init__.py
│   ├── # personality quiz test modules
│   ├── test_report.py
│   └──  # utility test modules
├── .gitignore
├── README.md
├── requirements.txt
└── setup.py
```

## Getting Started

### Prerequisites

- Python 3.9+
- pip (Python package installer)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/parthsolanke/coneixement-STEM-consulting.git
   cd coneixement-STEM-consulting
   ```

2. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the application:
   ```bash
   python src/main.py
   ```

### Running Tests

To run tests, use:
```bash
pytest
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](docs/contributing.md) for more details.

### Useful Links

- [Requirements Document](docs/requirements.md)
- [Project Management Board](https://trello.com/b/RH2DBTCS)
- [Research & LLM Pricing DOC](https://docs.google.com/document/d/12oh_KOYfNRiwGIbGumEch-Kf-gEb5R6nJgYuz92nQL8/edit)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
