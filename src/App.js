import React from 'react';
import './css/styles.scss';

import TextTransition from './components/TextTransition';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Hello World'
    };

    setTimeout(() => {
      this.setState({
        text: 'Hello Tang'
      });
    }, 5000);
  }

  render() {
    return (
      <TextTransition text={this.state.text} width="800px"></TextTransition>
    );
  }
}
  

export default App;
