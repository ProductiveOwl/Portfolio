'use client'

import { experienceData } from './experienceData'

// All possible experience types
type ExperienceType = 'Work' | 'Club' | 'Volunteer'

export default function WorkCards() {
  // Background colour for the experience type
  const experienceTypeStyle: Record<ExperienceType, string> = {
    Work: 'bg-red-400 text-white',
    Club: 'bg-blue-400 text-white',
    Volunteer: 'bg-purple-400 text-white',
  }

  return (
    <div className="container mt-4">
      {experienceData.workExperience.map((experience, index) => {
        // All work experiences will be left-aligned and the rest will be right-aligned
        const isLeft = experience.experienceType === 'Work'

        // Logic for cards on the left vs right
        const alignment = isLeft ? 'justify-start' : 'justify-end'
        const verticalBorderSide = isLeft ? 'right-0' : 'left-0'

        return (
          <div key={index}>
            {/* Outer container */}
            <div className={`flex ${alignment}`}>
              {/* Border Card */}
              <div className="relative w-10/11 py-10 rounded-xl">

                {/* Top SVG line - only for right-aligned cards*/}
                {!isLeft && (
                  <svg
                    className={`absolute top-0 ${verticalBorderSide} w-[90%] h-[2px]`}
                    viewBox="0 0 100 2"
                    preserveAspectRatio="none"
                  >
                    <line x1="0" y1="1" x2="100" y2="1" stroke="white" strokeWidth="2" />
                  </svg>
                )}

                {/* Bottom SVG line - only for right-aligned cards*/}

                {!isLeft && (<svg
                  className={`absolute bottom-0 ${verticalBorderSide} w-[90%] h-[2px]`}
                  viewBox="0 0 100 2"
                  preserveAspectRatio="none"
                >
                  <line x1="0" y1="1" x2="100" y2="1" stroke="white" strokeWidth="2" />
                </svg>
                )}

                {/* Vertical SVG line - all cards */}
                <svg
                  className={`absolute top-0 ${verticalBorderSide} h-full w-[2px]`}
                  viewBox="0 0 2 100"
                  preserveAspectRatio="none"
                >
                  <line x1="1" y1="0" x2="1" y2="100" stroke="white" strokeWidth="2" />
                </svg>

                {/* Actual content card */}
                <div className={`flex ${alignment}`} style={{ wordBreak: 'break-word' }}>
                  <div className="container w-[90%] bg-green-300 text-black rounded-xl p-4 shadow-md">
                    <p className="font-bold">{experience.title} @ {experience.company}</p>

                    {/* Date and experience type areon the same line */}
                    <div className="flex flex-wrap items-center">
                      <p>{experience.date}</p>
                      <p className={`mx-2 rounded-xl px-2 ${experienceTypeStyle[experience.experienceType]}`}>
                        {experience.experienceType}
                      </p>
                    </div>

                    <p>{experience.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
