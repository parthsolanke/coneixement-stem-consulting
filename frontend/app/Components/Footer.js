export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-1 px-2">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-2 m-6">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        {/* Logo or Site Name */}
        <div className="mb-4 md:mb-0: mr-10">
          <h1 className="text-2xl font-bold">Coneixement INDIA</h1>
        </div>

        <div className="flex flex-row items-center space-x-20">
          {/* Links */}
          <div className="flex flex-col space-y-10 md:space-y-10">
            <a href="/" className="text-white hover:text-gray-400 px-3 py-2">Home</a>
            <a href="/" className="text-white hover:text-gray-400 px-3 py-2">About</a>
          </div>
          {/* Links */}
          <div className="flex flex-col space-y-10 md:space-y-10">
            <a href="/" className="text-white hover:text-gray-400 px-3 py-2">Services</a>
            <a href="/" className="text-white hover:text-gray-400 px-3 py-2">Contact</a>
          </div>
        </div>


        
         
         {/* Address */}
         <div className="mt-4 md:mt-0 md:ml-4">
          <p className="text-white">Visit Us:</p>
          <div className="mt-3 md:mb-5 md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242118.17006032463!2d73.69815383080004!3d18.524545039677417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc295e20bba8f0f%3A0x9432569ab01c7934!2sConeixement%20India!5e0!3m2!1sen!2sus!4v1722621273747!5m2!1sen!2sus"
              width="250"
              height="150"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
           {/* Social Media Icons */}
        <div className="flex space-x-6 mt-4 md:mt-0 md:mb-4 md">
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

       
      </div>

      {/* Copyright */}
      <div className="container mx-auto text-center py-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">© 2024 Coneixement INDIA (OPC) Pvt Ltd. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
