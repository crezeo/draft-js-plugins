import React, { Component } from 'react';

export default class EmojiSelect extends Component {
  static defaultProps = {
    selectButtonContent: '☺',
    toneSelectOpenDelay: 500,
  };

  // Start the selector closed
  state = {
    isOpen: false,
  };

  // When the selector is open and users click anywhere on the page,
  // the selector should close
  componentDidMount() {
    document.addEventListener('click', this.closePopover);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePopover);
  }

  onClick = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  onButtonMouseUp = () =>
    this.state.isOpen ? this.closePopover() : this.openPopover();

  // Open the popover
  openPopover = () => {
    if (!this.state.isOpen) {
      this.setState({
        isOpen: true,
      });
    }
  };

  // Close the popover
  closePopover = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
      });
    }
  };

  render() {
    const { theme = {}, selectButtonContent, children } = this.props;
    const buttonClassName = this.state.isOpen
      ? theme.emojiSelectButtonPressed
      : theme.emojiSelectButton;

    return (
      <div className={theme.emojiSelect} onClick={this.onClick}>
        <button
          className={buttonClassName}
          onMouseUp={this.onButtonMouseUp}
          type="button"
        >
          {selectButtonContent}
        </button>
        <div style={{ display: this.state.isOpen ? 'block' : 'none' }}>
          {children}
        </div>
      </div>
    );
  }
}
