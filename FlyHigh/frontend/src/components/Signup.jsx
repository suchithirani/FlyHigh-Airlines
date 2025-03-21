

  import { useState } from 'react';
  import { X, Loader2 } from 'lucide-react';
  import { toast } from "react-toastify";
  import { Navigate, useNavigate } from 'react-router-dom';
  const Signup = ({ onClose, onLoginClick ,onSignUpSuccess}) => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [home, setHome] = useState(false);
  
    const validatePassword = (password) => {
      const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*]/.test(password)
      };
      return requirements;
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
  
      // Clear errors when typing
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
  
      // Validate password strength while typing
      if (name === 'password') {
        const requirements = validatePassword(value);
        setErrors(prev => ({
          ...prev,
          passwordRequirements: requirements
        }));
      }
    };

    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};
      setLoading(true);
  
      // Validate email format
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
  
      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
  
      // Validate password strength
      const passwordReqs = validatePassword(formData.password);
      if (!Object.values(passwordReqs).every(Boolean)) {
        newErrors.password = 'Password does not meet requirements';
      }
  
      if (Object.keys(newErrors).length > 0) {
        setErrors(prev => ({ ...prev, ...newErrors }));
        return;
      }
  
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8081/api/users/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password
          })
        });
  
        if (!response.ok) {
          throw new Error("Failed to create account");
        }
  
        const userData = await response.json();
        localStorage.setItem("user_details", JSON.stringify(userData));
        console.log(response.formData)
  
        toast.success("User Registered Successfully!", { position: "top-center" });
        console.log("User Registered Successfully", userData);

        if(onSignUpSuccess){
          onSignUpSuccess();
        }
        setHome(true);
        window.location.href='/home';
  
      } catch (error) {
        console.error("Signup Error:", error.message);
        toast.error(error.message, { position: "bottom-center" });
      } finally {
        setLoading(false);
      }
      
    };
  
    return (
      <div className="fixed z-40 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
  
          <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
  
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
  
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
  
            <div>
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
  
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
  
          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={onLoginClick}
              className="text-blue-500 hover:text-blue-600"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Signup;
  