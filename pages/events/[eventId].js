import React, { Fragment } from 'react';
import Head from 'next/head';

import { useRouter } from 'next/router';
import { getEventById } from '../../dummy-data';

import {
  EventSummary,
  EventLogistics,
  EventContent
} from '../../components/event-detail/index';
import { ErrorAlert } from '../../components/ui/index';

const EventDetailPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  console.log(eventId);
  const event = getEventById(eventId);

  console.log(event);

  if (!event)
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
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

export default EventDetailPage;
