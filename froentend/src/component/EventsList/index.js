
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { MdDelete, MdEdit, MdSave, MdCancel } from 'react-icons/md';
// import { IoMdLogOut } from 'react-icons/io';

// import './event.css';

// const EventList = ({ selectedDate, events, fetchDataOnChangedData }) => {
//   const [newEvent, setNewEvent] = useState({ name: '', description: '' });
//   const [editEvent, setEditEvent] = useState(null); // Track the event being edited
//   const [editedData, setEditedData] = useState({ name: '', description: '' }); // Store the updated values

//   // Helper to convert a date to 'YYYY-MM-DD' format
//   const getDateString = (date) => date.toISOString().split('T')[0];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewEvent({ ...newEvent, [name]: value });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData({ ...editedData, [name]: value });
//   };

//   const handleAddEvent = async () => {
//     if (newEvent.name && newEvent.description) {
//       try {
//         const userId = Cookies.get('userId');
//         const formattedDate = getDateString(new Date(selectedDate));
//         const url = process.env.REACT_APP_BACKEND_URL;

//         const response = await fetch(`${url}/events`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             userId: userId,
//             event_date: formattedDate,
//             name: newEvent.name,
//             description: newEvent.description,
//           }),
//         });

//         if (response.ok) {
//           fetchDataOnChangedData();
//           setNewEvent({ name: '', description: '' });
//         } else {
//           console.error('Failed to add event:', await response.text());
//           alert('Failed to add event. Please try again.');
//         }
//       } catch (error) {
//         console.error('Error adding event:', error);
//         alert('Failed to add event. Please try again.');
//       }
//     } else {
//       alert('Please fill in both fields before adding an event.');
//     }
//   };

//   const handleDeleteEvent = async (eventId) => {
//     try {
//       const url = process.env.REACT_APP_BACKEND_URL;
//       const response = await fetch(`${url}/events/${eventId}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         fetchDataOnChangedData();
//       } else {
//         console.error('Failed to delete event:', await response.text());
//         alert('Failed to delete event. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error deleting event:', error);
//       alert('Failed to delete event. Please try again.');
//     }
//   };

//   const handleEditEvent = (event) => {
//     setEditEvent(event.id); // Set the event in edit mode
//     setEditedData({ name: event.name, description: event.description });
//   };

//   const handleSaveEdit = async (eventId) => {
//     try {
//       const url = process.env.REACT_APP_BACKEND_URL;
//       const response = await fetch(`${url}/events/${eventId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(editedData),
//       });

//       if (response.ok) {
//         fetchDataOnChangedData();
//         setEditEvent(null); // Exit edit mode
//       } else {
//         console.error('Failed to update event:', await response.text());
//         alert('Failed to update event. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error updating event:', error);
//       alert('Failed to update event. Please try again.');
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditEvent(null); // Exit edit mode without saving
//   };

//   return (
//     <div className='event_container'>
//       <div className='logout'>
//         <h3 className='event_heading'>Your selected day / {selectedDate}</h3>
//         <Link to='/logout'>
//           <IoMdLogOut size={'40px'} color={'hsl(358, 59%, 55%)'} />
//         </Link>
//       </div>

//       {events[selectedDate] ? (
//         events[selectedDate].map((event) => (
//           <div className='events_main' key={event.id}>
//             {editEvent === event.id ? (
//               <div className='edit_event'>
//                 <input
//                   type='text'
//                   name='name'
//                   value={editedData.name}
//                   onChange={handleEditChange}
//                   className='add_input'
//                 />
//                 <input
//                   type='text'
//                   name='description'
//                   value={editedData.description}
//                   onChange={handleEditChange}
//                   className='add_input'
//                 />
//                 <div className='edit_buttons_class'>
//                 <button
//                   className='edit_buttons button'
//                   onClick={() => handleSaveEdit(event.id)}
//                 >
//                   <MdSave size={'25px'} /> Save
//                 </button>
//                 <button className='edit_buttons button' onClick={handleCancelEdit}>
//                   <MdCancel size={'25px'} /> Cancel
//                 </button>
//                 </div>
//               </div>
//             ) : (
//               <div className='events'>
//                 <div className='details_class'> 
//                 <p className='event_events_heading'>{event.name}</p>
//                 <p className='event_events_des'>{event.description}</p>
//                 </div>
//                 <div className='buttons_class'> 
//                 <button
//                   className='edit_button button'
//                   onClick={() => handleEditEvent(event)}
//                 >
//                   <MdEdit size={'25px'} /> Edit
//                 </button>
//                 <button
//                   className='event_button button'
//                   onClick={() => handleDeleteEvent(event.id)}
//                 >
//                   <MdDelete size={'25px'} /> Delete
//                 </button>
//                 </div>


//               </div>
//             )}
//           </div>
//         ))
//       ) : (
//         <p className='events_nodata'>No events recorded.</p>
//       )}

