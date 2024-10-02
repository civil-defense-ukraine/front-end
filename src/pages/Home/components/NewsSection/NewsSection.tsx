import { useEffect, useMemo, useState } from 'react';
import { News } from '../../../../types/News';
import styles from './News.module.scss';
import { useWidth } from '../../../../hooks/useWidth';
import { NewsCard } from '../../../../components/NewsCard';
import { Link } from 'react-router-dom';
import { useElementOnScreen } from '../../../../hooks/useElementOnScreen';
import { news } from '../../../../services/news';

export const NewsSection = () => {
  const [currentNews, setCurrentNews] = useState<News[]>([]);

  useEffect(() => { 
    news.get().then((newFromServer) => {
      setCurrentNews(newFromServer);

      console.log(newFromServer);
      
      
    })
  }, [])

  const [displayIndex, setDisplayIndex] = useState(0);
  const width = useWidth();
  const { isVisible, container } = useElementOnScreen();


  return (
    <section ref={container}  className={styles.container}>
      <h2 className={`${styles.header} heading--h2`}>Latest News</h2>
      <div className={`${styles.articles} hide--bottom ${isVisible ? 'show' : ''}`}>
        {currentNews.map((article, curIndex) => (
          <NewsCard
            newsData={article}
            key={article.id}
            style={{
              transform: `translateX(calc(-100% * ${displayIndex} - 16px * ${displayIndex}))`
            }}

          />))}
      </div>

      <button className={`${styles.button} ${styles.button__left}`} disabled={displayIndex <= 0} onClick={() => {
        setDisplayIndex(prev => prev - 1)
      }}>
        <div className="icon icon--arrow"></div>
      </button>
      <button
        className={styles.button}
        disabled={displayIndex > currentNews.length - 2}
        onClick={() => {
          setDisplayIndex(prev => prev + 1)
        }}>
        <div className="icon icon--arrow"></div>
      </button>

      <Link to={'news'} className={`${styles.mainButton}  button--secondary button--transparent`}>
        <p className="text--button">SEE ALL</p>
      </Link >
    </section>
  )
}