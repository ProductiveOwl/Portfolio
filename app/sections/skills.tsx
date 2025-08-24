import WordSearch from "./skills/wordSearch/wordSearchGrid";

export default function Skills() {
  return (
    <section className="mb-8 border border-transparent shadow-2xl p-4" id="skills">
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter text-center">
        Skills
      </h1>
      <WordSearch/>
    </section>
  )
}