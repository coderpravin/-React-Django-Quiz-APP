import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./QuizDetail.css";

function QuizDetail() {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setselectedAnswers] = useState({});
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(0);

    const handleSubmit = async () =>{
        const formatedAnswers = Object.keys(selectedAnswers).map((questionId) => ({
            question_id: questionId,
            selected_option_id: selectedAnswers[questionId]
        }));

        try{
            const response = await fetch("https://react-django-quiz-app-1.onrender.com/api/quiz-submit/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ answers: formatedAnswers }),
        });

           const data = await response.json();
           // 🚀 Navigate to Result page
           navigate("/result", { state: { results: data } });

           console.log(data);

    } catch (error) {
        console.error("The eroor is", error);
    }
};

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/quiz/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            setQuiz(data);
            setTimeLeft(data.duration_minute * 60);
        })
        .catch((err) => console.error(err));
}, [id]);

 useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
}, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && quiz) {
        handleSubmit();
    }
}, [timeLeft]);

    // ⭐ IMPORTANT: wait until quiz loads
    if (!quiz) {
        return <h2>Loading quiz...</h2>;
    }

    const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

    // ⭐ MUST return JSX
    return (
        <div className="quiz-container">

            <div className="timer">
    ⏳          {formatTime(timeLeft)}
            </div>

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
                                onChange={() =>
                                    setselectedAnswers({
                                        ...selectedAnswers,
                                        [q.id]:opt.id
                                    })
                                }
                            />
                            {opt.text}
                        </label>

                    ))}
                </div>
            ))}

             {/* ⭐ Submit button at end */}
            <button className="submit-btn" onClick={handleSubmit}> Submit Quiz</button>
        </div>
    );
}

export default QuizDetail;