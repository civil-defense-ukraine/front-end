import { Donate } from '../../components/Donate';
import styles from './Donate.module.scss';

export const DonatePage = () => {
  return (
    <section className={styles.container}>
      <Donate />

      <h2 className='heading--h1'>Please, support our efforts!</h2>

      <div className={styles.details}>
        <h3 className="heading--h2">Bank payment Details</h3>
        <p>Click on a text row to copy it</p>
        <div className={styles.field}>
          <p className={styles.field__name}>Legal Name</p>
          <div className={styles.field__value}>
          <p>Civil Defence Ukraine</p>
          </div>
        </div>
      
      </div>

    </section>
  )

}