import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class KeyboardButton extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.node.isRequired]),
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    style: { flexGrow: 1, minHeight: 36 },
    value: '',
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = this.getNewState(props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.style !== prevProps.style) {
      const newState = this.getNewState(this.props, prevProps);
      this.refreshContext(newState);
    }
  }

  getNewState = (newProps = {}, oldProps = {}) => {
    const newState = {};

    if (newProps.style !== oldProps.style) {
      newState.style = Object.assign({ flexGrow: 1, minHeight: 36 }, newProps.style || {});
    }

    return newState;
  }

  refreshContext = (newState = {}) => {
    this.setState(newState);
  }

  handleClick = () => {
    const {
      disabled,
      value,
      onClick
    } = this.props;

    if (!disabled) {
      onClick(value);
    }
  }

  render() {
    const {
      disabled
    } = this.props;
    const {
      style
    } = this.state;

    return (
      <button type="button" style={style} onClick={this.handleClick} disabled={disabled}>
        {this.props.value}
      </button>
    );
  }
}

export default KeyboardButton;
