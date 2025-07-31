import logo from './logo.svg';
import './App.css';
import Login from './Login'
import Garage from './Garage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoPage from './NoPage';
import Timer from './Timer';
import Counter from './Counter';
import TutorialsListComponent from './tutorials-list.component';
import AddTutorial from './AddTutorial';
import Tutorial from './Tutorial';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route index element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path="/garage" element={<Garage/>}/>
        <Route path="/timer" element={<Timer/>}/>
        <Route path="/counter" element={<Counter/>}/>
         <Route path="/tutorials" element={<TutorialsListComponent/>}/>
         <Route path="/tutorials/:id" element={<Tutorial/>} />
         <Route path="/addTutorials" element={<AddTutorial/>}/>

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
