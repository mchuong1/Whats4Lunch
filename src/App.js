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
    this.loadScript()
  }

  loadScript=()=>{
    var index = window.document.getElementsByTagName("link")[0]
    var link = window.document.createElement("link")
    link.href = "https://fonts.googleapis.com/css?family=Acme"
    link.rel = "stylesheet" 
    index.parentNode.insertBefore(link, index)
  }

}

export default App;
