import React, { useState, useEffect } from "react";
import { getEventById } from "../../../api/events";
import { useParams } from "react-router-dom";

export default function EventDetail() {
  let { eventid } = useParams();
  const [event, setevent] = useState({});

  useEffect(() => {
    async function getEvent() {
      let event = await getEventById(eventid);
      setevent(event);
    }
    getEvent();
  }, [eventid]);

  return (
    <div>
      {event ? (
        <div className="event-meta">
          <div className="event-title">{event.title}</div>
          <div className="event-description">{event.description}</div>
          <div className="event-location">{event.location}</div>
          <div className="event-date">
            {new Date(event.date).toDateString()}
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}
