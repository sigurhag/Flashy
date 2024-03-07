import React, { useState, setAnswer } from "react";
import TextBox from "./Textbox";
import Dropdown from "./Dropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus , faCheck} from '@fortawesome/free-solid-svg-icons';
import Button from "./Buttons";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateSet = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [questions, setQuestions] = useState([{ question: '', answer: '' }]);
    const navigate = useNavigate();
    
    // ...
    const categories = [
        {label: 'Art', value: 'art'},
        {label: 'Culture', value: 'culture'},
        {label: 'Fun', value: 'fun'},
        {label: 'Geography', value: 'geography'},
        {label: 'Health', value: 'health'},
        {label: 'History', value: 'history'},
        {label: 'Language', value: 'language'},
        {label: 'Literature', value: 'literature'},
        {label: 'Math', value: 'math'},
        {label: 'Music', value: 'music'},
        {label: 'Science', value: 'science'},
        {label: 'Sports', value: 'sports'},
        {label: 'Technology', value: 'technology'},
        {label: 'Other', value: 'other'},
    ]
    const handleAddPress = async() => {
        try {
        const response = await axios.post("http://localhost:3500/flash/addSet", {
            title: title, 
            size: questions.length,
            category: category
        });
        console.log(title);
        if(response.data) {
            navigate("/mySets")
            console.log("added set successfully");
        } else {
            console.log("failed to add set");
        }
        } catch(error) {
            console.log("unexpected error occured")
        }
    };

    const handleTitleChange = value => setTitle(value);
    const handleCategoryChange = value => setCategory(value);
    
    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', answer: '' }]);
    };

    const handleRemoveQuestion = () => {
        if (questions.length > 1) {
            setQuestions(questions.slice(0, -1));
        }
    };

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = value;
        setQuestions(updatedQuestions);
    };

    const handleAnswerChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].answer = value;
        setQuestions(updatedQuestions);
    };

    return(
        <div className="form flex flex-column justify-center align-center">
            <div className="bg-color-card ma3 pa3 " style={{borderRadius:'60px'}}>
                <TextBox label={"Title: "} value={title} onChange={handleTitleChange}/>
                <Dropdown label={"Category: "} options={categories} value={category} onChange={handleCategoryChange}/>
            </div>
            {questions.map((q, index) => (
                <div key={index} className="bg-color-card ma3 pa3" style={{borderRadius:'60px'}}>
                    <TextBox label={"Question: "} value={q.question} onChange={(value) => handleQuestionChange(index, value)}/>
                    <TextBox label={"Answer: "} value={q.answer} onChange={(value) => handleAnswerChange(index, value)}/>
                </div>
            ))}
            <div className="flex flex-row justify-center question-box">
                <Button text={"Add question"} icon={faPlus } onClick={handleAddQuestion}/>
                <Button text={"Remove question"} icon={faTrash} onClick={handleRemoveQuestion}/>
                <Button text={"I am finished!"} icon={faCheck} onClick={handleAddPress}/>
            </div>
        </div>
    );
}

export default CreateSet;

