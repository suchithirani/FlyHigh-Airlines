import { useState } from "react";
import { X, Loader2 } from 'lucide-react';
import { toast } from "react-toastify";
import Home from "./Home";

const Login = ({ onClose, onSignupClick, onLoginSuccess }) => {  // Make sure onLoginSuccess is received as prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [home, setHome] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8081/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      console.log(response);
      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const userData = await response.json();
      localStorage.setItem("user_details", JSON.stringify(userData));
      console.log("User logged in Successfully", userData);
      toast.success("User logged in Successfully", { position: "top-center" });

      // Call the onLoginSuccess callback to update the navbar state
      if (onLoginSuccess) {
        onLoginSuccess();
      }

      setHome(true);
      window.location.href = "/home";
    } catch (err) {
      console.error(err.message);
      setError("Invalid email or password");
      toast.error(err.message, { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-40 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <a href="#" className="text-blue-500 hover:text-blue-600">Forgot password?</a>
          <div className="mt-2">
            Don&apos;t have an account?{' '}
            <button onClick={onSignupClick} className="text-blue-500 hover:text-blue-600">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;