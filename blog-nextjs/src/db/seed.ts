import { NewBlog } from "./schema";

export const blogSeeds: NewBlog[] = [
  {
    author: "Sarah Chen",
    title: "Die Zukunft der Webentwicklung: Was kommt nach React?",
    description:
      "Ein detaillierter Blick auf neue Web-Frameworks und Technologien, die die Zukunft der Frontend-Entwicklung prägen könnten.",
    content: `
      <p>✨ Da React nun bereits seit über 11 Jahren existiert, entwickelt sich die Weblandschaft stetig weiter. In diesem Artikel werfen wir einen Blick auf aufstrebende Frameworks wie <strong>Qwik</strong>, <strong>Solid</strong> und <strong>Svelte</strong> und analysieren ihre Ansätze in Bezug auf Reaktivität und Performance.</p>

      <p>🧠 Wir gehen darauf ein, wie diese Technologien aktuelle Schwächen von React adressieren und was sie uns über die Zukunft der Webentwicklung verraten.</p>

      <h2>🔍 Themenübersicht:</h2>
      <ul>
        <li>🚫 Der Aufstieg von <strong>Zero-Bundle-Frameworks</strong></li>
        <li>⚙️ Compile-Time- vs. Runtime-Optimierung</li>
        <li>🧩 Die Zukunft von <strong>Server-Komponenten</strong></li>
        <li>🗂️ Neue Muster im <strong>State-Management</strong></li>
      </ul>

      <p>🚀 Begleite mich auf dieser Reise durch die nächste Generation von Web-Frameworks und entdecke, wie sie unsere Arbeitsweise verändern könnten.</p>
    `,
    tags: [
      "Webentwicklung",
      "JavaScript",
      "Frontend",
      "React",
      "Programmierung",
    ],
    readingTime: 8,
    readingTimeUnit: "Minuten",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    author: "Marcus Thompson",
    title: "Skalierbare Microservices mit Kubernetes und Go aufbauen",
    description:
      "Ein praxisorientierter Leitfaden zur Gestaltung und Umsetzung einer Microservices-Architektur mit Kubernetes und Go.",
    content: `
      <p>🏗️ Microservices sind heute der Standard für große Anwendungen – ihre korrekte Umsetzung ist jedoch komplex. In diesem Leitfaden zeigen wir dir, wie du mit <strong>Kubernetes</strong> und <strong>Go</strong> eine produktionsreife Architektur aufbaust.</p>

      <h2>🧰 Themen:</h2>
      <ul>
        <li>🔧 Einrichtung eines Kubernetes-Clusters</li>
        <li>🔍 Implementierung von Service Discovery</li>
        <li>🔄 Inter-Service-Kommunikation</li>
        <li>📊 Monitoring & Observability</li>
        <li>🚀 CI/CD-Strategien für Deployments</li>
      </ul>

      <p>📘 Am Ende dieses Artikels wirst du wissen, wie man skalierbare Microservices erfolgreich in die Produktion bringt.</p>
    `,
    tags: ["Kubernetes", "Go", "Microservices", "DevOps", "Cloud Native"],
    readingTime: 15,
    readingTimeUnit: "Minuten",
    imageUrl:
      "https://images.unsplash.com/photo-1463567517034-628c51048aa2?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    author: "Emily Rodriguez",
    title: "KI-gestützte Entwicklung: Wie AI unsere Arbeitsweise verändert",
    description:
      "Wie KI-Coding-Tools unsere Entwicklungsprozesse transformieren – Chancen, Herausforderungen und Ausblick.",
    content: `
      <p>🤖 Die Integration von KI in die Softwareentwicklung revolutioniert unsere Arbeitsweise. Von Code-Vervollständigung bis zu automatischen Tests – KI verändert, wie wir entwickeln.</p>

      <h2>🧪 Wir analysieren:</h2>
      <ul>
        <li>⚙️ Beliebte AI-Tools und ihre Fähigkeiten</li>
        <li>📈 Produktivitätsgewinne durch reale Anwendungsbeispiele</li>
        <li>🧱 Herausforderungen und Grenzen</li>
        <li>🔮 Zukunftstrends in KI-gestützter Entwicklung</li>
      </ul>

      <p>💡 Ob skeptisch oder begeistert – dieser Artikel hilft dir, die Rolle der KI in unserer Branche besser zu verstehen.</p>
    `,
    tags: [
      "Künstliche Intelligenz",
      "Softwareentwicklung",
      "Programmierung",
      "Technologie",
      "Zukunft",
    ],
    readingTime: 12,
    readingTimeUnit: "Minuten",
    imageUrl:
      "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    author: "David Kim",
    title: "TypeScript Best Practices im Jahr 2024",
    description:
      "Wichtige Muster und Strategien für wartbaren, typsicheren Code mit TypeScript.",
    content: `
      <p>🛠️ TypeScript entwickelt sich stetig weiter. In diesem Guide erfährst du, wie du moderne Best Practices effektiv einsetzt, um sauberen, robusten Code zu schreiben.</p>

      <h2>📚 Themen:</h2>
      <ul>
        <li>🧬 Erweiterte Typfunktionen</li>
        <li>⚠️ Fehlerbehandlung mit System</li>
        <li>🚀 Performance-Optimierung</li>
        <li>🧪 Teststrategien</li>
        <li>🔗 Integration mit modernen Frameworks</li>
      </ul>

      <p>✅ Vermeide typische Fallstricke und nutze das volle Potenzial von TypeScript.</p>
    `,
    tags: [
      "TypeScript",
      "JavaScript",
      "Programmierung",
      "Webentwicklung",
      "Best Practices",
    ],
    readingTime: 10,
    readingTimeUnit: "Minuten",
    imageUrl:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
