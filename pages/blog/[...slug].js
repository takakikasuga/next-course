import React from 'react';
import { useRouter } from 'next/router';

const BlogPostPage = () => {
  const router = useRouter();

  console.log('router.query', router.query);
  return (
    <div>
      <h1>The Blog Post</h1>
    </div>
  );
};

export default BlogPostPage;
