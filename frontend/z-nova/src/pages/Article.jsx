import styled from 'styled-components';
import Breadcrumbs from '../ui/Breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import SuggestedPosts from '../ui/suggestedPosts';
import { generateHTML } from '@tiptap/html';
import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Italic from '@tiptap/extension-italic';
import parse from 'html-react-parser';
import CommentsContainer from '../features/comments/CommentsContainer';
import { usePost } from '../features/posts/usePost';
import Spinner from '../ui/Spinner';
import { useEffect, useState } from 'react';
import { usePosts } from '../features/posts/usePosts';
import SocialShareButtons from '../ui/SocialShareButtons';

const StyledArticle = styled.div`
  margin: 0 auto;
  max-width: 80vw;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4em;
  padding: 2rem 0 8rem 0;
`;

const StyledImage = styled.img`
  border-radius: 2rem;
  width: 100%;
  height: 48rem;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function Article() {
  const { slug } = useParams();
  const { post, isLoading, error, isSuccess } = usePost(slug);
  const { posts } = usePosts('latest');
  const [breadcrumbsData, setBreadcrumbsData] = useState([]);
  const [body, setBody] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      setBreadcrumbsData([
        {
          name: 'Home',
          link: '/',
        },
        {
          name: 'Blog',
          link: '/blog',
        },
        {
          name: `${post?.post?.title}`,
          link: `/blog/${post?.post?.slug}`,
        },
      ]);
      console.log(
        generateHTML(post?.post?.body, [
          Bold,
          Italic,
          Text,
          Paragraph,
          Document,
        ]),
      );
      setBody(
        parse(
          generateHTML(post?.post?.body, [
            Bold,
            Italic,
            Text,
            Paragraph,
            Document,
          ]),
        ),
      );
    }
  }, [isSuccess, post]);

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  if (error)
    return (
      <Center>
        <p>{error?.message}</p>
      </Center>
    );

  const { post: mainPost } = post;

  return (
    <StyledArticle>
      <article>
        <Breadcrumbs data={breadcrumbsData} />
        <StyledImage
          src={`http://127.0.0.1:8000/posts/${mainPost?.image}`}
          alt="article-img"
        />
        <div style={{ marginTop: '2rem' }}>
          {mainPost?.categories?.map((category, index) => (
            <Link
              key={index}
              style={{
                color: 'var(--color-grey-500)',
                fontSize: '1.8rem',
                fontWeight: '500',
              }}
              to={`/blog?category=${category?.name}`}
            >
              {category?.name}
            </Link>
          ))}
        </div>
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: '600',
            color: 'var(--color-grey-800)',
            marginTop: '2rem',
          }}
        >
          {mainPost?.title}
        </h1>
        <div style={{ marginTop: '2rem', color: 'var(--color-grey-700)' }}>
          {body}
        </div>
        <CommentsContainer
          comments={mainPost?.comments}
          slug={mainPost?.slug}
        />
      </article>
      <div>
        <SuggestedPosts posts={posts} tags={mainPost?.tags} />
        <div style={{ marginTop: '5rem' }}>
          <h2
            style={{ fontSize: '2rem', fontWeight: '600', margin: '0 0 2rem' }}
          >
            Share on:
          </h2>
          <SocialShareButtons
            url={encodeURI(
              'https://moonfo.com/post/client-side-and-server-side-explanation',
            )}
            title={'Client Side and Server Side Explanation'}
          />
        </div>
      </div>
    </StyledArticle>
  );
}

export default Article;
