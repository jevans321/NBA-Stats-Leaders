import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <Image src="assets/ajax-loader.gif" />
      </div>
    )
  }
}