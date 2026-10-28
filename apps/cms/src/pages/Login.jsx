import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export default function Login() {
  const { login, currentUser } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState("vincent@freshmeadow.com");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // If already logged in, redirect to /overview
  React.useEffect(() => {
    if (currentUser) {
      navigate("/overview");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email address and password.");
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      navigate("/overview");
    } catch (err) {
      setError(err.message || "Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = (demoEmail) => {
    setEmail(demoEmail);
    setPassword("password123");
    setError("");
  };

  return (
    <div className="min-h-screen w-full relative bg-[#FAF7EF] flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden">
      {/* Background Hero Image (login-hero.png - Agak Transparent) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/assets/login-hero.png"
          alt=""
          className="w-full h-full object-cover opacity-20 filter blur-[0.5px] scale-105"
          onError={(e) => {
            e.currentTarget.src = "/assets/login-hero.png";
          }}
        />
        {/* Warm creamy tint overlay */}
        <div className="absolute inset-0 bg-[#FAF7EF]/65 backdrop-blur-[1px]" />
      </div>

      {/* Centered Modal / Login Card */}
      <div className="relative z-10 bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-[#EBE5D8] flex flex-col md:flex-row animate-slideUp">
        {/* Left Visual Image beside form (login.png) */}
        <div className="md:w-1/2 relative bg-[#F0ECE1] overflow-hidden min-h-[300px] md:min-h-[580px] flex items-center justify-center">
          <img
            src="/assets/login.png"
            alt="Fresh Meadow Dairy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Right Sign-in Form */}
        <div className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-between bg-white">
          <div>
            <h1 className="text-3xl font-extrabold text-[#17324D] tracking-tight">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to manage your dairy store
            </p>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#2563A6] focus:ring-[#2563A6] border-slate-300"
                  />
                  <span className="text-slate-600 font-medium">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="font-medium text-[#2563A6] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#2563A6] hover:bg-[#1C4E86] text-white font-semibold rounded-xl shadow-md shadow-blue-600/20 flex items-center justify-center space-x-2 transition-all active:scale-[0.99] disabled:opacity-60"
              >
                <span>{isLoading ? "Signing in..." : "Sign in"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-slate-400">
              Your account is provided by your administrator.
            </p>
          </div>

          {/* Quick Demo Credentials Helpers */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="text-[11px] text-slate-500 mb-2 font-medium">
              Demo Quick-Fill Accounts:
            </div>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => handleDemoFill("vincent@freshmeadow.com")}
                className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium transition-colors"
              >
                Admin (Vincent)
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill("amelia@freshmeadow.com")}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium transition-colors"
              >
                Product Mgr (Amelia)
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill("rizky@freshmeadow.com")}
                className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 font-medium transition-colors"
              >
                Inventory (Rizky)
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-slate-500">
              Need access?{" "}
              <span className="font-semibold text-[#2563A6]">
                Contact your administrator.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white max-w-sm w-full rounded-2xl p-6 shadow-xl border border-slate-100 text-center">
            <div className="w-12 h-12 bg-blue-50 text-[#2563A6] rounded-full flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Administrator Managed
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              This internal system is restricted. If you forgot your password,
              please contact the IT Administrator (
              <span className="font-semibold text-slate-800">
                admin@freshmeadow.com
              </span>
              ) to reset your credentials.
            </p>
            <button
              onClick={() => setShowForgotModal(false)}
              className="mt-5 w-full py-2 bg-[#2563A6] text-white text-xs font-semibold rounded-xl"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
