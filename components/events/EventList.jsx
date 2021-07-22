import React from 'react';

import { EventItem } from './index';

import classes from './event-list.module.css';

const EventList = ({ items }) => {
  return (
    <ul className={classes.list}>
      {items.map((event) => {
        return <EventItem key={event.id} event={event} />;
      })}
    </ul>
  );
};

export default EventList;
