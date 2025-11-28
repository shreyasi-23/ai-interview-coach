import { useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { useUser } from '../components/UserContext'
import { Link } from 'react-router-dom';

type NavbarProps = {
    username?: string;
};

const Navbar: React.FC<NavbarProps> = ({ username = 'account' }) => {
    const { user } = useUser();
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);

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
                    <button className="flex items-center" style={{ gap: 8, background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                        <MdOutlineAccountCircle size={28} />
                        <p style={{ fontWeight: 400 }}>{user.username ?? "account"}</p>
                    </button>
                </div>
            </div>

            {/* menu */}
            {isMenuToggled && (
                <div className="fixed left-0 top-16 z-40 h-[calc(100vh-64px)] w-[300px] drop-shadow-xl flex flex-col" style={{ background: '#E8D9CD', color: '#523D35' }}>
                    {/* menu items - centered vertically */}
                    <div className="ml-[33%] flex flex-col gap-10 flex-1 justify-center">
                    <Link to="/" className="underline text-lg hover:text-[#7A5C54] transition">
                            Dashboard
                        </Link>
                        <p>Frontend</p>
                        <p>Backend</p>
                        <p>Data Science</p>
                        <Link to="/interview" className="underline text-lg hover:text-[#7A5C54] transition">
                            AI Interview Practice
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;