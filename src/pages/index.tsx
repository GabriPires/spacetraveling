import { format } from 'date-fns';
import { GetStaticProps } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page?: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

const Home: React.FC<HomeProps> = ({ postsPagination }) => {
  return (
    <main className={commonStyles.container}>
      {postsPagination.results.map(post => (
        <div className={styles.post} key={post.uid}>
          <h1>{post.data.title}</h1>
          <h2>{post.data.subtitle}</h2>
          <div>
            <span>
              <FiCalendar />
              <span>{post.first_publication_date}</span>
            </span>
            <span>
              <FiUser />
              <span>{post.data.author}</span>
            </span>
          </div>
        </div>
      ))}

      {postsPagination.next_page && (
        <button type="button" className={styles.loadMoreButton}>
          Carregar mais posts
        </button>
      )}
    </main>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', {
    fetch: ['posts'],
    pageSize: 2,
  });

  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results: postsResponse.results.map(result => ({
      data: {
        author: result.data.author,
        title: result.data.title,
        subtitle: result.data.subtitle,
      },
      uid: result.uid,
      first_publication_date: format(
        new Date(result.first_publication_date),
        'dd LLL yyyy'
      ),
    })),
  };

  return {
    props: {
      postsPagination,
    },
  };
};
