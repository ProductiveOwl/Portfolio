'use client'

import { experienceData } from './experienceData'

/* All the possible experience types */
type ExperienceType =
  | 'Work'
  | 'Club'
  | 'Volunteer'

export default function WorkCards() {

  /* This is to change the background and text colour depending on the experience type */
  const experienceTypeStyle: Record<ExperienceType, string> = {
    'Work': "bg-red-400 text-white",
    'Club': "bg-blue-400 text-white",
    'Volunteer': "bg-purple-400 text-white",
  }

  return (
    <div className="container mt-4">
      {experienceData.workExperience.map((experience, index) => (
        <div
          key={index}
          /*All work experiences will be left aligned and the rest will be right aligned */
          className={`flex mb-8 ${experience.experienceType === "Work" ? 'justify-start' : 'justify-end'}`}
        >
          <div
            className="w-4/5 bg-green-200 text-black rounded-xl p-4"
            style={{
              position: 'relative',
            }}
          >
            <p className="font-bold">{experience.title} @ {experience.company}</p>
            <div className="flex">
              <p>{experience.date}</p>
              <p /*Date and work expereince type are on the same line*/
                className={`mx-2 rounded-xl px-2 ${experienceTypeStyle[experience.experienceType]}`}>{experience.experienceType}
              </p>
            </div>
            <p>{experience.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
