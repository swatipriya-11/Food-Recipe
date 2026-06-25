import React from 'react'
import foodRecipe from '../assets/foodRecipe.jpg'
import RecipeItem from '../components/RecipeItem'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'


function Home() {
    const navigate=useNavigate()
    const [isOpen,setIsOpen]=useState(false)

    const addRecipe=()=>{
        let token=localStorage.getItem("token")
        if(token)
         navigate("/addRecipe")
        else{
            setIsOpen(true)
        }
    }
  return (
    <>
    
        <section className="home">
            <div className="left">
                <h1>Food Recipe</h1>
                <h5>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</h5>
                <button onClick={addRecipe}>Share your recipe</button>
            </div>
            <div className="right">
                <img src={foodRecipe} width="320px" height="300px"></img>
            </div>
        </section>
        <div className="bg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,32L40,48C80,64,160,96,240,96C320,96,400,64,480,80C560,96,640,160,720,176C800,192,880,160,960,154.7C1040,149,1120,171,1200,160C1280,149,1360,107,1400,85.3L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
        </div>
     {(isOpen) && <Modal onclose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
        <div className='recipe'>
            <RecipeItem/>
        </div> 
    </>
  )
}

export default Home