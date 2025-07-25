import React, { useState } from 'react'
import { InferenceClient } from "@huggingface/inference";
import toast from 'react-hot-toast';
import NavBar from './NavBar';

const hf = new InferenceClient(import.meta.env.VITE_HF_TOKEN)

const QuestionAsnwering = () => {
    const [Text, setText] = useState('')
    const [Question , setQuestion] = useState('')
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleQuestionChange = (e) =>{
        setQuestion(e.target.value)
    }

    const handleClick = async () => {

        if(!Text) return toast.error("Enter Context")
        if(!Question) return toast.error("Enter Question")

        setLoading(true)
        setResult(null);

        try {
            const res = await hf.questionAnswering({
                model: 'distilbert/distilbert-base-uncased-distilled-squad',
                inputs: {
                    question:Question,
                    context:Text
                },
            })

            setResult(res.answer)
            console.log(res);
        } catch (error) {
            console.log(" Error : " , error);
        }finally{
            setLoading(false)
        }

    }



    return (
        <div className='bg-gray-200 h-screen flex justify-center items-center relative'>
            <NavBar/>
            <div className='w-[500px] bg-white shadow-xl rounded p-5 flex flex-col items-center'>
                <h1 className=' text-blue-400 text-2xl font-bold ' >Context Question Answers</h1>
                <textarea value={Text} onChange={handleChange} className='w-full my-4 mx-3 p-2 h-[200px] border-blue-300 border-2 rounded outline-blue-700' placeholder='Type Here'></textarea>
                <input onChange={handleQuestionChange} value={Question} type="text" className='w-full my-4 mx-3 p-2 border-blue-300 border-2 rounded outline-blue-700' placeholder='Ask Question Here' />
                <button className='py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer ' onClick={handleClick} >{loading?"Loading" : "Generate"}</button>
                {result && <div className={` border-black bg-gray-300 w-full py-3  my-4 rounded-xl p-4 `}>
                    <span className='font-bold'>Answer : </span>{result}
                </div>}
            </div>
        </div>
    )
}

export default QuestionAsnwering