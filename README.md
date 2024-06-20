# coneixement-STEM-consulting
A comprehensive tool to guide students in grades 8-12 towards suitable STEM career paths. Features include personality quizzes, career recommendations, and detailed result reports tailored to STEM fields.

### Project Structure

```
coneixement-STEM-consulting/
├── .github/
│   └── ISSUE_TEMPLATE/
│       └── feature_request.md
├── docs/
│   └── requirements.md
├── src/
│   ├── __init__.py
│   ├── main.py
│   ├── quiz/
│   │   ├── __init__.py
│   │   ├── aptitude.py
│   │   ├── personality.py
│   ├── report/
│   │   ├── __init__.py
│   │   └── generate_report.py
│   └── utils/
│       ├── __init__.py
│       └── helpers.py
├── tests/
│   ├── __init__.py
│   ├── test_aptitude.py
│   ├── test_personality.py
│   ├── test_report.py
│   ├── test_helpers.py
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
   cd STEM-Pathfinder
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
- [Project Management Board](https://trello.com/b/your-board-link)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Additional Files

**docs/requirements.md**
```markdown
# Requirements Document

## Conixement Requirements

- Quiz result to guide in career path
- Aptitude for specified degree (20-30 min max)
- Only target STEM careers
- END with generation of comprehensive result report
- Personality Quiz for 11th, 12th, 8th, 9th, 10th (phy, chem, math, bio)

```

**.github/ISSUE_TEMPLATE/feature_request.md**
```markdown
---
name: Feature request
about: Suggest an idea for this project
title: ''
labels: enhancement
assignees: ''

---

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

**requirements.txt**
```
pytest
flask
pandas
numpy
```

**setup.py**
```python
from setuptools import setup, find_packages

setup(
    name='STEM-Pathfinder',
    version='0.1',
    packages=find_packages(where='src'),
    package_dir={'': 'src'},
    install_requires=[
        'flask',
        'pandas',
        'numpy',
    ],
    entry_points={
        'console_scripts': [
            'stem-pathfinder=src.main:main',
        ],
    },
)
```
