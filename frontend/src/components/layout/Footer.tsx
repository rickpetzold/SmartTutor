export default function Footer() {
  return (
    <footer className="w-full border-t bg-white mt-8">
      <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-gray-500 flex items-center justify-between">
        <span>&copy; {new Date().getFullYear()} SmartTutor</span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
} 