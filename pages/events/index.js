import React, { Fragment } from 'react';
import { useRouter } from 'next/router';

import { EventList, EventsSearch } from '../../components/events/index';
import { getAllEvents } from '../../components/helper/api-util';

const AllEventsPage = ({ events }) => {
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <h1>All Events</h1>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const events = await getAllEvents();
  return {
    props: {
      events: events
    },
    revalidate: 60
  };
};

export default AllEventsPage;
