import React, { useState } from "react";
import TextBox from "./Textbox";
import Dropdown from "./Dropdown";
import { faTrash, faPlus , faCheck} from '@fortawesome/free-solid-svg-icons';
import Button from "./Buttons";
import Icon from "../cards/Icon";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateSet = ({isDarkMode}) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [questions, setQuestions] = useState([{ question: '', answer: '' }]);
    const navigate = useNavigate();
    
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
        const setResponse = await axios.post("http://localhost:3500/flash/addSet", {
            title: title, 
            size: questions.length,
            category: category
        });
        if(setResponse.data) {
            console.log("added set successfully");
        } else {
            console.log("failed to add set");
        }
        const cards = questions.map((q) => ({
            question: q.question,
            answer: q.answer,
        }));
        const cardResponse = await axios.post("http://localhost:3500/flash/addCards", cards);
        console.log(cards);
        if(cardResponse.data) {
            console.log("added cards successfully");
        } else {
            console.log("failed to add cards");
        }

        if(cardResponse && setResponse) {
            navigate("/mySets")
        }
        } catch(error) {
            console.log("unexpected error occured");
        }
    };

    const handleTitleChange = value => {
        if(value.length <= 20) {
            setTitle(value);
        }
    };

    const handleCategoryChange = value => setCategory(value);
    
    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', answer: '' }]);
    };

    const handleRemoveQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
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
        <div className="form flex flex-column justify-center">
            <div className="mb3 pa3 flex flex-column justify-center " style={{borderRadius:'50px', backgroundColor: isDarkMode ? "#124a8b" : "#FFEFC5"}}>
                <TextBox label={"Title: "} value={title} onChange={handleTitleChange} isDarkMode={isDarkMode}/>
                {title.length === 20 && <p style={{ color: isDarkMode ? 'yellow' : 'red' }}>Title cannot exceed 20 characters.</p>}
                <Dropdown label={"Category: "} options={categories} value={category} onChange={handleCategoryChange} backgroundColor={'#EFD593'} backgroundColorDark={'#175aa6'} isDarkMode={isDarkMode}/>
            </div>
            {questions.map((q, index) => (
                <div key={index} className=" ba3 pa3 mb3" style={{borderRadius:'50px', backgroundColor: isDarkMode ? "#124a8b" : "#FFEFC5"}}>
                    <TextBox label={"Question: "} value={q.question} onChange={(value) => handleQuestionChange(index, value)} isDarkMode={isDarkMode}/>
                    <TextBox label={"Answer: "} value={q.answer} onChange={(value) => handleAnswerChange(index, value)} isDarkMode={isDarkMode}/>
                    <div className="flex flex-column items-center"><Icon icon={faTrash} onClick={() => handleRemoveQuestion(index)} color={'#00489C;'} onHoverColor={'black'}/></div>
                </div>
            ))}
            <div className="flex flex-row justify-center question-box ma3">
                <Button text={"Add question"} icon={faPlus} onClick={handleAddQuestion} isDarkMode={isDarkMode}/>
                <Button text={"I am finished!"} icon={faCheck} onClick={handleAddPress} isDarkMode={isDarkMode}/> 
            </div>
        </div>  
    );
}

export default CreateSet;