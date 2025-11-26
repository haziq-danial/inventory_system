export default function Footer() {
  return (
    <footer className="bg-gray-200 text-blue-950 mt-10">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a
            href="#"
            className="hover:text-gray-400 transition-colors text-sm"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-gray-400 transition-colors text-sm"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-gray-400 transition-colors text-sm"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
