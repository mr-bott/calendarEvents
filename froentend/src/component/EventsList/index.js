import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"
import Cookies from "js-cookie";
import { MdDelete } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

import "./event.css"

const EventList = ({ selectedDate, events,fetchDataOnChangedData}) => {
  const [newEvent, setNewEvent] = useState({ name: '', description: '' });

  // Helper to convert a date to 'YYYY-MM-DD' format
  const getDateString = (date) => {
    return date.toISOString().split('T')[0]; // This will give you 'YYYY-MM-DD'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = async () => {
    if (newEvent.name && newEvent.description) {
      try {
        const userId = Cookies.get('userId');

        // Format the selectedDate to 'YYYY-MM-DD'
        const formattedDate = getDateString(new Date(selectedDate));
        const url=process.env.REACT_APP_BACKEND_URL
        const response = await fetch(`${url}/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            event_date: formattedDate, // Send formatted date
            name: newEvent.name,
            description: newEvent.description,
          }),
        });

        if (response.ok) {
       
      fetchDataOnChangedData();
          setNewEvent({ name: '', description: '' }); // Reset the form
        } else {
          console.error('Failed to add event:', await response.text());
          alert('Failed to add event. Please try again.');
        }
      } catch (error) {
        console.error('Error adding event:', error);
        alert('Failed to add event. Please try again.');
      }
    } else {
      alert('Please fill in both fields before adding an event.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const url=process.env.REACT_APP_BACKEND_URL
      const response = await fetch(`${url}/events/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
            fetchDataOnChangedData(); // Notify the parent component to refresh events
      } else {
        console.error('Failed to delete event:', await response.text());
        alert('Failed to delete event. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please try again.');
    }
  };

 
  return (
    <div className='event_container'>
         <div className='logout'>
      <h3 className='event_heading'>Your selected day / {selectedDate}</h3>
          <Link to="/logout"> <IoMdLogOut  size={"40px"} color={"hsl(358, 59%, 55%)"}/>  </Link>
          </div>
      {events[selectedDate] ? (
        events[selectedDate].map((event) => (
          <div className="events" key={event.id}> 
          <div className='event_details'>
            <p className='event_events_heading'> {event.name}</p>
            <p className='event_events_des'>{event.description}</p>
            </div>
            <button className='event_button' onClick={() => handleDeleteEvent(event.id)}>
           Delete  {/* <MdDelete size={"25px"} /> */}
              </button>
          </div>
        ))
      ) : (
        <p className='events_nodata'>No events recorded.</p>
      )}
      <div className='add_event_container'>
        <h4 className='event_heading'>Add Event</h4>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={handleChange}
          className='add_input'
        />
        <input
          type="text"
          name="description"
          placeholder="Event Description"
          value={newEvent.description}
           className='add_input'
          onChange={handleChange}
        />
        <button className="add_event_button" onClick={handleAddEvent}>Add Event</button>
      </div>
    </div>
  );
};

export default EventList;
