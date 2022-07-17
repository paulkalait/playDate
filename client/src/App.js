

import dog from './assets/images/dog.svg'
import Posts from '../src/components/Posts/Posts'
import Form from '../src/components/Form/Form'
import './App.css'


function App() {


  return (
 <div>
    <header className='header'>
      <h1>playDate</h1>
      <img src={dog} alt="doglogo" />
    </header>

    <div className='father'>
    <div className='div-for-posts-and-form'>

     <div className='Posts-container'>
      <Posts />
     </div>
     <div className='Form-container'>
      <Form />
     </div>
    </div>
    </div>
 
 </div>
  );
}

export default App;
