// Contains the elements for the Audience, including:
  // Logout Button
  // FeedbackBox
  // Slides
  // FeedbackButton

import FeedbackBox from './FeedbackBox';
import Slides from './Slides';
import React, { Component } from 'react';
import LogoutButton from './LogoutButton';
import $ from 'jquery';
import QuestionBox from './QuestionBox'; // also renders to presenter view
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import AudThumbs from './AudThumbs';

class AudienceView extends Component {

  componentDidMount () {
    let socket = this.props.activeLecture.socket;
    this.props.dispatch({type: 'CHANGE_ROLE', role: 'audience'});

    socket.on('stopPresentation', function () {
      browserHistory.push('/');
    });
  }

  render () {
    return (
      <div id="AudienceView">
      <LogoutButton/>
      <div>
        <Slides id="audienceSlides" class="slides" role="audience"/>
        <FeedbackBox/>
        <QuestionBox role={'audience'}/>
        <AudThumbs/>
      </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    activeLecture: state.activeLecture
  };
};

export default connect(mapStateToProps)(AudienceView);
