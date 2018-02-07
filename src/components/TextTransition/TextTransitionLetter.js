import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from "react-transition-group";
import { TweenLite, Power3, Power2, Back } from 'gsap';

import { randomBetween, SVG } from 'js/util';

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
    x: PropTypes.number.isRequired,
    decoNum: PropTypes.number
  };

  static defaultProps = {
    color: { main: "#f00" },
    char: "",
    textSize: 16,
    x: 0,
    decoNum: 4
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.x !== this.props.x) {
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
    const $letterWrapper = this.letterWrapper;
    TweenLite.to($letterWrapper, 0, { x: this.props.x });
    TweenLite.fromTo(
      $letter,
      timing.in,
      { opacity: 0 },
      { opacity: 1, ease: Power3.easeOut }
    );
    TweenLite.fromTo(
      $letter,
      timing.in,
      { scale: 0 },
      { scale: 1, ease: Back.easeOut }
    );
    TweenLite.to($letter, timing.transform, {
      y: -yOffset,
      ease: Power3.easeInOut
    });
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
      ease: Power2.easeIn
    });
  }

  position(srcX, targetX) {
    TweenLite.to(this.letterWrapper, timing.position, {
      x: this.props.x + "px",
      ease: Power3.easeInOut
    });
  }

  componentDidMount() {
    if(this.props.char.trim() === "") return;
    for (let i = 0; i < this.props.decoNum; i++) {
      setTimeout(() => {
        this.addTriangle();
        this.addCircle();
      }, 0);
    }
  }

  getColorShade() {
    let shades = this.props.color.shades;
    if (shades && shades.length > 0) {
      return shades[~~(Math.random() * shades.length)];
    }
    return this.props.color.main;
  }

  addTriangle() {
    const tri = SVG.create("polygon");
    const $tri = tri.element;
    const textSize = this.props.textSize;
    const x0 = textSize / 2;
    const y0 = 0;
    const a = Math.random();
    const a2 = a + randomBetween(-0.2, 0.2);
    const r = textSize * 0.52;
    const r2 = r + textSize * Math.random() * 0.2;
    const x = x0 + r * Math.cos(2 * Math.PI * a);
    const y = y0 + r * Math.sin(2 * Math.PI * a);
    const x2 = x0 + r2 * Math.cos(2 * Math.PI * a2);
    const y2 = y0 + r2 * Math.sin(2 * Math.PI * a2);
    const triSize = textSize * 0.1;
    const scale = 0.3 + Math.random() * 0.7;
    const offset = triSize * scale;
    tri.set("points", `0,0 ${triSize * 2},0 ${triSize},${triSize * 2}`);
    tri.style("fill", this.getColorShade());
    this.svg.appendChild($tri);
    TweenLite.fromTo(
      $tri,
      0.6,
      {
        rotation: Math.random() * 360,
        scale: scale,
        x: x - offset,
        y: y - offset,
        opacity: 1
      },
      {
        x: x2 - offset,
        y: y2 - offset,
        opacity: 0,
        ease: Power1.easeInOut,
        onComplete: () => {
          this.svg.removeChild($tri);
        }
      }
    );
  }

  addCircle() {
    const circle = SVG.create("circle");
    const $circle = circle.element;
    const textSize = this.props.textSize;
    const a = Math.random();
    const x0 = textSize / 2;
    const y0 = 0;
    const r = textSize * 0.52;
    const r2 = r + textSize;
    const x = x0 + r * Math.cos(2 * Math.PI * a);
    const y = y0 + r * Math.sin(2 * Math.PI * a);
    const x2 = x0 + r2 * Math.cos(2 * Math.PI * a);
    const y2 = y0 + r2 * Math.sin(2 * Math.PI * a);
    const circSize = textSize * 0.05 * Math.random();
    circle.set("r", circSize);
    circle.style("fill", this.getColorShade());
    this.svg.appendChild($circle);
    TweenLite.fromTo(
      $circle,
      0.6,
      { x: x - circSize, y: y - circSize, opacity: 1 },
      {
        x: x2 - circSize,
        y: y2 - circSize,
        opacity: 0,
        ease: Power1.easeInOut,
        onComplete: () => {
          this.svg.removeChild($circle);
        }
      }
    );
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
          className="text-transition-letter-wrapper"
          ref={e => {
            this.letterWrapper = e;
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
          <svg
            className="text-transition-deco"
            viewBox={`0 0 ${this.props.textSize} ${this.props.textSize}`}
            ref={e => {
              this.svg = e;
            }}
          />
        </span>
      </Transition>
    );
  }
}


export default TextTransitionLetter;