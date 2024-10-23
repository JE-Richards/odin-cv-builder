const emptyData = {
  personalSummary: {
    firstName: '',
    lastName: '',
    profession: '',
    professionalSummary: '',
  },
  contactDetails: {
    email: '',
    mobile: '',
    linkedIn: '',
    portfolio: '',
  },
  experience: [
    {
      company: '',
      role: '',
      dateFrom: '',
      dateTo: '',
      responsibilities: [''],
    },
  ],
  education: [
    {
      institute: '',
      qualification: '',
      dateFrom: '',
      dateTo: '',
    },
  ],
  skills: [''],
  interests: [''],
};

const exampleData = {
  personalSummary: {
    firstName: 'John',
    lastName: 'Doe',
    profession: 'WebDeveloper',
    professionalSummary:
      "A self-taught web developer specialising in front-end development. I'm always looking for new challenges and opportunities to expand my skill set and further my knowledge. In my free time, you can find me hiking, taking photos, and working on web projects.",
  },
  contactDetails: {
    email: 'thejohndoe@gmail.com',
    mobile: '07001122334',
    linkedIn: 'www.linkedin.com/in/john-doe',
    portfolio: 'www.johndoe.dev',
  },
  experience: [
    {
      company: 'Front-end Co.',
      role: 'Junior Web Developer',
      dateFrom: '08/2022',
      dateTo: '10/2024',
      responsibilities: [
        'Design and build responsive web pages using HTML, CSS, and JavaScript.',
        'Use Git to track and manage changes across all projects.',
        "Successfully integrated third party API's, like Google Maps.",
        'Participated in code reviews to improve code quality and learn best practices.',
        'Stay up to date with the latest web technologies to improve existing processes and workflows.',
        'Stay up to date with the latest web technologies to improve existing processes and workflows.',
      ],
    },
    {
      company: 'Generic Coffee Co.',
      role: 'Master Barista',
      dateFrom: '04/2019',
      dateTo: '08/2022',
      responsibilities: [
        'Resolved operational issues promptly, including equipment malfunctions and inventory shortages, to maintain workflow.',
        'Worked collaboratively with team members to meet peak demand, demonstrating effective communication and teamwork under pressure.',
        'Suggested and implemented a more efficient workflow for order preparation, reducing wait times by 20%.',
      ],
    },
  ],
  education: [
    {
      institute: 'Bright Falls University',
      qualification: 'Computer Science BSc',
      dateFrom: '04/2019',
      dateTo: '06/2022',
    },
    {
      institute: 'Other - The Odin Project',
      qualification: 'Web Development Course',
      dateFrom: '08/2022',
      dateTo: '03/2023',
    },
  ],
  skills: [
    'HTML5, CSS3, JavaScript (ES6), ReactJS, and SQL',
    'Version control with Git and GitHub',
    'Code testing via Jest',
    'Responsive web design and cross-browser compatibility',
    'Time management',
    'MS Office suite',
    'Awareness of WCAG accessibility standards',
    'Problem solving and debugging',
  ],
  interests: [
    'Web development projects',
    'Graphic design and UI/UX design',
    'Photography and photo editing',
    'Hiking and outdoor activities',
    'Reading non-fiction',
    'Puzzle solving',
  ],
};

export { emptyData, exampleData };
