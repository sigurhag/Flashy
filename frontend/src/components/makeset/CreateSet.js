import React, { useState, setAnswer } from "react";
import TextBox from "./Textbox";
import Dropdown from "./Dropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus , faCheck} from '@fortawesome/free-solid-svg-icons';
import Button from "./Buttons";
import Icon from "../cards/Icon";


const CreateSet = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [questions, setQuestions] = useState([{ question: '', answer: '' }]);
    
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
    
    const handleTitleChange = value => setTitle(value);
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
            <div className="bg-color-card mb3 pa3 flex flex-column justify-center " style={{borderRadius:'50px'}}>
                <TextBox label={"Title: "} value={title} onChange={handleTitleChange}/>
                <Dropdown label={"Category: "} options={categories} value={category} onChange={handleCategoryChange} backgroundColor={'#EFD593'}/>
            </div>
            {questions.map((q, index) => (
                <div key={index} className="bg-color-card ba3 pa3 mb3" style={{borderRadius:'50px'}}>
                    <TextBox label={"Question: "} value={q.question} onChange={(value) => handleQuestionChange(index, value)}/>
                    <TextBox label={"Answer: "} value={q.answer} onChange={(value) => handleAnswerChange(index, value)}/>
                    <div className="flex flex-column items-center"><Icon icon={faTrash} onClick={() => handleRemoveQuestion(index)} color={'#00489C;'} onHoverColor={'black'}/></div>
                </div>
            ))}
            <div className="flex flex-row justify-center question-box ma3">
                <Button text={"Add question"} icon={faPlus} onClick={handleAddQuestion}/>
                <Button text={"I am finished!"} icon={faCheck} onClick={handleRemoveQuestion}/> {/* must implement save to database and add to my sets */}
            </div>
        </div>
    );
}

export default CreateSet;

