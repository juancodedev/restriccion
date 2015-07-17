import React from 'react';
import get from '../utils/get';

export default class RestrictionDayHandler extends React.Component {
  constructor(props) {
    super();
    this.state = props.initialState ? {restrictionDay: props.initialState} : {};
  }

  componentDidMount(){
    if (!this.props.initialState) {
      get('/restriction_day')
        .then( data => {
          this.setState({ restrictionDay: JSON.parse(data) });
        });
    }
  }

  render() {
    const Children = this.props.children;

    return (
      <Children
        restrictionDay = {this.state.restrictionDay} />
    );
  }
}
