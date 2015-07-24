import React, { PropTypes } from 'react';

export default class Loading extends React.Component {
  static propTypes = {
    initial: PropTypes.bool.isRequired,
    show   : PropTypes.bool.isRequired
  };

  render() {
    const displayState = () => {
      if (this.props.initial) { return 'initial'; }
      return this.props.show ? 'visible' : 'hidden';
    };

    const classes = `Loading ${displayState()}`;

    return (
      <div className={classes}>
        <div className="preloader-wrapper big active">
           <div className="spinner-layer spinner-yellow-only">
             <div className="circle-clipper left">
               <div className="circle"></div>
             </div><div className="gap-patch">
               <div className="circle"></div>
             </div><div className="circle-clipper right">
               <div className="circle"></div>
             </div>
           </div>
         </div>
      </div>
    );
  }
}
