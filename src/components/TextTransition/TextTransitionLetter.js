import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from "react-transition-group";
import { TweenLite, Power3, Power2, Back } from 'gsap';

import { randomBetween } from 'js/util';

const inDuration = 400;
const transformDuration = 200;
const transformDelay = 200;
const positionDuration = 100;
const outDuration = 200;

const timing = {
  in: inDuration / 1000,
  transform: transformDuration / 1000,
  transformDelay: transformDelay / 1000,
  position: positionDuration / 1000,
  out: outDuration / 1000
};

class TextTransitionLetter extends React.Component {
  static propTypes = {
    color: PropTypes.object.isRequired,
    char: PropTypes.string.isRequired,
    textSize: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired
  };

  static defaultProps = {
    color: {main: '#f00'},
    char: "",
    textSize: 16,
    x: 0
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.x !== this.props.x) {
      this.position(prevProps.x, this.props.x);
    }
  }

  getStyles() {
    return {
      color: this.props.color.main
    };
  }

  animateIn() {
    const yOffset = randomBetween(0.5, 1) * this.props.textSize;
    const rotation = randomBetween(-50, 50);
    const $letter = this.letter;
    TweenLite.to($letter, 0, {x: this.props.x});
    TweenLite.fromTo($letter, timing.in, { opacity: 0 }, { opacity: 1, ease: Power3.easeOut });
    TweenLite.fromTo($letter, timing.in, { scale: 0 }, { scale: 1, ease: Back.easeOut });
    TweenLite.to($letter, timing.transform, { y: -yOffset, ease: Power3.easeInOut });
    TweenLite.to($letter, timing.transform, {
      y: 0,
      ease: Power3.easeInOut,
      delay: timing.transformDelay
    });
    TweenLite.to($letter, timing.in, { rotation, ease: Power3.easeInOut });
    TweenLite.to($letter, timing.in, {
      rotation: 0,
      ease: Power3.easeInOut,
      delay: timing.transformDelay
    });
  }

  animateOut() {
    TweenLite.to(this.letter, timing.out, {
      opacity: 0,
      scale: 0,
      ease: Power2.easeIn,
    });
  }

  position(srcX, targetX) {
    TweenLite.to(this.letter, timing.position, {
      x: this.props.x + "px",
      ease: Power3.easeInOut
    });
  }

  render() {
    return (
      <Transition
        appear
        unmountOnExit
        in={this.props.in}
        timeout={{
          enter: inDuration,
          exit: outDuration
        }}
        onEnter={(node, isAppearing) => {
          this.animateIn();
        }}
        onExit={(node, isAppearing) => {
          this.animateOut();
        }}
      >
        <span
          className="text-transition-letter"
          style={this.getStyles()}
          ref={e => {
            this.letter = e;
          }}
        >
          {this.props.char}
        </span>
      </Transition>
    );
  }
}


export default TextTransitionLetter;