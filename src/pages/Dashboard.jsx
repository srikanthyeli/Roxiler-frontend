import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Dashboard.css";

const Dashboard = () => {
  
  const [stores, setStores] = useState([]);
  const [adminStats, setAdminStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const jwtToken = Cookies.get("jwt_token");
      
      if (!jwtToken) {
        navigate("/login");
        return;
      }

      try {
        // Decode the JWT token to get user ID
     

        // Fetch user data for the current user
        const userResponse = await fetch(
          `https://roxlier-backend-1.onrender.com/users`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!userResponse.ok) {
          throw new Error(`HTTP error! status: ${userResponse.status}`);
        }

       
        // Fetch stores data
        const storesResponse = await fetch(
          "https://roxlier-backend-1.onrender.com/stores",
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!storesResponse.ok) {
          throw new Error(`HTTP error! status: ${storesResponse.status}`);
        }

        const storesData = await storesResponse.json();

        // Fetch admin stats
        const statsResponse = await fetch(
          "https://roxlier-backend-1.onrender.com/admin/stats",
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!statsResponse.ok) {
          throw new Error(`HTTP error! status: ${statsResponse.status}`);
        }

        const statsData = await statsResponse.json();

        
        setStores(storesData);
        setAdminStats(statsData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
        if (error.message.includes("401")) {
          Cookies.remove("jwt_token");
          navigate("/");
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const jwtToken = Cookies.get("jwt_token");
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://roxlier-backend-1.onrender.com/stores/search?query=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      setError("Failed to search stores. Please try again later.");
      console.log(error)
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </nav>

      

      {adminStats && (
        <div className="stats-section">
          <h2>System Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p className="stat-number">{adminStats.users}</p>
            </div>
            <div className="stat-card">
              <h3>Total Stores</h3>
              <p className="stat-number">{adminStats.stores}</p>
            </div>
            <div className="stat-card">
              <h3>Total Ratings</h3>
              <p className="stat-number">{adminStats.ratings}</p>
            </div>
          </div>
        </div>
      )}

<div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stores by name or address..."
              className="search-input"
            />
          </div>
        </form>
      </div>

      <div className="stores-section">
        <h2>{isSearching ? "Search Results" : "Available Stores"}</h2>
        <div className="stores-grid">
          {(searchResults.length > 0 ? searchResults : stores).map((store) => (
            <div key={store.id} className="store-card">
              <h3>{store.name}</h3>
              <p>{store.address}</p>
              <p>Email: {store.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;