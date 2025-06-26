import Link from 'next/link'

export default function NotFound() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        404 - Page Not Found
      </h1>
      <p className="mb-4">The page you are looking for does not exist. Use the navigation bar to go back to a section or go to the homepage by clicking <Link href="/" className="navLink">here</Link>.</p>
    </section>
  )
}
