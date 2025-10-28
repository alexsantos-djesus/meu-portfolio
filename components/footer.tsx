export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-12 py-8 text-sm text-zinc-400">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© 2025 Alex Santos. Todos os direitos reservados.</p>
        <div className="flex gap-4">
          <a href="https://github.com/alex" aria-label="GitHub">GitHub</a>
          <a href="https://www.linkedin.com/in/alex" aria-label="LinkedIn">LinkedIn</a>
          <a href="https://instagram.com/alex" aria-label="Instagram">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
