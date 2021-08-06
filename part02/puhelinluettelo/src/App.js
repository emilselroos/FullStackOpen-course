import React, { useState, useEffect } from 'react';

import personService from './services/persons';

import Contacts from './components/Contacts';
import Search from './components/Search';
import AddForm from './components/AddForm';
import Notification from './components/Notification';

const App = () => {

  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ message, setMessage ] = useState(null);

  useEffect(() => {
    personService.getAll().then(values => {
      setPersons(values)
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      name: newName,
      number: newNumber,
    }

    const nameExists = persons.some(person => person.name === newName);
   
    if (nameExists) {

      const oldContact = persons.filter(person => person.name === newName);
      // console.log(oldContact);

      if (window.confirm(`${newName} already exists in your phonebook. Want to update their number?`)) {
        return personService.edit(oldContact[0].id, newContact)
          .then(contact => {
            setMessage(`Changed number of ${contact.name}!`);
            setTimeout(() => {
              setMessage(null)
            }, 5000);
            personService.getAll().then(values => {
              setPersons(values)
            });          
          })
          .catch(error => {
            setMessage(`Information of the person you tried to edit has already been removed from the server!`);
            setTimeout(() => {
              setMessage(null)
            }, 5000);
            console.error('ERROR', error);
          })
      }
    }

    // Send data to server.
    personService
      .create(newContact)
      .then(contact => {
        setPersons(persons.concat(contact));
        setMessage(`Added ${contact.name}!`);
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
      .catch(error => {
        // console.log( error.response.data.error );
        setMessage(`${error.response.data.error}`);
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      });
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      personService.remove(id).then((contact) => {
        setMessage(`Deleted a contact!`);
        setTimeout(() => {
          setMessage(null)
        }, 5000);        
        personService.getAll().then(values => {
          setPersons(values)
        });
      });

    }
  }

  return (
    <div>

      <Notification message={message} />

      <h2>Phonebook</h2>
      <Search searchTerm={searchTerm} onChange={handleSearchTermChange} />

      <h2>Add new contact</h2>
      <AddForm newNumber={newNumber} newName={newName} handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Contacts contacts={persons} searchTerm={searchTerm} handleDelete={handleDelete} />

    </div>
  )

}

export default App;