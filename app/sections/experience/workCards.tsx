'use client'

import { experienceData } from './experienceData'

export default function WorkCards() {
  return (
    <div className="container mt-4">
      {experienceData.workExperience.map((experience, index) => (
        <div
            className="modelCards mb-6 bg-blue"
            key={index}
            style={{
              alignItems: 'start',
              wordBreak: 'break-word',
              position: 'relative',
            }}
          >
            <p>{experience.title} @ {experience.company}</p>
            <p>{experience.date}</p>
            <p>{experience.description}</p>
        </div>
      ))}
    </div>
  )
}
