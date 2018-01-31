import React from 'react';
import PropTypes from 'prop-types';

class TextTransitionLetter extends React.Component {

  static propTypes = {
    color: PropTypes.string.isRequired,
    char: PropTypes.string.isRequired
  };

  static defaultProps = {
    color: '#fff',
    char: ''
  };

  constructor(props) {
    super(props);
  }

  getStyles() {
    return {
      color: this.props.color
    };
  }

  render() {
    return (
      <span style={this.getStyles()}>{this.props.char}</span>
    );
  }
}


export default TextTransitionLetter;