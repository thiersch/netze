# Internetprotokoll

Das Internet ist ein **Zusammenschluss von Netzen**, die über den ganzen Planeten verteilt sind. Die zusammengeschalteten Netze nutzen unterschiedliche Verfahren und Übertragunswege.

:::info
Das Internetprotokoll **strukturiert** den Netzverbund und liefert Verfahren für die **Kommunikation in andere Netze**.
:::

Teilnehmer eines einzelnen Netzes tauschen regelmäßig ihre jeweiligen Adressen aus und können über diese direkt miteinander Kommunizieren. Diese Adressen heißen "physische Adressen" oder **MAC-Adressen**. Nachrichten an physische Adressen werden aber nicht aus Netzen herausgeleitet, mit ihnen können also keine Teilnehmer in anderen Netzen angesprochen werden. Aktive Netzwerkkomponenten, die Nachrichten zwischen Teilnehmern des selben Netzes vermitteln, heißen **Switch** oder **Access Point**. Switche und Access-Points arbeiten nur mit MAC-Adressen.

Damit eine Nachricht an einen Computer in einem fremden Netz geleitet werden kann, ist eine Information darüber nötig, in welchem **Zielnetz** sich dieser Computer befindet. Diese Information heißt **Netzadresse** und sie steckt in jeder IP-Adresse. Die Wegfindung von Nachrichten über möglicherweise sehr viele Netze hinweg heißt **Routing**. Aktive Netzwerkkomponenten, die Nachrichten zwischen Teilnehmern verschiedener Netze vermitteln, heißen **Router**. Hierzu müssen Router mit IP-Adressen arbeiten können. 

### Teste dein Wissen!

<details>
  <summary>Bereit für das Quiz?</summary>

<Quiz
  questions={[
    {
      question: "Wo sind Netzadressen codiert?",
      answers: [
        { text: "Festplatte", isCorrect: false },
        { text: "IP-Adresse", isCorrect: true },
        { text: "MAC-Adresse", isCorrect: false },
        { text: "Netzwerk-Chip", isCorrect: false }
      ],
    },
    {
      question: "Welches Protokoll ermöglicht die netzübergreifende Kommunikation?",
      answers: [
        { text: "HTTP", isCorrect: false },
        { text: "Ethernet", isCorrect: false },
        { text: "WLAN", isCorrect: false },
        { text: "IP", isCorrect: true }
      ],
    },
    {
      question: "Welche Adressen sind prinzipiell aus anderen Netzen erreichbar?",
      answers: [
        { text: "Speicheradressen", isCorrect: false },
        { text: "MAC-Adressen", isCorrect: false },
        { text: "IP-Adressen", isCorrect: true },
        { text: "Loopback-Adressen", isCorrect: false }
      ],
    },
    {
      question: "Welche Adressen sind prinzipiell nicht aus anderen Netzen erreichbar?",
      answers: [
        { text: "MAC-Adressen", isCorrect: true },
        { text: "E-Mail-Adressen", isCorrect: false },
        { text: "DNS-Namen", isCorrect: false },
        { text: "IP-Adressen", isCorrect: false }
      ],
    },
    {
      question: "Welche Geräte vermitteln Nachrichten im selben Netz?",
      answers: [
        { text: "Router", isCorrect: false },
        { text: "Access-Points", isCorrect: true },
        { text: "Switche", isCorrect: true },
        { text: "Firewalls", isCorrect: false }
      ],
    },
    {
      question: "Welche Geräte vermitteln Nachrichten in fremde Netze?",
      answers: [
        { text: "Switche", isCorrect: false },
        { text: "Router", isCorrect: true },
        { text: "Access-Points", isCorrect: false },
        { text: "Hubs", isCorrect: false }
      ],
    },
    {
      question: "Mit welchen Adressen arbeiten Switche?",
      answers: [
        { text: "IP-Adressen", isCorrect: false },
        { text: "Raumnummern", isCorrect: false },
        { text: "MAC-Adressen", isCorrect: true },
        { text: "Subnetz-Masken", isCorrect: false }
      ],
    },
    {
      question: "Mit welchen Adressen arbeiten Access-Points?",
      answers: [
        { text: "MAC-Adressen", isCorrect: true },
        { text: "IP-Adressen", isCorrect: false },
        { text: "Vornamen", isCorrect: false },
        { text: "DNS-Namen", isCorrect: false }
      ],
    },
    {
      question: "Mit welchen Adressen arbeiten Router vor allem?",
      answers: [
        { text: "MAC-Adressen", isCorrect: false },
        { text: "Ports", isCorrect: false },
        { text: "IP-Adressen", isCorrect: true },
        { text: "Hausnummern", isCorrect: false }
      ],
    },
    {
      question: "Welches Protokoll liefert Verfahren zur Kommunikation in andere Netze?",
      answers: [
        { text: "TCP", isCorrect: false },
        { text: "HTTP", isCorrect: false },
        { text: "FTP", isCorrect: false },
        { text: "IP", isCorrect: true }
      ],
    },
  ]}
/>

</details>
