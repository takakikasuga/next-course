import React from 'react';

import { Button } from '../ui/index';
import { DateIcon, AddressIcon, ArrowRightIcon } from '../icons/index';

import classes from './event-item.module.css';

const EventItem = ({ event: { title, image, date, location, id } }) => {
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;
  return (
    <li className={classes.item}>
      <img src={'/' + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
