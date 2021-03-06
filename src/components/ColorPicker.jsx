import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import Picker from  'react-color';

export const ColorPicker = React.createClass({
  getInitialState: function() {
    return {
      displayColorPicker: false,
      background: '#fff'
    };
  },
  handleClick: function(event) {
    this.props.setColorPicker();
    if (!this.state.displayColorPicker) {
      this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }
  },
  handleChange(color) {
    this.setState({ background: color.hex });
    this.props.setCustomColor(color.hex);
  },
  handleClose() {
    this.setState({ displayColorPicker: false });
  },
  render: function() {
    let styles = {
      button: {
        border: '2px solid #313131',
        backgroundColor: '#585858'
      },
      picker: {
        position: 'relative',
        bottom: '18.4em'
      }
    };

    if (this.props.colorPickerOn && this.state.displayColorPicker) {
      styles.button.color = '#BBBBBB';
      styles.button.border = '2px solid #BBBBBB';
    }

    return (
      <div>
        <div className="fa fa-paint-brush"
          onClick={this.handleClick}
          style={styles.button}>
        </div>
        <div style={styles.picker}>
          <Picker color={this.state.background}
            onChange={this.handleChange}
            onClose={this.handleClose}
            display={this.state.displayColorPicker}
            type="sketch" />
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    currentColor: state.present.get('currentColor'),
    colorPickerOn: state.present.get('colorPickerOn')
  };
}
export const ColorPickerContainer = connect(
  mapStateToProps,
  actionCreators
)(ColorPicker);
