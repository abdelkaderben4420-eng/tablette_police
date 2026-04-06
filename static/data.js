window.MDT_DATA = {
  agents: [
    { username:"l.morel", password:"mdt123", prenom:"Lucas", nom:"Morel", grade:"Sergent", matricule:"LCPD-204", status:"En service", permissions:["lecture","rapports","braquages","amendes","points"] },
    { username:"e.mercier", password:"mdt123", prenom:"Ethan", nom:"Mercier", grade:"Lieutenant", matricule:"LCPD-117", status:"En service", permissions:["lecture","rapports","braquages","amendes","points","wanted","hierarchie"] },
    { username:"n.rossi", password:"mdt123", prenom:"Nolan", nom:"Rossi", grade:"Commandant", matricule:"LCPD-001", status:"En service", permissions:["all"] },
    { username:"m.leroy", password:"mdt123", prenom:"Mila", nom:"Leroy", grade:"Officier", matricule:"LCPD-312", status:"Patrouille", permissions:["lecture","rapports","braquages"] }
  ],
  hierarchy: [
    { grade:"Commandant", role:"Direction des opérations", rights:"Accès total MDT, hiérarchie, sanctions, braquages, avis de recherche." },
    { grade:"Lieutenant", role:"Supervision terrain", rights:"Gestion équipe, rapports, avis de recherche, sanctions." },
    { grade:"Sergent", role:"Chef d'unité", rights:"Braquages, rapports, points, amendes, coordination unités." },
    { grade:"Officier", role:"Patrouille", rights:"Consultation dossiers, rédaction rapports, suivi braquages." },
    { grade:"Cadet", role:"Formation", rights:"Lecture seule, observation, assistance." }
  ],
  citizens: [
    { nom:"Adam Ferreira", points:3, amendes:1200, gav:"Non", casier:"Refus d'obtempérer", danger:"Moyen" },
    { nom:"Noah Valente", points:7, amendes:3500, gav:"Oui", casier:"Braquage à main armée", danger:"Élevé" },
    { nom:"Lina Carmin", points:1, amendes:300, gav:"Non", casier:"Excès de vitesse", danger:"Faible" },
    { nom:"Yanis Moreau", points:5, amendes:2100, gav:"Non", casier:"Violences volontaires", danger:"Moyen" }
  ],
  vehicles: [
    { plaque:"LC-204-PD", modele:"Buffalo STX", proprietaire:"LCPD Fleet", statut:"Service" },
    { plaque:"AB-194-KQ", modele:"Sultan RS", proprietaire:"Noah Valente", statut:"Signalé" },
    { plaque:"DZ-881-TR", modele:"Baller", proprietaire:"Adam Ferreira", statut:"Contrôlé" }
  ],
  reports: [
    { title:"Contrôle boulevard central", target:"Adam Ferreira", content:"Contrôle routier effectué sans incident majeur. Vérifications conformes.", author:"Lucas Morel", date:"06/04/2026 16:20" },
    { title:"Intervention bijouterie", target:"Noah Valente", content:"Présence constatée à proximité immédiate du braquage. Fuite en véhicule noir.", author:"Ethan Mercier", date:"06/04/2026 14:10" }
  ],
  robberies: [
    { location:"Bijouterie Vinewood", type:"Bijouterie", priority:"Critique", details:"3 suspects armés, SUV noir, demande unités lourdes.", link:"Lié au suspect Noah Valente", time:"Il y a 6 min" },
    { location:"Banque Downtown", type:"Banque", priority:"Élevée", details:"Prise d'otage probable, négociation en cours.", link:"Lié à l'avis de recherche #A-15", time:"Il y a 18 min" }
  ],
  fines: [
    { citizen:"Adam Ferreira", amount:1200, points:3, reason:"Refus de priorité et défaut de maîtrise", author:"Lucas Morel", date:"06/04/2026 11:02" }
  ],
  wanted: [
    { name:"Noah Valente", level:"Élevée", reason:"Suspect principal dans plusieurs braquages et fuite armée.", author:"Ethan Mercier", date:"06/04/2026 15:00" }
  ]
};