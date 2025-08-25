export const experienceData = {
    /*List of all my work/club/volunteer experience in reverse chronological order 
    Required:
    - Title
    - Company
    - Experience Type (Work, Club or Volunteer)
    
    Optional:
    - Date
    - Description
    - Link & Link Description
    - Details (Bullet points)*/
    workExperience: [
        {
            title: 'Neural Network Research Assistant (USRA)',
            company: 'University of Guelph',
            date: 'May 2025 - Present (Co-op)',
            experienceType: 'Work',
            details: ["Worked on a Convolutional Neural Network (CNN) to predict quantitative traits in bioinformatics research by adjusting parameters and running tests on new data.",
                "Created scripts using Python (pandas) to parse over 4 million rows of genomic data into a format suitable for CNN analysis.",
                "Tested and documented popular genome analysis software with Python and Docker for future research."],
            link: 'https://github.com/ProductiveOwl/Soybean-CNN',
            linkDescription: 'Check out our CNN, research paper and results for the BIBM Conference.'
        },
        {
            title: 'Frontend Developer Member',
            company: 'iGEM Guelph',
            date: 'April 2025 - Present',
            experienceType: 'Club',
            details: ["A full-stack project that allows users to simulate genetic systems for the iGEM competition.",
                "Uses the OpenAI API to parse user requests from plain English to JSON to simulate various biological models.",
                "Uses React and Bootstrap in the frontend and Python in the backend."],
        },
        {
            title: 'Programming Teaching Assistant (UTA)',
            company: 'University of Guelph',
            date: 'January 2025 - April 2025 (4-month Contract)',
            experienceType: 'Work',
            details: ["Helped 250+ students understand foundational programming concepts using C in a Linux environment.",
                "Collaborated with TAs during labs to teach programming practices and debug errors with students.",
                "Graded assignments and answered student questions about fundamental data structures and memory allocation."],
        },
        {
            title: 'Go Code Girl Event Volunteer',
            company: 'Guelph Women in Computer Science',
            date: '2023, 2024, 2025',
            description: 'Helped guide elementary and high school students through various computer science activities, including coding in Scratch/Python and designing User Interfaces.',
            experienceType: 'Volunteer',
        },
        {
            title: 'IT Developer',
            company: 'Canada Revenue Agency',
            date: 'June 2023 - December 2024 (1.5 year Co-op/Contract)',
            experienceType: 'Work',
            details: ["Communicated with clients to resolve high-priority production errors affecting tax applications with Java Swing.",
                "Used development tools (Git, Maven, Jenkins, SonarQube, Eclipse, and Jira) to debug, test, deploy and document bug fixes that affect taxpayers.",
                "Followed the Software Development Life Cycle to update code \& documentation to refactor inefficient code."],
        },
        {
            title: 'Computing Research Member',
            company: 'STEM Fellowship',
            date: 'February - July 2024',
            description: 'Tested and coded various solutions to the Travelling Salesman Problem with a team using Python/Matplotlib and presented the results at the STEM Fellowship Indicium. The abstract was published in a journal by STEM Fellowship.',
            experienceType: 'Club',
            link: 'https://journal.stemfellowship.org/doi/epdf/10.17975/sfj-2025-006',
            linkDescription: "Read our abstract"
        },
        {
            title: 'Business Research Assistant (URA)',
            company: 'University of Guelph',
            date: 'June 2023 - August 2023 (4-month Contract)',
            description: 'Improved independent research skills by collecting and organizing admission and employment data about the Master of Business Analytics program at Canadian universities from various websites and databases using Microsoft Office.',
            experienceType: 'Work',
        },
    ],
}