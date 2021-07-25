import React from 'react';

const AddForm = ({ newName, newNumber,handleSubmit, handleNameChange, handleNumberChange }) => (
	<form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
    </form>
);

export default AddForm;
