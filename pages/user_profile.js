import React from 'react';

const UserProfilePage = (props) => {
  console.log('UserProfilePageProps', props);
  return <h1>{props.username}</h1>;
};

export default UserProfilePage;

export const getServerSideProps = async (context) => {
  // console.log('getServerSidePropsContext', context);
  const { params, req, res } = context;
  console.log('Server side code');
  // console.log('req', req);
  // console.log('res', res);
  return {
    props: {
      username: 'Max'
    }
  };
};
