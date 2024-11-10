export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-secondary text-white mb-8 px-8">
      <h1 className="text-2xl">Game App</h1>
      <nav>
        <ul className="flex gap-4">
          <li>
            <a href="/" className="hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="/games" className="hover:text-gray-300">
              Games
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
