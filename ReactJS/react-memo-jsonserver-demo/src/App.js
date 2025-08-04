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
import CounterUsingRedux from './CounterUsingRedux';
import AppUsingReducer from './AppUsingReducer';
import UseMemoExample from './UseMemoExample';
import TutorialsComponent from './TutorialsComponent';
import ExpensiveCalculator from './ExpensiveCalculator';
import Parent from './Parent';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExpensiveCalculator/>}/>
        <Route index element={<Parent />} />
        <Route path='/login' element={<Login />} />
        <Route path="/garage" element={<Garage/>}/>
        <Route path="/timer" element={<Timer/>}/>
        <Route path="/counter" element={<Counter/>}/>
         <Route path="/tutorials" element={<TutorialsListComponent/>}/>
         <Route path="/tutorials/:id" element={<Tutorial/>} />
         <Route path="/addTutorials" element={<AddTutorial/>}/>
         <Route path="/tutorialsComponent" element={<TutorialsComponent />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
