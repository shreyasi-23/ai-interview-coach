import { useUser } from "@/components/UserContext"
import { Link } from "react-router-dom";
import homeIcon from "@/assets/home-icon.png"; // make own images
import interviewIcon from "@/assets/interview-icon.png";

const HomePage = () => {
    const { user } = useUser()

    return (
        <div className="min-h-screen bg-[#F4ECE6] flex items-center justify-center px-6 pt-16">
          <div className="bg-white border-4 border-[#523D35] rounded-2xl p-10 shadow-xl max-w-2xl w-full text-center text-[#523D35]">
    
            {/* Icon at top */}
            <img src={homeIcon} alt="Home icon" className="w-20 mx-auto mb-4" />
    
            <h1 className="text-4xl font-bold mb-3">
              Welcome, to your Dashboard {user.username}! 
            </h1>
    
            <p className="text-lg opacity-90 mb-6">
              You're logged into <span className="font-semibold">AI Interview Coach</span>.
              Choose where you'd like to begin.
            </p>
    
            {/* Dashboard Section */}
            <div className="bg-[#E8D9CD] border border-[#523D35] rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
    
              {/* Link to Interview page */}
              <Link
                to="/interview"
                className="flex items-center gap-3 mx-auto w-fit px-5 py-3 bg-[#BBA58F] text-white border-2 border-black rounded-xl cursor-pointer hover:bg-[#523D35] transition-colors"
              >
                <img src={interviewIcon} className="w-6 h-6" />
                Begin Interview Practice
              </Link>
            </div>
          </div>
        </div>
      );
    };

export default HomePage;