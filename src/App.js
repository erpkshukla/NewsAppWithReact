import './App.css';
import React, { Component } from 'react'
import NavBar from './component/NavBar';
import News from './component/News';

//import PropTypes from 'prop-types';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  pageSize = 15;
  apikey=process.env.REACT_APP_NEWS_API;
  country = 'us';

state ={
  progress:0
}
setProgress = (progress)=>{
this.setstate({progress: progress})
}


  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
           height={5}
        color='#f11946'
       
        progress={this.state.progress}
        //onLoaderFinished={() => setProgress(0)}
        />
          <Routes>
            {/* <Route path="/about" element={<News setProgress={this.setProgress}  apikey={this.apikey} pageSize={this.pageSize} country={this.country} category="sports" />} /> */}
            <Route exact path="/Business" element={<News setProgress={this.setProgress}  apikey={this.apikey} key="Business" pageSize={this.pageSize} country={this.country} category="Business" />} />
            <Route exact path="/Entertainment" element={<News setProgress={this.setProgress}  apikey={this.apikey} key="Entertainment" pageSize={this.pageSize} country={this.country} category="Entertainment" />} />
            <Route exact path="/General" element={<News setProgress={this.setProgress}  apikey={this.apikey} key="General" pageSize={this.pageSize} country={this.country} category="General" />} />
            <Route exact path="/Health" element={<News setProgress={this.setProgress}  apikey={this.apikey} key="Health" pageSize={this.pageSize} country={this.country} category="Health" />} />
            <Route exact path="/Science" element={<News setProgress={this.setProgress}  apikey={this.apikey} key="Science" pageSize={this.pageSize} country={this.country} category="Science" />} />
            <Route exact path="/Sports" element={<News setProgress={this.setProgress}  apikey={this.apikey} key="Sports" pageSize={this.pageSize} country={this.country} category="Sports" />} />
            <Route exact path="/Technology" element={<News setProgress={this.setProgress}  apikey={this.apikey} key="Technology" pageSize={this.pageSize} country={this.country} category="Technology" />} />
          </Routes>
        </Router>
      </div>
    )

  }
}
