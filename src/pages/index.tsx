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
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

const Home: React.FC<HomeProps> = () => {
  return (
    <main className={commonStyles.container}>
      <div className={styles.post}>
        <h1>Como utilizar Hooks</h1>
        <p>Resumo do artigo vai ficar aqui</p>
        <div>
          <span>
            <FiCalendar />
            <span>15 Mar 2022</span>
          </span>
          <span>
            <FiUser />
            <span>Fernando Oliveira</span>
          </span>
        </div>
      </div>

      <div className={styles.post}>
        <h1>Como utilizar Hooks</h1>
        <p>Resumo do artigo vai ficar aqui</p>
        <div>
          <span>
            <FiCalendar />
            <span>15 Mar 2022</span>
          </span>
          <span>
            <FiUser />
            <span>Fernando Oliveira</span>
          </span>
        </div>
      </div>

      <div className={styles.post}>
        <h1>Como utilizar Hooks</h1>
        <p>Resumo do artigo vai ficar aqui</p>
        <div>
          <span>
            <FiCalendar />
            <span>15 Mar 2022</span>
          </span>
          <span>
            <FiUser />
            <span>Fernando Oliveira</span>
          </span>
        </div>
      </div>

      <button type="button" className={styles.loadMoreButton}>
        Carregar mais posts
      </button>
    </main>
  );
};

export default Home;

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };
