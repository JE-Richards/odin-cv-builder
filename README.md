# CV Builder App: A Novice ReactJS Project

## Table of Contents

1. [About](#about)
2. [Getting Started](#getting-started)
3. [Project Dependencies](#project-dependencies)
4. [The App](#the-app)
5. [Further Development](#future-additions--improvements)
6. [Acknowledgements](#acknowledgements)

## About

This React project forms part of [The Odin Project React course](https://www.theodinproject.com/lessons/node-path-react-new-cv-application#assignment). The purpose is to provide an opportunity for students to practice the concepts covered thus far in the course, as well as providing an opportunity to solidfy their understanding of topics covered in prior courses.

The aim of this project is to utilise ReactJS to create a simple app that allows a user to input some information to generate a CV.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/JE-Richards/odin-cv-builder
```

2. Navigate to the project directory:

```bash
cd your-repo
```

3. Install the [project dependencies](#project-dependencies):

```bash
npm install
```

4. Run the app:

```bash
npm run dev
```

5. Open the app in your browser at:

```bash
http://localhost:5173/
```

## Project Dependencies

The project was initialised using React with Vite, and all packages are then managed by npm. For the full list of dependencies, please check [package.json](./package.json)

## The App

The app has been deployed via [Vercel](https://vercel.com/) and can be viewed here: https://odin-cv-builder-eight.vercel.app/

## Future Additions & Improvements

- [ ] Editor:
  - [ ] Improve error message displays
    - [ ] If a form loads incorrect data, display an error immediately (currently requires the input to blur first)
    - [ ] If a form is cleared when an error is displayed, the error should also be cleared (currently requires the input to blur first)
- [ ] Forms:
  - [ ]Add additional input validation:
    - [ ] Responsibilities in the Experience form
    - [ ] Skills
    - [ ] Interests
  - [ ] Existing validation improvements:
    - [ ] Date validation - ensure "date from" is always before "date to"
  - [ ] Improve UX
    - [ ] Improve date inputs to automatically populate the / between month and year
    - [ ] Improve the linked in profile input to automatically populate the initial portion of the url
  - [ ] Add a 'clear section' button to each form section
- [ ] Preview:
  - [ ] For experiences and education, render user input data in chronological order
  - [ ] Implement responsive design for smaller screens. Current preview is set up for large screens, but breaks on smaller devices
- [ ] PDF Export:
  - [ ] Implement a PDF export that doesn't require saving the CV preview as a PNG first (i.e. the CV is text)
- [ ] Accessibility:
  - [ ] Implement Aria labels and other a11y features
- [ ] Refactoring:
  - [ ] Reduce CSS duplication
- [ ] Nice-to-haves:
  - [ ] Let users pick the colour schemes for the CV output
  - [ ] Add keyboard support to the modal (e.g. esc closes the modal)

## Acknowledgements

**Code for LinkedIn SVG:** https://pictogrammers.com/library/mdi/icon/linkedin/
