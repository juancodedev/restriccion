import React, { PropTypes } from 'react';

export default class Loading extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool,
    initial: PropTypes.bool.isRequired,
    show   : PropTypes.bool.isRequired,
    onClick: PropTypes.func
  };

  render() {
    const displayState = () => {
      if (this.props.initial) { return 'initial'; }
      return this.props.show ? 'visible' : 'hidden';
    };

    const classes = `Alert row ${displayState()}`;

    return (
      <div
        className={classes}
        onClick={this.props.onClick} >
        <div className={`alertForm ${this.props.isError ? 'alertFalse' : 'alertTrue'}`} >
          <span dangerouslySetInnerHTML={{__html: this.props.message}} />
        </div>
      </div>
    );
  }
}
