import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { EventList, ResultsTitle } from '../../components/events/index';
import { Button, ErrorAlert } from '../../components/ui/index';
import { getFilteredEvents } from '../../components/helper/api-util';

const FilteredEventsPage = (props) => {
  const router = useRouter();
  const [loadedEvents, setLoadedEvents] = useState();
  const filterData = router.query.slug;

  const { data, error } = useSWR(
    'https://nextjs-course-3645a-default-rtdb.firebaseio.com/events.json'
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key]
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className='center'>Loading...</p>;
  }

  const [filteredYear, filteredMonth] = filterData;

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  // const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      <h1>Filtered Events</h1>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

// export const getServerSideProps = async (context) => {
//   const { params } = context;
//   console.log('params', params);

//   const filterData = params.slug;

//   const [filteredYear, filteredMonth] = filterData;

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true
//         // notFound: true
//         // redirect: {
//         //   destination: '/error'
//         // }
//       }
//     };
//   }
//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth
//   });
//   return {
//     props: {
//       events: filteredEvents,
//       date: { year: numYear, month: numMonth }
//     }
//   };
// };
export const getServerSideProps = async () => {
  console.log('getServerSideProps');
  return {
    props: {
      events: 'テスト'
    }
  };
};

export default FilteredEventsPage;
