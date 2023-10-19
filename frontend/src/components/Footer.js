import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-4">
            <div className="container mx-auto">
                <h5 className="text-2xl font-semibold text-center">BRANGKAS WEB-APP</h5>
            </div>
            <div className="container mx-auto flex flex-wrap justify-center">
                <div className="text-center w-full sm:w-auto sm:mr-4 mb-4">
                    <h6 className="font-semibold">Muhammad Yusuf</h6>
                    <a href="https://www.linkedin.com/in/muhammad-yusuf-subhan/">
                        <i className="fab fa-linkedin text-xl mx-2"></i>
                    </a>
                    <a href="https://github.com/enginoir">
                        <i className="fab fa-github text-xl mx-2"></i>
                    </a>
                </div>
                <div className="text-center w-full sm:w-auto sm:mr-4 mb-4">
                    <h6 className="font-semibold">Leonardo E Rambing</h6>
                    <a href="https://www.instagram.com/creamymilk__/">
                        <i className="fab fa-instagram text-xl mx-2"></i>
                    </a>
                    <a href="https://github.com/Creamymile">
                        <i className="fab fa-github text-xl mx-2"></i>
                    </a>
                </div>
                <div className="text-center w-full sm:w-auto sm:mr-4 mb-4">
                    <h6 className="font-semibold">Helmi Siswo Effendi</h6>
                    <a href="https://www.linkedin.com/in/helmieffendis/">
                        <i className="fab fa-linkedin text-xl mx-2"></i>
                    </a>
                    <a href="https://github.com/helmai1/">
                        <i className="fab fa-github text-xl mx-2"></i>
                    </a>
                </div>
                <div className="text-center w-full sm:w-auto mb-4">
                    <h6 className="font-semibold">Robiatul Adawiyah</h6>
                    <a href="https://www.linkedin.com/in/robiatul-adawiyah-980073295/">
                        <i className="fab fa-linkedin text-xl mx-2"></i>
                    </a>
                    <a href="https://github.com/wiwidadawiyah">
                        <i className="fab fa-github text-xl mx-2"></i>
                    </a>
                </div>
            </div>
            <div className="bg-gray-900 text-center">
                <div className="container mx-auto py-2">
                    © {new Date().getFullYear()} Copyright:{" "}
                    <a href="/" className="text-gray-300">Brangkas</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
