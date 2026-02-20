import React from "react";
import { useLocation } from "react-router-dom";

function Result() {
    const location = useLocation();
    const data = location.state?.results;
 
    console.log("Location State", location.state)
    console.log("The Data Is", data)


    if (!data.result){
        return <h2>No results available</h2>;
    }

    const total = data.result.length;
    const correct = data.result.filter(r => r.is_correct).length;


    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Quiz Result</h1>
            <h2>Total Questions: {total}</h2>
            <h2>Correct Answers: {correct}</h2>
            <h2>Score: {Math.round((correct / total) * 100)}%</h2>
        </div>
    );

}

export default Result;