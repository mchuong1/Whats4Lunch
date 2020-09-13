import React from 'react';
import Places from "./components/Places"

class App extends React.Component {
  constructor(){
    super()
  }

  render() {
    return (
      <div>
        <Places />
      </div>
    );
  }
  componentDidMount(){
  }
}

export default App;
