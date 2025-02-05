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
