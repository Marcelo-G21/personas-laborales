'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const peopleIds = await queryInterface.bulkInsert(
      'People',
      [
        {
          name: 'Stefania',
          lastName: 'Montecino',
          nationality: 'Chilean',
          year: 1998,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Jane',
          lastName: 'Smith',
          nationality: 'British',
          year: 1985,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Alice',
          lastName: 'Johnson',
          nationality: 'Canadian',
          year: 1993,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Robert',
          lastName: 'Brown',
          nationality: 'Australian',
          year: 1988,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Emily',
          lastName: 'Davis',
          nationality: 'American',
          year: 1995,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Michael',
          lastName: 'Miller',
          nationality: 'German',
          year: 1982,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Laura',
          lastName: 'Wilson',
          nationality: 'French',
          year: 1991,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Daniel',
          lastName: 'Moore',
          nationality: 'Spanish',
          year: 1994,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sarah',
          lastName: 'Taylor',
          nationality: 'Dutch',
          year: 1987,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'David',
          lastName: 'Anderson',
          nationality: 'Italian',
          year: 1992,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: ['id'] }
    );

    const jobs = [];
    const companies = [
      'TechCorp',
      'BusinessCo',
      'DesignFirm',
      'RetailHub',
      'StartupX',
    ];
    const positions = [
      'Software Engineer',
      'Project Manager',
      'Designer',
      'Consultant',
      'Developer',
    ];

    for (const person of peopleIds) {
      const numJobs = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < numJobs; i++) {
        jobs.push({
          company: companies[Math.floor(Math.random() * companies.length)],
          initContract: new Date(2020, Math.floor(Math.random() * 12), 1),
          finishContract: new Date(2022, Math.floor(Math.random() * 12), 1),
          position: positions[Math.floor(Math.random() * positions.length)],
          personId: person.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('Jobs', jobs);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Jobs', null, {});
    await queryInterface.bulkDelete('People', null, {});
  },
};
