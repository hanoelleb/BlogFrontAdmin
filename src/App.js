import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';
import * as ROUTES from './constants/routes';
import LoginForm from './login';
import RegisterForm from './register';
import Blog from './blog';

function App() {
  return (
    <div className="App">
      <header className="App-header">
	  <Router>
              <Route exact path={ROUTES.landing} component={LoginForm} />
	      <Route path={ROUTES.register} component={RegisterForm} />
	      <Route path={ROUTES.blog} component={Blog} />
	  </Router>
      </header>
    </div>
  );
}

export default App;
