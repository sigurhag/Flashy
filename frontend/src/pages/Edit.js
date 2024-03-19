import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextBox from "../components/makeset/Textbox";
import Dropdown from "../components/makeset/Dropdown";
import { faTrash, faPlus, faCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from "../components/makeset/Buttons";
import Icon from "../components/cards/Icon";
import axios from 'axios';
import UserProfileIcon from '../components/profile/UserProfileIcon';
import Sidebar from '../components/sidebar/Sidebar';

const EditPage = ({isDarkMode}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([{ question: '', answer: '' }]);
  const navigate = useNavigate();
  const location = useLocation();
  const { setID } = location.state;
  const categories = [
    { label: 'Art', value: 'art' },
    { label: 'Culture', value: 'culture' },
    { label: 'Fun', value: 'fun' },
    { label: 'Geography', value: 'geography' },
    { label: 'Health', value: 'health' },
    { label: 'History', value: 'history' },
    { label: 'Language', value: 'language' },
    { label: 'Literature', value: 'literature' },
    { label: 'Math', value: 'math' },
    { label: 'Music', value: 'music' },
    { label: 'Science', value: 'science' },
    { label: 'Sports', value: 'sports' },
    { label: 'Technology', value: 'technology' },
    { label: 'Other', value: 'other' },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const setResponse = await axios.post("http://localhost:3500/flash/fetchSet",{setID });
        if (setResponse.data) {
          setTitle(setResponse.data.setName)
          setCategory(setResponse.data.theme)
        }

        const cardResponse = await axios.post("http://localhost:3500/flash/fetchCards", {setID });
        
        if (cardResponse.data) {
          const cardInfo = cardResponse.data.map(card => ({
            question: card.question,
            answer: card.answer
          }));
          setQuestions(cardInfo);
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [setID])

  const handleReturnPress = () => {
    navigate(-1)
  }

  const handleSavePress = async () => {
    try {
      const setResponse = await axios.post("http://localhost:3500/flash/updateSet", {
            title: title, 
            size: questions.length,
            category: category,
            setID: setID 
        });
        if(setResponse.data) {
            console.log("updated set successfully");
        } else {
            console.log("failed to updated set");
        }

        const cards = questions.map((q) => ({
          question: q.question,
          answer: q.answer,
      }));
      console.log(cards);
      const cardResponse = await axios.post("http://localhost:3500/flash/updateCard", cards, {params: { setID: setID }});
      if(cardResponse.data) {
          console.log("updated cards successfully");
      } else {
          console.log("failed to update cards");
      }
    } catch (error) {
      console.log(error);
    }
    navigate(-1);
  }

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

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <UserProfileIcon isDarkMode={isDarkMode}/>
      <Sidebar isDarkMode={isDarkMode}/>
      <div className={'flex flex-column items-center fixed-top-middle ' + (isDarkMode ? 'dark-mode' : '')}>
        <h1 className='f1 mt3 mb1'>FLASHY</h1>
        <h2 className='f2 mt1'>Edit set</h2>      
      </div>
      <div className='form flex flex-column items-center' style={{ marginTop: '27vh' }}>
      <div className="mb3 pa3 flex flex-column justify-center " style={{borderRadius:'50px', backgroundColor: isDarkMode ? "#124a8b" : "#FFEFC5"}}>
                <TextBox label={"Title: "} value={title} onChange={handleTitleChange} isDarkMode={isDarkMode}/>
                {title.length === 20 && <p style={{ color: isDarkMode ? 'yellow' : 'red' }}>Title cannot exceed 20 characters.</p>}
                <Dropdown label={"Category: "} options={categories} value={category} onChange={handleCategoryChange} backgroundColor={'#EFD593'} backgroundColorDark={'#175aa6'} isDarkMode={isDarkMode}/>
            </div>
            {questions.map((c, index) => (
                <div key={index} className=" ba3 pa3 mb3" style={{borderRadius:'50px', backgroundColor: isDarkMode ? "#124a8b" : "#FFEFC5"}}>
                    <TextBox label={"Question: "} value={c.question} onChange={(value) => handleQuestionChange(index, value)} isDarkMode={isDarkMode}/>
                    <TextBox label={"Answer: "} value={c.answer} onChange={(value) => handleAnswerChange(index, value)} isDarkMode={isDarkMode}/>
                    <div className="flex flex-column items-center"><Icon icon={faTrash} onClick={() => handleRemoveQuestion(index)} color={'#00489C;'} onHoverColor={'black'}/></div>
                </div>
            ))}
        <div className="flex flex-row justify-center question-box ma3">
          <Button text={" Back to"} icon={faArrowLeft} onClick={handleReturnPress} />
          <Button text={"Add question"} icon={faPlus} onClick={handleAddQuestion} />
          <Button text={"Save updates!"} icon={faCheck} onClick={handleSavePress} />
        </div>
    </div>
    </div>
  );
};

export default EditPage;
