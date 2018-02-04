import React from 'react';
import ReactResizeDetector from "react-resize-detector";
import PropTypes from 'prop-types';
import { TransitionGroup } from "react-transition-group";

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
    this.init(props);
  }

  init(props) {
    this.state = { ready: false, textSize: 0, letters: [] };
  }

  getLetters(text) {
    text = (text || '').trim();
    if(text.length === 0) return [];
    return text.split('').map((c, i) => {
      const color = this.getColor(i);
      return {
        char: c,
        idx: i,
        color
      };
    });
  }

  getColor(idx) {
    return TextTransition.colors[idx % TextTransition.colors.length];
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.width !== this.props.width || prevProps.text !== this.props.text) { // need update state
      this.updateState();
    } 
  }

  updateState() {
    const width = this.container.offsetWidth;
    let letters = this.getLetters(this.props.text);
    const letterLength = letters.length;
    let textSize = width / (letterLength + 2);
    textSize = Math.min(textSize, 100);
    //set and compute pos
    this.offScreenText.style.fontSize = textSize + "px";
    letters = letters.map((l, i) => {
      if (this.offScreenText.childNodes[i]) {
        let left = this.offScreenText.childNodes[i].offsetLeft;
        l.x = left;
        return l;
      }
    });
    this.setState({ ready: true, textSize, letters });
  }

  getDimensionStyle() {
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

  getOnScreenTextStyle() {
    const { textSize } = this.state;
    return {
      fontSize: textSize + 'px',
      lineHeight: textSize + 'px'
    };
  }

  render() {
    let { text } = this.props;
    let { letters, textSize } = this.state;
    const dimensionsStyles = this.getDimensionStyle();
    const offScreenText = (
      <p className="text-transition-offScreenText" ref={(e) => {this.offScreenText = e;}}>
        {text.split('').map((c, i) => (
          <span key={`${i}`}>{c}</span>
        ))}
      </p>
    );
    const onScreenText = this.state.ready ? (
      <TransitionGroup component='p' className="text-transition-onScreenText" style={this.getOnScreenTextStyle()}>
        {this.state.letters.map((l, i) => (
        <TextTransitionLetter {...l} key={`${i}`} textSize={textSize}></TextTransitionLetter>
        ))}
      </TransitionGroup>
    ) : undefined;
    return (
      <div className="text-transition" style={dimensionsStyles} ref={(e) => {this.container = e;}}>
        {offScreenText}
        {onScreenText}
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