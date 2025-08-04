import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import tutorialsService from './services/tutorials.service';

const TutorialsListComponent=()=>{

    const [tutorials,setTutorials]=useState([]);
    const [currentTutorial,setCurrentTutorial] =useState({});
  useEffect(()=>{
    retrieveTutorials();
  },[]);  

 const retrieveTutorials =(e)=>{   
    tutorialsService.getAll()
      .then((response)=>{
        console.log(response);
        setTutorials(response.data);
      })
 }
  
  
 const showTutorialDescription=(tutorial,index)=>{

    console.log(tutorial,index);
    setCurrentTutorial(tutorial);

 }
  
 
return(
 <>
    <h1>Tutorials Component List </h1>
    {tutorials && tutorials.map((tutorial,index)=>(
        <p onClick={()=>showTutorialDescription(tutorial,index)}>{tutorial.title}-{tutorial.description}</p>
        ))
    } 

    <br/>
    <p>Click on any tutorial to get description below</p>

      <h2>Selected Tutorial</h2>
      {currentTutorial.title}<br/>
      {currentTutorial.description}<br/>
      {currentTutorial.published? "It's Published":"It's Not Published"}<br/>
      <Link to={"/tutorials/" + currentTutorial.id}> Edit</Link>
    
	
 </>

);


}



export default TutorialsListComponent;
