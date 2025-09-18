import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Lerne wann du willst',
    image: require('@site/static/img/baer1.jpg').default,
    description: (
      <>
        Lernmaterial auf all deinen Geräten verfügbar.
      </>
    ),
  },
  {
    title: 'Lerne wie du willst',
    image: require('@site/static/img/baer2.jpg').default,
    description: (
      <>
        Du kannst vorlernen, nachlernen und beliebig Themen wechseln. Es gibt aber auch einen empfohlenen Pfad.
      </>
    ),
  },
  {
    title: 'Wiederholungsfragen im Aufbau',
    image: require('@site/static/img/baer3.jpg').default,
    description: (
      <>
        Zu jedem Thema interaktive Wiederholungstests.
      </>
    ),
  },
];

function Feature({image, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <image className={styles.featureImage} role="img" />
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