//       <div className='add_event_container'>
//         <h4 className='event_heading'>Add Event</h4>
//         <input
//           type='text'
//           name='name'
//           placeholder='Event Name'
//           value={newEvent.name}
//           onChange={handleChange}
//           className='add_input'
//         />
//         <input
//           type='text'
//           name='description'
//           placeholder='Event Description'
//           value={newEvent.description}
//           onChange={handleChange}
//           className='add_input'
//         />
//         <button className='add_button button' onClick={handleAddEvent}>
//           Add Event
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EventList;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { MdDelete, MdEdit, MdSave, MdCancel } from 'react-icons/md';
import { IoMdLogOut } from 'react-icons/io';

import './event.css';

const EventList = ({ selectedDate, events, fetchDataOnChangedData }) => {
  const [newEvent, setNewEvent] = useState({ name: '', description: '' });
  const [editEvent, setEditEvent] = useState(null); // Track the event being edited
  const [editedData, setEditedData] = useState({ name: '', description: '' }); // Store the updated values
  const [loading, setLoading] = useState(false); // Loading state

  // Helper to convert a date to 'YYYY-MM-DD' format
  const getDateString = (date) => date.toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleAddEvent = async () => {
    if (newEvent.name && newEvent.description) {
      setLoading(true); // Start loading
      try {
        const userId = Cookies.get('userId');
        const formattedDate = getDateString(new Date(selectedDate));
        const url = process.env.REACT_APP_BACKEND_URL;

        const response = await fetch(`${url}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: userId,
            event_date: formattedDate,
            name: newEvent.name,
            description: newEvent.description,
          }),
        });

        if (response.ok) {
          fetchDataOnChangedData();
          setNewEvent({ name: '', description: '' });
        } else {
          console.error('Failed to add event:', await response.text());
          alert('Failed to add event. Please try again.');
        }
      } catch (error) {
        console.error('Error adding event:', error);
        alert('Failed to add event. Please try again.');
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      alert('Please fill in both fields before adding an event.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    setLoading(true); // Start loading
    try {
      const url = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${url}/events/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchDataOnChangedData();
      } else {
        console.error('Failed to delete event:', await response.text());
        alert('Failed to delete event. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleEditEvent = (event) => {
    setEditEvent(event.id); // Set the event in edit mode
    setEditedData({ name: event.name, description: event.description });
  };

  const handleSaveEdit = async (eventId) => {
    setLoading(true); // Start loading
    try {
      const url = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${url}/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        fetchDataOnChangedData();
        setEditEvent(null); // Exit edit mode
      } else {
        console.error('Failed to update event:', await response.text());
        alert('Failed to update event. Please try again.');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleCancelEdit = () => {
    setEditEvent(null); // Exit edit mode without saving
  };

  return (
    <div className='event_container'>
      <div className='logout'>
        <h3 className='event_heading'>Your selected day / {selectedDate}</h3>
        <Link to='/logout'>
          <IoMdLogOut size={'40px'} color={'hsl(358, 59%, 55%)'} />
        </Link>
      </div>

      {events[selectedDate] ? (
        events[selectedDate].map((event) => (
          <div className='events_main' key={event.id}>
            {editEvent === event.id ? (
              <div className='edit_event'>
                <input
                  type='text'
                  name='name'
                  value={editedData.name}
                  onChange={handleEditChange}
                  className='add_input'
                />
                <input
                  type='text'
                  name='description'
                  value={editedData.description}
                  onChange={handleEditChange}
                  className='add_input'
                />
                <div className='edit_buttons_class'>
                  <button
                    className='edit_buttons button'
                    onClick={() => handleSaveEdit(event.id)}
                  >
                    <MdSave size={'25px'} /> Save
                  </button>
                  <button className='edit_buttons button' onClick={handleCancelEdit}>
                    <MdCancel size={'25px'} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className='events'>
                <div className='details_class'>
                  <p className='event_events_heading'>{event.name}</p>
                  <p className='event_events_des'>{event.description}</p>
                </div>
                <div className='buttons_class'>
                  <button
                    className='edit_button button'
                    onClick={() => handleEditEvent(event)}
                  >
                    <MdEdit size={'25px'} /> Edit
                  </button>
                  <button
                    className='event_button button'
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <MdDelete size={'25px'} /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className='events_nodata'>No events recorded.</p>
      )}

      {loading && <p className='loading'>Loading...</p>} {/* Loader */}

      <div className='add_event_container'>
        <h4 className='event_heading'>Add Event</h4>
        <input
          type='text'
          name='name'
          placeholder='Event Name'
          value={newEvent.name}
          onChange={handleChange}
          className='add_input'
        />
        <input
          type='text'
          name='description'
          placeholder='Event Description'
          value={newEvent.description}
          onChange={handleChange}
          className='add_input'
        />
        <button className='add_button button' onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
    </div>
  );
};

export default EventList;
