
export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
        {/* Logo or Site Name */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">Coneixement INDIA</h1>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row">
          <a href="/" className="text-white hover:text-gray-400 px-3 py-2">Home</a>
          <a href="/" className="text-white hover:text-gray-400 px-3 py-2">About</a>
          <a href="/" className="text-white hover:text-gray-400 px-3 py-2">Services</a>
          <a href="/" className="text-white hover:text-gray-400 px-3 py-2">Contact</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="/" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook fa-lg"></i>
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            <i className="fab fa-instagram fa-lg"></i>
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto text-center py-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">© 2024 Coneixement INDIA (OPC) Pvt Ltd. All Rights Reserved.</p>
      </div>
    </footer>
  

    );
}