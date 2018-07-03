import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import KeyboardButton from './keyboardbutton';

import LatinLayout from './layouts/latinlayout';
import SymbolsLayout from './layouts/symbolslayout';

import BackspaceIcon from './icons/backspaceicon';
import LanguageIcon from './icons/languageicon';
import ShiftIcon from './icons/shifticon';

class Keyboard extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    showKeyboard: PropTypes.bool,
    enableDefaultButton: PropTypes.bool,
    leftButtons: PropTypes.arrayOf(PropTypes.node),
    rightButtons: PropTypes.arrayOf(PropTypes.node),
    type: PropTypes.oneOf(['text', 'password', 'email']),
    value: PropTypes.string,
    isFirstLetterUppercase: PropTypes.bool,
    layouts: PropTypes.arrayOf(PropTypes.shape({
      symbolsKeyValue: PropTypes.string,
      layout: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
    })),
    onChangeValue: PropTypes.func,
    onReturnValue: PropTypes.func.isRequired
  };

  static defaultProps = {
    style: {},
    showKeyboard: false,
    enableDefaultButton: true,
    leftButtons: [],
    rightButtons: [],
    type: 'text',
    value: '',
    isFirstLetterUppercase: false,
    layouts: [LatinLayout]
  };

  constructor(props) {
    super(props);
    this.state = this.getNewState(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.value !== prevState.value ||
      this.props.isFirstLetterUppercase !== prevProps.isFirstLetterUppercase ||
      this.state.showKeyboard !== prevState.showKeyboard ||
      this.state.layouts !== prevState.layouts
    ) {
      this.refreshContext({ uppercase: this.isUppercase(this.state.value) });
      if (this.props.onChangeValue && this.state.value !== prevState.value) {
        this.props.onChangeValue(this.state.value);
      }
      if (this.inputNode && this.state.showKeyboard) {
        this.inputNode.focus();
      }
    }

    if (
      this.props.style !== prevProps.style ||
      this.props.showKeyboard !== prevProps.showKeyboard ||
      this.props.enableDefaultButton !== prevProps.enableDefaultButton ||
      this.props.leftButtons !== prevProps.leftButtons ||
      this.props.rightButtons !== prevProps.rightButtons ||
      this.props.type !== prevProps.type ||
      this.props.value !== prevProps.value ||
      this.props.isFirstLetterUppercase !== prevProps.isFirstLetterUppercase ||
      this.props.layouts !== prevProps.layouts
    ) {
      const newState = this.getNewState(this.props, prevProps);
      this.refreshContext(newState);
    }
  }

  getNewState = (newProps = {}, oldProps = {}) => {
    const newState = {};

    if (newProps.style !== oldProps.style || newProps.showKeyboard !== oldProps.showKeyboard) {
      newState.style = Object.assign({
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        margin: '0 auto'
      }, newProps.style || {}, { visibility: newProps.showKeyboard ? 'visible' : 'collapse' });
    }

    if (!this.state) {
      const numberListBtn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((btn) => {
        return (<KeyboardButton key={btn} value={btn} onClick={this.handleLetterButtonClick} />);
      });
      Object.assign(newState, {
        keyStyle: {
          width: '100%',
          maxWidth: '1030px',
          margin: '0 auto',
          background: '#dadada',
          boxShadow: '0px 2px 12px 0px rgba(0,0,0,0.5)'
        },
        keyRowStyle: { display: 'flex' },
        keyBtnStyle: { flexGrow: 1 },
        keyHalfBtnStyle: { flexGrow: 0.5 },
        numberListBtn,
        backspaceBtn: (<KeyboardButton value={<BackspaceIcon />} onClick={this.handleBackspaceClick} />),
        shiftBtn: (<KeyboardButton value={<ShiftIcon />} onClick={this.handleShiftClick} />),
        langBtn: (<KeyboardButton value={<LanguageIcon />} onClick={this.handleLanguageClick} />),
        atBtn: (<KeyboardButton value="@" onClick={this.handleLetterButtonClick} />),
        spaceBtn: (<KeyboardButton style={{ flexGrow: 4 }} value=" " onClick={this.handleLetterButtonClick} />),
        dotBtn: (<KeyboardButton value="." onClick={this.handleLetterButtonClick} />)
      });
    }

    if (!this.state || newProps.leftButtons !== oldProps.leftButtons || newProps.enableDefaultButton !== oldProps.enableDefaultButton) {
      const leftButtons = newProps.leftButtons || [];
      if (leftButtons.length === 0 && newProps.enableDefaultButton) {
        Object.assign(newState, { leftButtons: [<KeyboardButton key="leftButton1" value="Cancel" onClick={this.handleCallbackClick} />] });
      } else {
        Object.assign(newState, { leftButtons });
      }
    }

    if (!this.state || newProps.rightButtons !== oldProps.rightButtons || newProps.enableDefaultButton !== oldProps.enableDefaultButton) {
      const rightButtons = newProps.rightButtons || [];
      if (rightButtons.length === 0 && newProps.enableDefaultButton) {
        Object.assign(newState, { rightButtons: [<KeyboardButton key="rightButton1" style={{ flexGrow: 1, backgroundColor: '#63b324', borderColor: '#63b324', color: '#ffffff' }} value="Submit" onClick={this.handleCallbackClick} />] });
      } else {
        Object.assign(newState, { rightButtons });
      }
    }

    if (!this.state || newProps.layouts !== oldProps.layouts) {
      const layouts = newProps.layouts || [LatinLayout];
      const currentLayout = 0;
      const showSymbols = false;

      Object.assign(newState, {
        showSymbols,
        currentLayout,
        layouts
      });
    }

    if (newProps.showKeyboard !== oldProps.showKeyboard) {
      Object.assign(newState, { showKeyboard: newProps.showKeyboard });
    }

    if (newProps.value !== oldProps.value || newProps.showKeyboard !== oldProps.showKeyboard) {
      Object.assign(newState, { value: newProps.value });
    }

    return newState;
  }

  getSymbolsKeyValue() {
    const { layouts, currentLayout, showSymbols } = this.state;
    if (showSymbols && layouts[currentLayout]) {
      return layouts[currentLayout].symbolsKeyValue || '';
    }
    return SymbolsLayout.symbolsKeyValue;
  }

  getKeys() {
    const {
      layouts,
      currentLayout,
      showSymbols,
      uppercase
    } = this.state;

    const keysSet = (showSymbols) ? SymbolsLayout.layout : layouts[currentLayout].layout;
    const newKeyBtnList = {};
    for (let i = 0; i < keysSet.length; i += 1) {
      const keyRow = keysSet[i] || [];
      newKeyBtnList[`keyRow${i + 1}Btn`] = keyRow.map((item) => {
        const letter = uppercase ? item.toUpperCase() : item;
        return (<KeyboardButton key={letter} value={letter} onClick={this.handleLetterButtonClick} />);
      });
    }

    return newKeyBtnList;
  }

  handleSymbolsClick = () => {
    this.setState({
      showSymbols: !this.state.showSymbols
    });
  }

  handleLanguageClick = () => {
    const { showSymbols } = this.state;

    const currentLayout = (this.state.currentLayout + 1) % this.props.layouts.length;
    if (currentLayout !== this.state.currentLayout || showSymbols) {
      this.setState({
        showSymbols: false,
        currentLayout
      });
    }
  }

  handleShiftClick = () => {
    this.setState({ uppercase: !this.state.uppercase });
  }

  handleBackspaceClick = () => {
    if (this.state.value.length > 0) {
      const value = this.state.value.slice(0, -1);
      this.setState({ value });
    }
  }

  handleLetterButtonClick = (key) => {
    const value = `${this.state.value}${key}`;
    this.setState({ value });
  }

  refreshContext = (newState = {}) => {
    this.setState(newState);
  }

  isUppercase(value = '') {
    const { isFirstLetterUppercase, type } = this.props;
    return (type === 'text' && !value.length && isFirstLetterUppercase);
  }


  handleCallbackClick = (action = 'Cancel') => {
    this.props.onReturnValue((action === 'Cancel') ? this.props.value : this.state.value);
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleCallbackClick('Submit');
    }
  }

  render() {
    const {
      type
    } = this.props;
    const {
      value,
      style,
      keyStyle,
      keyRowStyle,
      keyBtnStyle,
      keyHalfBtnStyle,
      layouts,
      numberListBtn,
      backspaceBtn,
      shiftBtn,
      langBtn,
      atBtn,
      spaceBtn,
      dotBtn,
      leftButtons,
      rightButtons
    } = this.state;

    const symbolsKeyValue = this.getSymbolsKeyValue();
    const newKeyBtnList = this.getKeys();

    return (
      <div style={style}>
        <div style={keyStyle}>
          <div style={keyRowStyle}>
            <div style={keyHalfBtnStyle} />
            <input
              style={keyBtnStyle}
              type={type}
              value={value}
              onChange={(e) => { this.setState({ value: e.target.value }); }}
              onKeyPress={this.handleKeyPress}
              ref={(n) => { this.inputNode = n; }}
            />
            <div style={keyHalfBtnStyle} />
          </div>
          <div style={keyRowStyle}>
            {numberListBtn}
            {backspaceBtn}
          </div>
          <div style={keyRowStyle}>
            {newKeyBtnList.keyRow1Btn}
          </div>
          <div style={keyRowStyle}>
            <div style={keyHalfBtnStyle} />
            {newKeyBtnList.keyRow2Btn}
            <div style={keyHalfBtnStyle} />
          </div>
          <div style={keyRowStyle}>
            {shiftBtn}
            {newKeyBtnList.keyRow3Btn}
            {<KeyboardButton value={symbolsKeyValue} onClick={this.handleSymbolsClick} />}
          </div>
          <div style={keyRowStyle}>
            {leftButtons}
            {(layouts.length > 0) ? langBtn : undefined}
            {(type === 'email') ? atBtn : undefined}
            {spaceBtn}
            {(type === 'email') ? dotBtn : undefined}
            {rightButtons}
          </div>
        </div>
      </div>
    );
  }
}

export default Keyboard;
