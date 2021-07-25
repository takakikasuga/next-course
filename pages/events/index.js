import React, { Fragment } from 'react';
import Head from 'next/head';

import { useRouter } from 'next/router';

import { EventList, EventsSearch } from '../../components/events/index';
import { getAllEvents } from '../../dummy-data';

const AllEventsPage = () => {
  const router = useRouter();
  const events = getAllEvents();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='このサイトでいいコンテンツを見つけることを約束します。'
        />
      </Head>
      <h1>All Events</h1>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default AllEventsPage;
