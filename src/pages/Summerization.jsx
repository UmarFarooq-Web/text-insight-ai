import React, { useState } from 'react'
import { InferenceClient } from "@huggingface/inference";
import NavBar from './NavBar';


const hf = new InferenceClient(import.meta.env.VITE_HF_TOKEN)

const Summarization = () => {
    const [Text, setText] = useState('')
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleClick = async () => {

        setLoading(true)
        setResult(null);

        try {
            const res = await hf.summarization({
                model: 'facebook/bart-large-cnn',
                inputs: Text,
            })

            setResult(res.summary_text)
        } catch (error) {
            console.log(" Error");
        }finally{
            setLoading(false)
        }

    }



    return (
        <div className='bg-gray-200 h-screen flex justify-center items-center relative'>
            <NavBar/>
            <div className='w-[500px] bg-white shadow-xl rounded p-5 flex flex-col items-center'>
                <h1 className=' text-blue-400 text-2xl font-bold ' >Text Summarization</h1>
                <textarea value={Text} onChange={handleChange} className='w-full my-4 mx-3 p-2 h-[200px] border-blue-300 border-2 rounded outline-blue-700' placeholder='Type Here'></textarea>
                <button className='py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer ' onClick={handleClick} >{loading?"Loading" : "Generate"}</button>
                {result && <div className={` border-black py-3  my-4 rounded-xl p-4 shadow-2xl `}>
                    {result}
                </div>}
            </div>
        </div>
    )
}

export default Summarization