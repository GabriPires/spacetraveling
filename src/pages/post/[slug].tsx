import { format } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <main>
      <img
        src={post.data.banner.url}
        alt={post.data.title}
        className={styles.cover}
      />
      <section className={commonStyles.container}>
        <article className={styles.post}>
          <h1>{post.data.title}</h1>

          <div className={styles.info}>
            <span>
              <FiCalendar />
              <span>{post.first_publication_date}</span>
            </span>
            <span>
              <FiUser />
              <span>{post.data.author}</span>
            </span>
            <span>
              <FiClock />
              <span>4 minutos</span>
            </span>
          </div>

          <div className={styles.content}>
            {post.data.content.map(content => (
              <div key={content.heading}>
                <h2>{content.heading}</h2>
                {content.body.map(body => (
                  <p key={body.text}>{body.text}</p>
                ))}
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});

  const response = await prismic.getByUID('posts', params.slug as string);

  const post: Post = {
    data: {
      title: response.data.title,
      author: response.data.author,
      banner: response.data.banner,
      content: response.data.content.map(content => ({
        heading: content.heading,
        body: content.body.map(body => ({
          text: body.text,
        })),
      })),
    },
    first_publication_date: format(
      new Date(response.first_publication_date),
      'dd LLL yyyy'
    ),
  };

  return {
    props: {
      post,
    },
  };
};
