import Preview from '../Preview.jsx';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

const mockEmptyData = {
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

const mockData = {
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
      ],
    },
    {
      company: 'Generic Coffee Co.',
      role: 'Master Barista',
      dateFrom: '04/2019',
      dateTo: '08/2022',
      responsibilities: [
        'Resolved operational issues promptly, including equipment malfunctions and inventory shortages, to maintain workflow.',
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
  ],
  interests: ['Web development projects', 'Graphic design and UI/UX design'],
};

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);

describe('Testing the Preview component', () => {
  describe('Testing the initial render', () => {
    test('Preview renders the basic structure', () => {
      const { container } = render(<Preview cvData={mockEmptyData} />);

      expect(
        container.querySelector('.preview__details-personal')
      ).toBeInTheDocument();
      expect(container.querySelector('.preview__history')).toBeInTheDocument();
    });

    test('Preview renders correctly with empty data', () => {
      // If data is empty, only text content in the cv should come from .preview__heading elements
      const { container } = render(<Preview cvData={mockEmptyData} />);

      const headings = container.querySelectorAll('.preview__heading');

      headings.forEach((heading) => {
        expect(heading).toBeInTheDocument();
        expect(heading.textContent).not.toBe('');
      });

      // Check no other text context exists
      const allTextContent = container.textContent;
      const headingsText = Array.from(headings)
        .map((heading) => heading.textContent)
        .join('');
      expect(allTextContent.replace(headingsText, '').trim()).toBe('');
    });

    test('Preview correctly renders personal summary', () => {
      render(<Preview cvData={mockData} />);

      const name = screen.getByText('John Doe');
      const profession = screen.getByText('WebDeveloper');
      const profSummary = screen.getByText(
        mockData.personalSummary.professionalSummary
      );

      expect(name).toBeInTheDocument();
      expect(profession).toBeInTheDocument();
      expect(profSummary).toBeInTheDocument();
    });

    test('Preview correctly renders contact details', () => {
      render(<Preview cvData={mockData} />);

      const email = screen.getByText(mockData.contactDetails.email);
      const mobile = screen.getByText(mockData.contactDetails.mobile);
      const linkedIn = screen.getByText(mockData.contactDetails.linkedIn);
      const portfolio = screen.getByText(mockData.contactDetails.portfolio);

      expect(email).toBeInTheDocument();
      expect(mobile).toBeInTheDocument();
      expect(linkedIn).toBeInTheDocument();
      expect(portfolio).toBeInTheDocument();
    });

    test('Preview correctly renders experience', () => {
      render(<Preview cvData={mockData} />);

      const companyOne = screen.getByText(mockData.experience[0].company);
      const roleOne = screen.getByText(mockData.experience[0].role);
      const dateOne = screen.getByText(
        `${mockData.experience[0].dateFrom} - ${mockData.experience[0].dateTo}`
      );
      const roleOneRespOne = screen.getByText(
        mockData.experience[0].responsibilities[0]
      );
      const roleOneRespTwo = screen.getByText(
        mockData.experience[0].responsibilities[1]
      );
      const companyTwo = screen.getByText(mockData.experience[1].company);
      const roleTwo = screen.getByText(mockData.experience[1].role);
      const dateTwo = screen.getByText(
        `${mockData.experience[1].dateFrom} - ${mockData.experience[1].dateTo}`
      );
      const roleTwoRespOne = screen.getByText(
        mockData.experience[1].responsibilities[0]
      );

      expect(companyOne).toBeInTheDocument();
      expect(roleOne).toBeInTheDocument();
      expect(dateOne).toBeInTheDocument();
      expect(roleOneRespOne).toBeInTheDocument();
      expect(roleOneRespTwo).toBeInTheDocument();
      expect(companyTwo).toBeInTheDocument();
      expect(roleTwo).toBeInTheDocument();
      expect(dateTwo).toBeInTheDocument();
      expect(roleTwoRespOne).toBeInTheDocument();
    });

    test('Preview correctly renders education', () => {
      render(<Preview cvData={mockData} />);

      const instOne = screen.getByText(mockData.education[0].institute);
      const qualOne = screen.getByText(mockData.education[0].qualification);
      const dateOne = screen.getByText(
        `${mockData.education[0].dateFrom} - ${mockData.education[0].dateTo}`
      );
      const instTwo = screen.getByText(mockData.education[1].institute);
      const qualTwo = screen.getByText(mockData.education[1].qualification);
      const dateTwo = screen.getByText(
        `${mockData.education[1].dateFrom} - ${mockData.education[1].dateTo}`
      );

      expect(instOne).toBeInTheDocument();
      expect(qualOne).toBeInTheDocument();
      expect(dateOne).toBeInTheDocument();
      expect(instTwo).toBeInTheDocument();
      expect(qualTwo).toBeInTheDocument();
      expect(dateTwo).toBeInTheDocument();
    });

    test('Preview correctly renders skills', () => {
      render(<Preview cvData={mockData} />);

      const skillOne = screen.getByText(mockData.skills[0]);
      const skillTwo = screen.getByText(mockData.skills[1]);

      expect(skillOne).toBeInTheDocument();
      expect(skillTwo).toBeInTheDocument();
    });

    test('Preview correctly renders interests', () => {
      render(<Preview cvData={mockData} />);

      const interestOne = screen.getByText(mockData.interests[0]);
      const interestTwo = screen.getByText(mockData.interests[1]);
    });
  });
});
