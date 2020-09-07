import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: '',
      success: 1,
      msg: "",
      error: null
    };
  }

  callAPI() {
    fetch("/api/get.php")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}


  componentDidMount() {
    this.callAPI();
}
  

  render () {
    if (this.state.error) {
      // return <div>Error: {this.state.error.message}</div>;
      return <div>{this.state.error.message}</div>;
    } else {
    return (
      <div className="App">
      <header className="App-header">
        <h1>Hello world!</h1>
      </header>
      <h2>{this.state.success}</h2>
      <h2>{this.state.apiResponse}</h2>
      <h2>{this.state.error}</h2>
    </div>
      );
    }
  }
  
}

export default App;
