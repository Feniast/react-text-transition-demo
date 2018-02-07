import React from 'react';
import './css/styles.scss';

import TextTransition from './components/TextTransition';

const TEXT = 'Hello, I\'m Tang';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.tId = null;
    this.state = {
      i: 0
    };
  }

  componentDidMount() {
    this.updateText();
  }

  updateText() {
    if(this.state.i === TEXT.length) return;
    this.setState((prevState) => ({i: prevState.i + 1}));
    setTimeout(() => {
      this.updateText();
    }, 300);
  }

  render() {
    return (
      <TextTransition text={TEXT.slice(0, this.state.i)} width="800px"></TextTransition>
    );
  }
}
  

export default App;
