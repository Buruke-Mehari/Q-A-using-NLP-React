import React, {useRef, useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';

import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner"
import {Fragment} from "react"

function App() {
  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState();
  const [model, setModel] = useState(null);

  const loadModel = async () => {
    const loadedModel = await qna.load()
    setModel(loadedModel);
    console.log('Model Loaded');
  }

  useEffect (() => {loadModel()}, [])
 const answerQuestion = async (e) => {
  if(e.which === 13 && model!==null){
    console.log('Question Submitted')
    const passage = passageRef.current.value
    const question = questionRef.current.value

    const answers = await model.findAnswers(question, passage)
    setAnswer(answers)
    console.log(answers)
  }
 }
  return (
    <div className="App">
      <header className="App-header">
       {model == null?
      <div>
        <div>Model Loading</div>
        <Loader 
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100} />
      </div> :
      <Fragment>
        passage
        <textarea ref={passageRef} rows="30" cols="100"></textarea>
        Ask a question
        <input ref={questionRef} onKeyPress={answerQuestion} size="80"></input>
        Answers
        {answer ? answer.map((ans,idx)=><div><b>Answer {idx+1} - </b>{ans.text} ({ans.score})</div>) :""}
      </Fragment>
        }
      </header>
    </div>
  );
}

export default App;
