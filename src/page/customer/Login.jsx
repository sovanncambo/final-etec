import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import {
  FaFacebookF,
  FaGooglePlusG,
  FaLinkedinIn,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import StaffList from "../../Data/StaffList";

const Login = ({ setCurrentUser }) => {
  const navigate = useNavigate();

  // true  = show "Create Account" form (matches the reference screenshot)
  // false = show "Sign In" form
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState("");

  // Sign in fields
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Sign up fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Auto redirect if already logged in
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const user = JSON.parse(saved);
      if (user.role === "STAFF") {
        navigate("/admin", { replace: true });
      }
    }
  }, [navigate]);

  const loginUser = (userLoginData) => {
    setCurrentUser(userLoginData);
    localStorage.setItem("user", JSON.stringify(userLoginData));
    navigate(userLoginData.role === "STAFF" ? "/admin" : "/");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");

    const staff = StaffList.find(
      (s) => s.fullName.toLowerCase().trim() === loginName.toLowerCase().trim()
    );

    if (staff) {
      const passwordMatches = bcrypt.compareSync(loginPassword, staff.passwordHash);
      if (!passwordMatches) {
        setError("Incorrect password. Please try again.");
        return;
      }
      loginUser({ fullName: staff.fullName, role: "STAFF" });
      return;
    }

    // Not a staff member -> treat as a customer
    loginUser({ fullName: loginName, role: "CUSTOMER" });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");
    loginUser({ fullName: name, email, role: "CUSTOMER" });
  };

  const switchToSignIn = () => {
    setError("");
    setIsSignUp(false);
  };

  const switchToSignUp = () => {
    setError("");
    setIsSignUp(true);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* decorative shapes */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-400 [clip-path:polygon(100%_0%,100%_100%,0%_0%)] pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-yellow-300 rounded-full opacity-90 pointer-events-none" />

      {/* card */}
      <div className="relative z-10 w-full max-w-[900px] mx-auto rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden bg-white flex flex-col md:block md:h-[600px]">
        {/* Teal / overlay panel */}
        <div
          className={`order-1 md:order-none md:absolute md:top-0 md:h-full md:w-1/2 transition-all duration-700 ease-in-out ${
            isSignUp ? "md:left-0" : "md:left-1/2"
          } bg-gradient-to-br from-orange-500 to-red-600 text-white p-8 md:p-12 flex flex-col`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md">
              <img
                src="/images/photo_2026-09-09-22-17.jpj"
                alt="QuickBite logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-semibold tracking-wide">
              Quick<span className="text-yellow-300">Bite</span>
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center text-center gap-5 py-8">
            {isSignUp ? (
              <>
                <h2 className="text-3xl md:text-4xl font-bold">Welcome Back!</h2>
                <p className="text-white/90 max-w-[280px]">
                  To keep connected with us please login with your personal
                  info
                </p>
                <button
                  onClick={switchToSignIn}
                  className="mt-2 px-10 py-2.5 rounded-full border-2 border-white text-sm font-semibold tracking-wider hover:bg-white hover:text-red-600 transition-colors cursor-pointer"
                >
                  SIGN IN
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-bold">Hello, Friend!</h2>
                <p className="text-white/90 max-w-[280px]">
                  Enter your personal details and start your journey with us
                </p>
                <button
                  onClick={switchToSignUp}
                  className="mt-2 px-10 py-2.5 rounded-full border-2 border-white text-sm font-semibold tracking-wider hover:bg-white hover:text-red-600 transition-colors cursor-pointer"
                >
                  SIGN UP
                </button>
              </>
            )}
          </div>
        </div>

        {/* Form panel */}
        <div
          className={`order-2 md:order-none md:absolute md:top-0 md:h-full md:w-1/2 transition-all duration-700 ease-in-out ${
            isSignUp ? "md:left-1/2" : "md:left-0"
          } p-8 md:p-12 flex flex-col items-center justify-center`}
        >
          {isSignUp ? (
            <form
              onSubmit={handleSignUp}
              className="w-full max-w-[320px] flex flex-col items-center gap-4"
            >
              <h2 className="text-3xl font-bold text-orange-600">Create Account</h2>

              <div className="flex gap-3">
                {[FaFacebookF, FaGooglePlusG, FaLinkedinIn].map((Icon, i) => (
                  <span
                    key={i}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <Icon />
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-400 tracking-wide">
                or use your email for registration:
              </p>

              <div className="w-full flex items-center gap-3 bg-gray-100 rounded-md px-4 py-3">
                <FaUser className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
                />
              </div>

              <div className="w-full flex items-center gap-3 bg-gray-100 rounded-md px-4 py-3">
                <FaEnvelope className="text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
                />
              </div>

              <div className="w-full flex items-center gap-3 bg-gray-100 rounded-md px-4 py-3">
                <FaLock className="text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
                />
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold tracking-wider hover:opacity-90 transition-colors cursor-pointer"
              >
                SIGN UP
              </button>

              <p className="text-xs text-gray-400 md:hidden">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={switchToSignIn}
                  className="text-orange-600 font-semibold cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            </form>
          ) : (
            <form
              onSubmit={handleSignIn}
              className="w-full max-w-[320px] flex flex-col items-center gap-4"
            >
              <h2 className="text-3xl font-bold text-orange-600">Sign In</h2>

              <div className="flex gap-3">
                {[FaFacebookF, FaGooglePlusG, FaLinkedinIn].map((Icon, i) => (
                  <span
                    key={i}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <Icon />
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-400 tracking-wide">
                or use your account:
              </p>

              <div className="w-full flex items-center gap-3 bg-gray-100 rounded-md px-4 py-3">
                <FaUser className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Full name (e.g. vin van)"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  required
                  className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
                />
              </div>

              <div className="w-full flex items-center gap-3 bg-gray-100 rounded-md px-4 py-3">
                <FaLock className="text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
                />
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold tracking-wider hover:opacity-90 transition-colors cursor-pointer"
              >
                SIGN IN
              </button>

              <p className="text-xs text-gray-400 md:hidden">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={switchToSignUp}
                  className="text-orange-600 font-semibold cursor-pointer"
                >
                  Sign Up
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;