import React, { Component } from "react";
import PropTypes from "prop-types";
import { ART } from "react-native";
const { Shape, Path } = ART;

export default class Bar extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };

  render() {
    let { width, height } = this.props;

    var path = new Path();

    if (width < 0) {
      path.moveTo(width, 0);
      width = -width;
    }
    if (height < 0) {
      path.moveTo(0, height);
      height = -height;
    }

    if (width < height) {
      var r = width / 2;
      path
        .moveTo(0, r)
        .arc(width, 0, r)
        .line(0, height - width)
        .arc(-width, 0, r)
        .line(0, width - height);
    } else {
      var r = height / 2;
      path
        .moveTo(r, 0)
        .line(width - height, 0)
        .arc(0, height, r)
        .line(height - width, 0)
        .arc(0, -height, r);
    }

    path.close();

    return <Shape {...this.props} d={path} y={(40 - height) / 2} />;
  }
}
