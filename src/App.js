import './App.css';
import Map from './components/Map/Map.js';
import Title from './components/Title/Title.js';

function App() {
  return (
    <div className="App">
      <div className='w-screen h-screen flex flex-col items-center '>
        <Title text={ "PinPoint予報" } />
        <div className='w-9/12 h-4/6'>
          <Map />
        </div>
      </div>
    </div>
  );
}

export default App;
