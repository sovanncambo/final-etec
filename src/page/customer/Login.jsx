
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StaffList from '../../Data/StaffList';

const Login = ({ setCurrentUser }) => {
  const [inputName, setInputName] = useState("");
  const navigate = useNavigate();

  // បើ Login រួចហើយ ពេលបើកទំព័រ Login មក ឱ្យ Auto Redirect ទៅតាម Role តែម្តង
  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const user = JSON.parse(saved);
      if (user.role === "STAFF") {
        navigate('/admin', { replace: true });
      }
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const isStaff = StaffList.some(
      (staff) => staff.fullName.toLowerCase().trim() === inputName.toLowerCase().trim()
    );

    const userLoginData = {
      fullName: inputName,
      role: isStaff ? "STAFF" : "CUSTOMER"
    };

    setCurrentUser(userLoginData);
    localStorage.setItem('user', JSON.stringify(userLoginData));

    if (isStaff) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label>Full Name:</label>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Enter full name (e.g. vin van)"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
