import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-5 mb-10">
      <p className="text-center font-bold">Contact:</p>
      <div className="flex flex-row justify-evenly mt-5">
        <div className="flex flex-row gap-3">
          <div className="flex-shrink-0 hidden sm:flex">
            <Link
              href="https://github.com/ProductiveOwl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/gitHubLogo.svg"
                alt="GitHub"
                className="h-6 w-auto"
              />
            </Link>
          </div>
          <a href="https://github.com/ProductiveOwl" className='underline decoration-1'>GitHub</a>
        </div>
        <div className="flex flex-row gap-3">
          <div className="flex-shrink-0 hidden sm:flex">
            <Link
              href="https://www.linkedin.com/in/madhurika-m-38ab20242/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/linkedInLogo.png"
                alt="LinkedIn"
                className="h-6 w-auto"
              />
            </Link>
          </div>
          <a href="https://www.linkedin.com/in/madhurika-m-38ab20242/" className='underline decoration-1'>LinkedIn</a>
        </div>
      </div>
      <p className="mt-5 text-center">
        © {new Date().getFullYear()} ProductiveOwl
      </p>
    </footer>
  )
}
