import styles from './AboutUsInfo.module.scss';

export const AboutUsInfo = () => {
  return (
    <section className={styles.container}>
      <article className={styles.article}>
        <img
          className={styles.article__img}
          src="./imgs/about-us-page/founders.png"
          alt="Civil Defence Founders" />
        <span>
          <h2 className={`${styles.article__header} heading--h2`}>About Us</h2>
          <p className={styles.article__text}>My name is Anna Gabedov, and together with my father, Jurij Gabedov, we have created Civil Defense Ukraine. <br /><br />
            Civil Defense Ukraine is a charitable organization founded in February-March 2022, when the war began. Our mission is to assist civilians in Ukraine who took up arms to defend the country. That's why we are called Civil Defense. <br /> We now live in Denmark, but we are Ukrainians, dedicating our free time to support the people of our native country.
          </p>
        </span>
      </article>
      <article className={styles.article}>
        <img
          className={styles.article__img}
          src="./imgs/about-us-page/whatDoWeDo.png"
          alt="Territorial Defense Unit" />
        <span>
          <h2 className={`${styles.article__header} heading--h2`}>What We Do?</h2>
          <p className={styles.article__text}>
            This war has struck a personal chord. Our friends and relatives are actively fighting, have been forced to flee their homes, and are traumatized for life. These are innocent people, with ordinary jobs and ordinary lives, who “merely” want the freedom, which we take for granted in the West. Instead, they are faced with the brutal reality, fighting for Ukraine's existence.
            <br />Early on in the war, we were made aware of the fact that people we know, who have volunteered for the Territorial Defense Unit, have no protection gear, no helmets, and no bulletproof vests. They lack night vision gear to be able to see, during the tough fights at night, and they lack walkie-talkies to communicate with one another. <br /> <br /> So, my father and I started buying military protective equipment, and we have now dedicated the last years to doing so...
          </p>
        </span>
      </article>
      <article className={styles.article}>
        <img
          className={styles.article__img}
          src="./imgs/about-us-page/mission.png"
          alt="Stop War" />
        <span>
          <h2 className={`${styles.article__header} heading--h2`}>Our Mission</h2>
          <p className={styles.article__text}>
            Our mission is to provide our soldiers with everything they need for their difficult but justified work. We also seek to support our compatriots who have lost their homes or are suffering from this terrible war.
            <br /> We believe that the fate of not only the whole of Europe, but also peace in the whole world, depends on whether Ukraine stands up.
            We hope, that we have inspired you to help Ukrainian`s fight for freedom. Together, we are able to accelerate Ukraine`s victory. We must not give up. We must continue to support our freedom fighters.
          </p>
        </span>
      </article>
    </section>
  )
}