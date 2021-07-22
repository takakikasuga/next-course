import React, { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getFilteredEvents } from '../../dummy-data';
import { EventList, ResultsTitle } from '../../components/events/index';
import { Button, ErrorAlert } from '../../components/ui/index';

const FilteredEventsPage = () => {
  const router = useRouter();
  const filterData = router.query.slug;
  console.log('filterData', filterData);

  if (!filterData) {
    return <p className='center'>Loading...</p>;
  }

  const [filteredYear, filteredMonth] = filterData;
  console.log('filteredYear', filteredYear);
  console.log('filteredMonth', filteredMonth);

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
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

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });
  console.log('filteredEvents', filteredEvents);

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
  console.log('date', date);

  return (
    <Fragment>
      <h1>Filtered Events</h1>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
