import logo from './logo.svg';
import './App.css';

import ApiFetcher from './components/api-fetcher/api-fetcher.component'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          HubSpot API Project
        </p>
        <ApiFetcher/>
      </header>
    </div>
  );
}

export default App;
