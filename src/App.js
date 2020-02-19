import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import abministrator from './Administrator/abministrator';
import signin from './Signin/signin';
import signup from './Signup/signup';
import index from './Myblogindex/myblogindex';
import user from './User/user';
import write from './Write/write';
import article from './Article/article';

class App extends React.Component{
    
    render () {
        return(
            <Router >
                <div>
                    <Route exact path="/" component={signin} />
                    <Route exact path="/Abministrator" component={abministrator} />
                    <Route exact path="/signup" component={signup} />
                    <Route exact path="/index" component={index} />
                    <Route exact path="/user" component={user} />
                    <Route exact path="/writer" component={write} />
                    <Route exact path="/article/:id" component={article}/>
                </div>
            </Router>
        );
    }
}

export default App;
