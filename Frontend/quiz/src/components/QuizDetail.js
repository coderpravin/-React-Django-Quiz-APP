import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./QuizDetail.css";

function QuizDetail() {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/quiz/${id}/`)
            .then((res) => res.json())
            .then((data) => setQuiz(data))
            .catch((err) => console.error(err));
    }, [id]);

    // ⭐ IMPORTANT: wait until quiz loads
    if (!quiz) {
        return <h2>Loading quiz...</h2>;
    }

    // ⭐ MUST return JSX
    return (
        <div className="quiz-container">
            <h1 className="quiz-title">{quiz.title}</h1>

            {quiz.questions.map((q) => (
                <div key={q.id} className="question-card">
                    <h3 className="question-text">{q.text}</h3>

                    {q.options.map((opt) => (
                        <label key={opt.id} className="option-label">
                            <input
                                type="radio"
                                name={`question-${q.id}`}   // same name → only one option selectable
                                value={opt.id}
                            />
                            {opt.text}
                        </label>

                    ))}
                </div>
            ))}

             {/* ⭐ Submit button at end */}
            <button className="submit-btn">Submit Quiz</button>
        </div>
    );
}

export default QuizDetail;