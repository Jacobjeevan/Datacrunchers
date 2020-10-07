import React, { useState, useEffect } from "react";
import { getEventById } from "./eventsAPI";
import { useParams } from "react-router-dom";
import "./EventDetail.css";
const ReactMarkdown = require("react-markdown");

export default function EventDetail() {
  let { eventid } = useParams();
  const [event, setevent] = useState({});

  useEffect(() => {
    async function getEvent() {
      let event = await getEventById(eventid);
      console.log(event);
      setevent(event);
    }
    getEvent();
  }, [eventid]);

  return (
    <div>
      {event ? (
        <div className="event-meta">
          <div className="event-title-detail">{event.title}</div>
          <ReactMarkdown
            source={event.description}
            className="event-description-detail"
          />
          <div className="event-loc-date">
            <div className="event-location-detail">{event.location}</div>
            <div className="event-date-detail">
              {new Date(event.date).toDateString()}
            </div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}
