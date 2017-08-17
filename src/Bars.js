import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated, ART } from "react-native";
const { Surface } = ART;

import Bar from "./animated/Bar";

export default class Bubbles extends Component {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    spaceBetween: PropTypes.number
  };

  static defaultProps = {
    spaceBetween: 4,
    size: 20,
    color: "#000"
  };

  state = {
    bars: [
      new Animated.Value(this.props.size),
      new Animated.Value(this.props.size),
      new Animated.Value(this.props.size),
      new Animated.Value(this.props.size),
      new Animated.Value(this.props.size)
    ]
  };

  componentDidMount() {
    this.state.bars.forEach((val, index) => {
      const timer = setTimeout(() => this.animate(index), index * 240);
      this.timers.push(timer);
    });
  }

  componentWillUnmount() {
    this.timers.forEach(timer => clearTimeout(timer));
    this.unmounted = true;
  }

  timers = [];

  animate(index) {
    let toto = 2.5;
    if (index === 0 || index === 4) toto = 1.2;
    else if (index === 1 || index === 3) toto = 2;
    Animated.sequence([
      Animated.timing(this.state.bars[index], {
        toValue: this.props.size * toto,
        duration: 600
      }),
      Animated.timing(this.state.bars[index], {
        toValue: this.props.size,
        duration: 600
      })
    ]).start(() => {
      if (!this.unmounted) {
        this.animate(index);
      }
    });
  }

  renderBar(index, y) {
    const { size, spaceBetween, color } = this.props;
    const width = size / 3;
    const x = width / 2 + (width + spaceBetween) * index;
    return (
      <Bar
        fill={color}
        width={width}
        height={this.state.bars[index]}
        originY={0.5 * size}
        originX={0.5}
        y={y}
        x={x}
      />
    );
  }

  render() {
    const { size, spaceBetween } = this.props;
    const width = size / 3 * 6 + spaceBetween * 4;
    const height = size * 5;

    return (
      <Surface width={width} height={height}  style={{
          backgroundColor: "transparent"
        }}>
        {this.renderBar(0, 5)}
        {this.renderBar(1, 5)}
        {this.renderBar(2, 5)}
        {this.renderBar(3, 5)}
        {this.renderBar(4, 5)}
      </Surface>
    );
  }
}
