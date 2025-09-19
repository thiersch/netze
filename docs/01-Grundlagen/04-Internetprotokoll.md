# Internetprotokoll

Das Internet ist ein **Zusammenschluss von Netzen**, die über den ganzen Planeten verteilt sind. Die zusammengeschalteten Netze nutzen unterschiedliche Verfahren und Übertragunswege.

:::info
Das Internetprotokoll **strukturiert** den Netzverbund und liefert Verfahren für die **Kommunikation in andere Netze**.
:::

Teilnehmer eines einzelnen Netzes tauschen regelmäßig ihre jeweiligen Adressen aus und können über diese direkt miteinander Kommunizieren. Diese Adressen heißen "physische Adressen" oder **MAC-Adressen**. Nachrichten an physische Adressen werden aber nicht aus Netzen herausgeleitet, mit ihnen können also keine Teilnehmer in anderen Netzen angesprochen werden. Aktive Netzwerkkomponenten, die Nachrichten zwischen Teilnehmern des selben Netzes vermitteln, heißen **Switch** oder **Access Point**. Switche und Access-Points arbeiten nur mit MAC-Adressen.

Damit eine Nachricht an einen Computer in einem fremden Netz geleitet werden kann, ist eine Information darüber nötig, in welchem **Zielnetz** sich dieser Computer befindet. Diese Information heißt **Netzadresse** und sie steckt in jeder IP-Adresse. Die Wegfindung von Nachrichten über möglicherweise sehr viele Netze hinweg heißt **Routing**. Aktive Netzwerkkomponenten, die Nachrichten zwischen Teilnehmern verschiedener Netze vermitteln, heißen **Router**. Hierzu müssen Router mit IP-Adressen arbeiten können. 




Fragen: 
Wo sind Netzadressen codiert?
Welches Protokoll erlaubt die netzübergreifende Kommunikation?
Welche Adressen sind aus anderen Netzen erreichbar?
Welche Adressen sind nicht aus anderen Netzen erreichbar?
Welche Geräte vermitteln Nachrichten im selben Netz?
Welche Geräte vermitteln Nachrichten in fremde Netze?
Mit welchen Adressen arbeiten Switche?
Mit welchen Adressen arbeiten Access-Points?
Mit welchen Adressen arbeiten Router vorallem?
