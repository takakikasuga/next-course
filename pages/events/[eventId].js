import React, { Fragment } from 'react';

import {
  EventSummary,
  EventLogistics,
  EventContent
} from '../../components/event-detail/index';
import { ErrorAlert } from '../../components/ui/index';

import {
  getEventById,
  getAllEvents,
  getFeaturedEvents
} from '../../components/helper/api-util';

const EventDetailPage = ({ selectedEvent }) => {
  const event = selectedEvent;

  if (!event)
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );

  return (
    <Fragment>
      <h1>Event Datail</h1>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30
  };
};

export const getStaticPaths = async (context) => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: true
  };
};

export default EventDetailPage;
