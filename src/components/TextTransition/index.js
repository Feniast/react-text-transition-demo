import React from 'react';
import ReactResizeDetector from "react-resize-detector";
import PropTypes from 'prop-types';

import {isNumeric} from 'js/util';

import TextTransitionLetter from './TextTransitionLetter';

import './styles.scss';

class TextTransition extends React.Component {
  static colors = [
    { main: "#FBDB4A", shades: ["#FAE073", "#FCE790", "#FADD65", "#E4C650"] },
    { main: "#F3934A", shades: ["#F7B989", "#F9CDAA", "#DD8644", "#F39C59"] },
    { main: "#EB547D", shades: ["#EE7293", "#F191AB", "#D64D72", "#C04567"] },
    { main: "#9F6AA7", shades: ["#B084B6", "#C19FC7", "#916198", "#82588A"] },
    { main: "#5476B3", shades: ["#6382B9", "#829BC7", "#4D6CA3", "#3E5782"] },
    { main: "#2BB19B", shades: ["#4DBFAD", "#73CDBF", "#27A18D", "#1F8171"] },
    { main: "#70B984", shades: ["#7FBE90", "#98CBA6", "#68A87A", "#5E976E"] }
  ];

  constructor(props) {
    super(props);
    this.state = {
      textSize: 0,
      letters: []
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    console.log('text-transition width: ' + this.container.offsetWidth);
  }

  getDimensions() {
    let { width, height } = this.props;
    width = isNumeric(width) ? width + "px" : width;
    height = isNumeric(height) ? height + "px" : height;
    width = width || "100%";
    height = height || "100%";
    return {
      width,
      height
    };
  }

  render() {
    let { text } = this.props;
    const dimensionsStyles = this.getDimensions();
    return (
      <div className="text-transition" style={dimensionsStyles} ref={(e) => {this.container = e;}}>
        <p className="text-transition-offScreenText">
          {text.split('').map((c, i) => (
            <span key={`${i}`}>{c}</span>
          ))}
        </p>
        <p className="text-transition-onScreenText">
          {text.split('').map((c, i) => (
          <TextTransitionLetter char={c} key={`${i}`} color="#f00"></TextTransitionLetter>
          ))}
        </p>
      </div>
    );
  }
}



TextTransition.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  text: PropTypes.string.isRequired
};

TextTransition.defaultProps = {
  width: '100%',
  height: '100%',
  text: ''
};

export default TextTransition;