import React from 'react';

import { EventList } from '../components/events/index';

import { getAllEvents, getFeaturedEvents } from '../components/helper/api-util';

const HomePage = ({ events }) => {
  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export const getStaticProps = async (context) => {
  console.log('getStaticProps');
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  };
};

export default HomePage;
