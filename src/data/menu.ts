export const menu = [
  {
    label: "Produkte",
    link: "/produkte",
    description: "",
    showLogo: true,
    children: [
      {
        label: "Funktionen",
        link: "/produkte/funktionen",
        description: "",
        showLogo: false,
        children: [
          {
            label: "User Experience",
            link: "#",
            description: "",
          },
          {
            label: "Template Prinzip",
            link: "#",
            description: "",
          },
          {
            label: "SAP Integration",
            link: "#",
            description: "",
          },
          {
            label: "Offline & Sync+",
            link: "#",
            description: "",
          },
          {
            label: "ERP-Erweiterungen",
            link: "#",
            description: "",
          },
          {
            label: "Ontego Designer",
            link: "#",
            description: "",
          },
        ],
      },
      {
        label: "Einsatzbereiche",
        link: "/produkte/einsatzbereiche",
        description: "",
        children: [
          { label: "Lagerlogistik", link: "#" },
          { label: "Produktion", link: "#" },
          { label: "Inventur", link: "#" },
          { label: "Service Management", link: "#" },
          { label: "Instandhaltung", link: "#" },
          { label: "Weitere Bereiche", link: "#" },
        ],
      },
      {
        label: "Mobile Geräte",
        link: "/produkte/mobile-gerate",
        description: "Mobile Hardware für meine Mitarbeiter finden.",
      },
    ],
  },
  {
    label: "Warum Ontego?",
    link: "/warum",
    showLogo: false,
    children: [
      {
        label: "Gute Gründe",
        link: "#",
        description: "Warum Unternehmen auf Ontego Business Mobility setzen.",
      },
      {
        label: "Im Einsatz",
        link: "#",
        description: "",
        children: [{ label: "Referenzen", link: "#" }],
      },
      {
        label: "Das sind wir",
        link: "#",
        description: "",
        children: [
          { label: "Unternehmen", link: "#" },
          { label: "Standorte", link: "#" },
          { label: "Karriere", link: "#" },
        ],
      },
    ],
  },
  {
    label: "Events",
    link: "#",
    showLogo: false,
    children: [
      {
        label: "Messen & Kongresse",
        link: "#",
        children: [
          { label: "VLB Logistikfachkongress 2024", link: "#" },
          { label: "LogiMAT 2024", link: "#" },
        ],
      },
    ],
  },
  {
    label: "Ressourcen",
    link: "#",
    showLogo: false,
    children: [
      {
        label: "Mobility Blog",
        link: "#",
        description:
          "Informationen und Tipps rund um MDE für SAP und andere ERP-Systeme.",
      },
    ],
  },
];
