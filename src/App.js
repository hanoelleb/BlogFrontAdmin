import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';
import * as ROUTES from './constants/routes';
import LoginForm from './login';
import RegisterForm from './register';
import Blog from './blog';
import Page from './page';

function App() {
  return (
    <div className="App">
      <header className="App-header">
	  <Router>
              <Route exact path={ROUTES.admin + ROUTES.landing} 
	          component={LoginForm} />
	      <Route path={ROUTES.admin + ROUTES.register} 
	          component={RegisterForm} />
	      <Route exact path={ROUTES.admin + ROUTES.blog} 
	          component={Blog} />
              <Route exact path={ROUTES.admin + ROUTES.post}
                  component={Page} />
	  </Router>
      </header>
    </div>
  );
}

export default App;
