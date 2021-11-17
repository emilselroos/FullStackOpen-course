import React from 'react'
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setNotification } from '../reducers/notificationReducer';

const Notification = (props) => {

  const dispatch = useDispatch();
  //const notification = useSelector(state => state.notification);
  const notification = props.notification;

  useEffect(() => {

    const timeoutID = setTimeout(() => {
      dispatch(setNotification(null, 0));
    }, notification.time);

    return () => clearTimeout(timeoutID);
    
  }, [notification.message]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: 'red'
  };
  
  return notification.message !== null ? (
    <div style={style}>
      {notification.message}
    </div>
  ) : <></>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
