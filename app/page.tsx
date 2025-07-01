import AboutMe from './sections/about'
import Skills from './sections/skills'
import Experience from './sections/experience'
import Projects from './sections/projects'

export default function Page() {
  return (
    <section>
      <AboutMe/>
      <Skills/>
      <Experience/>
      <Projects/>
    </section>
  )
}
