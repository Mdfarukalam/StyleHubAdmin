import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import storageService from "../service/storageService";
import API from "../ApiEndPoint/ApiUrl"
import useMutationApi from "../service/hooks/useMutationApi";

const Login = () => {
  const LoginMutation = useMutationApi("POST", API.Admin_Login);

  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Login API
 const LoginS = (e) => {
  e.preventDefault();

  setError("");

  LoginMutation.mutate(formData, {
    onSuccess: (data) => {
      storageService.setToken(data.token);

      toast.success("Login Successfully!");
      navigate("/dashboard");
    },

    onError: (error) => {
      setError(error.message);
      toast.error(error.message || "Login Failed!");
    },
  });
};



  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            <span className="text-gray-200">Style</span>
            <span className="text-pink-500">Hub</span>
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Admin Panel
          </p>
        </div>

        <div className="bg-[#181b24] border border-[#272b36] rounded-2xl p-6 sm:p-8 shadow-2xl">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              Admin Login
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Login to manage your StyleHub store
            </p>
          </div>

          <form onSubmit={LoginS}>

            {/* EMAIL */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Email
              </label>

              <input
                type="email"
                placeholder="admin@stylehub.com"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className="w-full bg-[#222631] border border-[#343946] rounded-lg px-4 py-3 text-white outline-none focus:border-pink-500"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="Password"
                  placeholder="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  className="w-full bg-[#222631] border border-[#343946] rounded-lg px-4 py-3 pr-12 text-white outline-none focus:border-pink-500"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>



            {/* LOGIN */}
            <button
              type="submit"
              onClick={LoginS}
              className="w-full bg-pink-600 hover:bg-pink-700 transition text-white font-semibold py-3 rounded-lg"
            >
              Login as Admin
            </button>

          </form>



        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          © 2026 StyleHub. Admin Panel
        </p>

      </div>
    </div>
  );
};

export default Login;