import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSuccess.css";

function LoginSucess() {

    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);

    //Fetch List when page open
    useEffect(() => {
        fetch("https://react-django-quiz-app-1.onrender.com/api/quiz-list/")
            .then((res) => res.json())
            .then((data) => setQuizzes(data))
            .catch((error) => console.log("the Error is", error));
    }, []);

    const handleLogout = async () => {
        try {
            await fetch("https://react-django-quiz-app-1.onrender.com/api/user-logout/", {
                method: "POST"
            });

            navigate('/login');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className="quiz-container">
            <h1> Available Quizzes</h1>
            {quizzes.length === 0 ? <p>No Quiz Found</p> : null}
            <div className="quiz-grid">
                {quizzes.map((quiz) => (
                    <div
                        key={quiz.id}
                        className="quiz-card"
                        onClick={() => navigate(`/quiz/${quiz.id}`)}
                    >
                        <h3>{quiz.title}</h3>
                        <p>{quiz.description}</p>
                        <p>Duration: {quiz.duration_minute} min</p>
                    </div>
                ))}
            </div>

        </div>

    );
}

export default LoginSucess;
