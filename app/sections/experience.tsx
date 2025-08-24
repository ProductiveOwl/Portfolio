import WorkCards from "./experience/workCards";

export default function Experience() {
  return (
    <section className="mb-8 border border-transparent shadow-2xl p-4" id="experience">
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter text-center">
        Experience
      </h1>
      <p className="text-center text-xl mb-8">Start</p>
      <WorkCards />
      <p className="mt-8 text-center text-xl">End</p>
    </section>
  )
}