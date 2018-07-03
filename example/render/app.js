import React, { Component } from 'react';
import {
  FormControl, Select, MenuItem, InputLabel, TextField
} from '@material-ui/core';

import Keyboard, { KeyboardButton } from '../../src';

require('../public/styles/normalize.css');
require('../public/styles/App.css');

const STAGE_STYLE = Object.freeze({
  backgroundColor: '#90CAF9',
  backgroundSize: '100% auto',
  position: 'relative',
  width: '100%',
  height: '100%'
});

const TYPE_LIST = [{ key: 'text', value: 'Text' }, { key: 'email', value: 'E-mail' }, { key: 'password', value: 'Password' }];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
  }

  onReturnValue = (value = '') => {
    this.setState({
      value,
      showKeyboard1: false,
      showKeyboard2: false
    });
  }

  onChangeValue = (value = '') => {
    this.setState({ value });
  }

  initState = () => {
    return {
      type: 'text',
      value: '',
      showKeyboard1: false,
      showKeyboard2: false
    };
  }

  handleKeyboard1Display = () => {
    this.setState({
      showKeyboard1: true
    });
  }

  handleKeyboard2Display = () => {
    this.setState({
      showKeyboard2: true
    });
  }

  handleCallbackClick = (action = '') => {
    const { value } = this.state;
    switch (action) {
      case 'Back': {
        this.setState({ showKeyboard2: false });
        break;
      }
      default: {
        this.setState({ value: `${value}${action}` });
        break;
      }
    }
  }

  render() {
    const {
      type,
      value,
      showKeyboard1,
      showKeyboard2
    } = this.state;

    return (
      <div style={STAGE_STYLE} ref={(s) => { this.stage = s; }}>
        <div style={{ width: '95%', margin: '5px auto' }}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => { this.setState({ type: e.target.value }); }}
            >
              {
                TYPE_LIST.map((item, i) => (<MenuItem key={`type${i + 1}`} value={item.key}>{item.value}</MenuItem>))
              }
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Keyboard 1"
            type={type}
            value={value}
            onChange={e => this.setState({ value: e.target.value })}
            onFocus={() => this.handleKeyboard1Display()}
          />
          <TextField
            fullWidth
            label="Keyboard 2"
            type={type}
            value={value}
            onChange={e => this.setState({ value: e.target.value })}
            onFocus={() => this.handleKeyboard2Display()}
          />
        </div>
        <Keyboard
          showKeyboard={showKeyboard1}
          type={type}
          value={value}
          onReturnValue={this.onReturnValue}
        />
        <Keyboard
          showKeyboard={showKeyboard2}
          type={type}
          value={value}
          onChangeValue={this.onChangeValue}
          onReturnValue={this.onReturnValue}
          enableDefaultButton={false}
          leftButtons={[
            <KeyboardButton key="leftButton1" value="Back" onClick={this.handleCallbackClick} />,
            <KeyboardButton key="leftButton2" value=".com" onClick={this.handleCallbackClick} />
          ]}
        />
      </div>
    );
  }
}

export default (App);
