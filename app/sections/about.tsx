import CrosswordGrid from "./about/crossword/crosswordGrid";

export default function AboutMe() {
  return (
    <section className="mb-8 border border-transparent shadow-2xl p-4">
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter text-center" id="about">
        About Me
      </h1>
      <CrosswordGrid />
    </section>
  )
}