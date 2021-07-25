import React from 'react';
import Head from 'next/head';
import { getFeaturedEvents } from '../dummy-data';

import { EventList } from '../components/events/index';

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta
          name='description'
          content='このサイトでいいコンテンツを見つけることを約束します。'
        />
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;
