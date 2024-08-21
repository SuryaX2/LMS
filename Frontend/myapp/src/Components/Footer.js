import React from 'react';

function Footer() {
    return (
        <footer className="relative overflow-hidden bg-white py-8 mt-auto">
            <span className="absolute top-5 left-16 w-11/12 h-0.5 bg-gray-200 rounded-full"></span>
            <div className="container relative z-10 mx-auto px-4">
                <div className="-m-8 flex flex-wrap items-center justify-between">
                    <div className="w-auto p-8">
                        <ul className="-m-5 flex flex-wrap items-center">
                            <li className="p-5">
                                <a
                                    className="font-medium text-gray-600 hover:text-gray-700 no-underline"
                                    href="/signup"
                                >
                                    Sign Up
                                </a>
                            </li>
                            <li className="p-5">
                                <a
                                    className="font-medium text-gray-600 hover:text-gray-700 no-underline"
                                    href="/login"
                                >
                                    Login
                                </a>
                            </li>
                            <li className="p-5">
                                <a
                                    className="font-medium text-gray-600 hover:text-gray-700 no-underline"
                                    href="https://github.com/SuryaX2/"
                                >
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-auto p-8">
                        <div className="-m-1.5 flex flex-wrap">
                            <div className="w-auto p-1.5">
                                <a href="https://www.facebook.com/SuryaSekhar.sharma.1GOD/">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                                        {/* Facebook icon */}
                                    </div>
                                </a>
                            </div>
                            {/* Other social media icons */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;