# utils/context.py
QUIZ_CONTEXT = [
    {
        "role": "user",
        "parts": [
            {
                "text": """
                        Generate a new quiz for career guidance based on the following details:
                        Extracurricular Interests: Sports, Music, Art
                        Subjects of Interest: History, Science
                        Age: 19

                        The quiz should be engaging, age-appropriate, and designed to help the user discover potential career paths based on their interests. 
                        Each question should be a statement rather than a "WH" question, allowing the user to respond using the following options:
                        - Strongly Agree
                        - Agree
                        - Disagree
                        - Strongly Disagree

                        Ensure that the statements reflect attitudes, preferences, or opinions related to the user's interests and career aspirations.
                        """
            }
        ]
    },
    {
        "role": "model",
        "parts": [
            {
                "text": 
                """{
                    "questions": [
                        {
                            "index": 0,
                            "question": "I feel most fulfilled when I am actively engaged in physical activities or sports.",
                            "trait": "Physical Activity Preference"
                        },
                        {
                            "index": 1,
                            "question": "I often find myself imagining creative ideas or unique ways to express myself through art or music.",
                            "trait": "Creativity & Expression"
                        },
                        {
                            "index": 2,
                            "question": "I enjoy analyzing past events and understanding how they shape the present and future.",
                            "trait": "Historical Thinking & Analysis"
                        },
                        {
                            "index": 3,
                            "question": "I am fascinated by scientific discoveries and enjoy experimenting with new ideas.",
                            "trait": "Scientific Curiosity & Innovation"
                        },
                        {
                            "index": 4,
                            "question": "I feel confident when leading a team or guiding others toward a common goal.",
                            "trait": "Leadership & Decision-Making"
                        },
                        {
                            "index": 5,
                            "question": "I naturally pay close attention to details and prefer structured tasks over flexible ones.",
                            "trait": "Attention to Detail & Organization"
                        },
                        {
                            "index": 6,
                            "question": "I thrive in collaborative environments where I can work closely with others to achieve a goal.",
                            "trait": "Teamwork & Interpersonal Skills"
                        },
                        {
                            "index": 7,
                            "question": "I often put myself in others' shoes and feel a strong desire to help and support people.",
                            "trait": "Empathy & Human Connection"
                        },
                        {
                            "index": 8,
                            "question": "I enjoy tackling complex problems that require logical reasoning and critical thinking.",
                            "trait": "Analytical & Problem-Solving Skills"
                        },
                        {
                            "index": 9,
                            "question": "I prefer working in environments where tasks are clearly defined, and expectations are structured.",
                            "trait": "Preference for Stability & Structure"
                        },
                        {
                            "index": 10,
                            "question": "I am excited by the idea of exploring different career paths and stepping into new opportunities.",
                            "trait": "Openness to Career Exploration"
                        },
                        {
                            "index": 11,
                            "question": "I feel most motivated when I set ambitious goals and strive to outperform my previous achievements.",
                            "trait": "Ambition & Goal-Setting"
                        },
                        {
                            "index": 12,
                            "question": "I enjoy crafting compelling narratives and communicating ideas effectively through writing.",
                            "trait": "Communication & Storytelling"
                        },
                        {
                            "index": 13,
                            "question": "I am passionate about designing, building, or creating things with my hands.",
                            "trait": "Hands-On Creativity & Practical Skills"
                        },
                        {
                            "index": 14,
                            "question": "I am curious about how people think, behave, and interact in different situations.",
                            "trait": "Psychology & Human Behavior"
                        }
                    ]
                }
                """
            }
        ]
    }
]

REPORT_CONTEXT = [
    {
        "role": "user",
        "parts": [{
            "text": """Generate a career guidance report for the following assessment:
                    Trait Scores: 
                    - Mathematical: 85
                    - Analytical: 90
                    - Creative: 75
                    
                    Strengths: ["problem-solving", "analytical thinking"]
                    Weaknesses: ["communication", "teamwork"]"""
        }]
    },
    {
        "role": "model",
        "parts": [{
            "text": """{
                "report": {
                    "profile_overview": {
                        "title": "Technical Problem-Solver Profile",
                        "description": "Strong analytical capabilities with focus on mathematical and logical thinking",
                        "key_characteristics": ["Analytical mindset", "Technical aptitude", "Independent worker"]
                    },
                    "strength_academic_mapping": {
                        "title": "Academic Strengths Analysis",
                        "mappings": [{
                            "strength": "Analytical Thinking",
                            "academic_fields": ["Computer Science", "Engineering", "Mathematics"],
                            "potential_applications": "Strong foundation for technical and research roles"
                        }]
                    },
                    "growth_areas": {
                        "title": "Development Opportunities",
                        "description": "Areas identified for professional growth",
                        "development_paths": [{
                            "area": "Communication Skills",
                            "improvement_strategies": ["Join public speaking clubs", "Practice technical writing"],
                            "related_fields": "Essential for technical leadership roles"
                        }]
                    },
                    "educational_pathways": {
                        "title": "Recommended Educational Paths",
                        "paths": [{
                            "field": "Computer Science",
                            "alignment": "Matches analytical strengths",
                            "potential_outcomes": ["Software Engineer", "Data Scientit", "Systems Architect"]
                        }]
                    },
                    "career_exploration": {
                        "title": "Potential Career Paths",
                        "paths": [{
                            "field": "Software Development",
                            "why_consider": "Leverages analytical and problem-solving skills",
                            "required_skills": ["Programming", "System Design", "Problem Solving"],
                            "growth_potential": "High demand with continuous learning opportunities"
                        }]
                    },
                    "reflection_questions": {
                        "title": "Self-Reflection Points",
                        "questions": [
                            "How do you see yourself applying your analytical skills?",
                            "What type of work environment helps you perform best?"
                        ]
                    }
                }
            }"""
        }]
    }
]