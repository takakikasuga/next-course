import React from 'react';

const UserIdPage = (props) => {
  console.log('UserIdPageprops', props);
  return <h1>{props.id}</h1>;
};

export default UserIdPage;

export const getServerSideProps = async (context) => {
  // console.log('getServerSidePropsContext', context);
  const { params } = context;
  console.log('UserIdPageparams', params);
  const userId = params.uid;
  // console.log('params', params);
  // console.log('req', req);
  // console.log('res', res);
  return {
    props: {
      id: `userId: ${userId}`
    }
  };
};
