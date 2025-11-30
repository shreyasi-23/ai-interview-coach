import { useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '@/firebase/config';

const Navbar: React.FC = () => {
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState<boolean>(false);

    const handleLogout = () => {
        if (confirm("Are you sure you want to log out?")) {
            signOut(auth).catch((error) => {
                console.log(error);
            });
        }
    };

    return (
        <nav>
            <div className="fixed top-0 z-30 w-full py-6 text-white" style={{ background: '#523D35' }}>
                <div className="flex items-center justify-between mx-auto w-5/6 gap-16">
                    {/* Left: menu icon + label */}
                    <button
                        className="flex items-center"
                        style={{ gap: 8, background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}
                        onClick={() => setIsMenuToggled(!isMenuToggled)}
                    >
                        <CiMenuBurger size={20} />
                        <p style={{ fontWeight: 400 }}>menu</p>
                    </button>

                    {/* Center: title */}
                    <p style={{ fontWeight: 700, letterSpacing: 1 }}>AI INTERVIEW COACH</p>

                    {/* Right: account icon + username */}
                    <button
                        className="flex items-center"
                        style={{ gap: 8, background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}
                        onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                    >
                        <MdOutlineAccountCircle size={28} />
                        <p style={{ fontWeight: 400 }}>account</p>
                    </button>
                </div>
            </div>

            {/* menu */}
            {isMenuToggled && (
                <div className="fixed left-0 top-[76px] z-40 h-[calc(100vh-76px)] w-[300px] drop-shadow-xl flex flex-col" style={{ background: '#E8D9CD', color: '#523D35' }}>
                    {/* menu items - centered vertically */}
                    <div className="ml-[33%] flex flex-col gap-10 flex-1 justify-center">
                        <Link to="/" className="hover:text-[#7A5C54] transition">
                            Dashboard
                        </Link>
                        <p>Frontend</p>
                        <p>Backend</p>
                        <p>Data Science</p>
                        <Link to="/interview" className="hover:text-[#7A5C54] transition">
                            AI Interview Practice
                        </Link>
                    </div>
                </div>
            )}

            {/* Account dropdown */}
            {isAccountDropdownOpen && (
                <div
                    className="fixed right-[-2px] top-[74px] z-40 w-[300px] shadow-lg bg-white"
                    style={{ border: '2px solid #523D35'}}
                >
                    <button
                        onClick={handleLogout}
                        className="w-full px-3 py-2 hover:bg-gray-100 rounded transition"
                        style={{ color: 'black', background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;