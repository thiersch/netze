import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Lerne wann du willst',
    img: require('@site/static/img/baer1.jpg').default,
    description: (
      <>
        Lernmaterial auf all deinen Geräten verfügbar.
      </>
    ),
  },
  {
    title: 'Lerne wie du willst',
    img: require('@site/static/img/baer2.jpg').default,
    description: (
      <>
        Du kannst vorlernen, nachlernen und beliebig Themen wechseln. Es gibt aber auch einen empfohlenen Pfad.
      </>
    ),
  },
  {
    title: 'Wiederholungsfragen im Aufbau',
    img: require('@site/static/img/baer3.jpg').default,
    description: (
      <>
        Zu jedem Thema interaktive Wiederholungstests.
      </>
    ),
  },
];

function Feature({img, title, description}) { // 'img' wird jetzt empfangen
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureImage} src={img} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
