import React, { Component } from 'react';
import PresThumb from './PresThumb';
import getUserLectures from '../util/getUserLectures';
import { connect } from 'react-redux';

// Panel that displays list of presentations
class PresPreviews extends Component {
// Currently loading multiple copies of PresThumb for testing.  Will refactor eventually with a forEach.
  constructor (props) {
    super();
  }
  componentWillMount () {
    // store all the lectures of a specific user in the store
    getUserLectures((lectures) => {
      this.props.dispatch({
        type: 'STORE_USER_LECTURES',
        lectures: lectures
      });
    });
  }

  render () {
    // filter the most recent lectures and filter depending on the role given
    let recentLectures = this.props.userLectures.slice(0, 6)
      .filter(lecture => lecture.role === this.props.role);
    return (
      <div>
        {
          recentLectures.length > 0
            ? recentLectures.map(lecture =>
              <PresThumb key = {lecture.id} date = {lecture.date} name = {lecture.name} />
            ) : null
        }
      </div>
    );
  };
};

const mapStatetoProps = (state) => {
  return {
    userLectures: state.userLectures
  };
};
export default connect(mapStatetoProps)(PresPreviews) ;
