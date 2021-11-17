import React from 'react';
import { connect } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';
import { useSelector, useDispatch } from 'react-redux';

const Filter = (props) => {

	const dispatch = useDispatch();

  const handleChange = (event) => {
    const value = event.target.value;
    dispatch(filterChange(value));
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  }
}

const ConnectedFilter = connect(mapStateToProps)(Filter);
export default ConnectedFilter;