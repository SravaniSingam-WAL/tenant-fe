import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getBrandName, getToken } from "./utils";
import { API_URL } from "./config";

const Home = () => {
  const navigate = useNavigate();
  const [tenantDetails,setTenantDetails] =useState([])
  const brandName = getBrandName()
  const handleLogin = ()=>{
    console.log('Login is Done')
    navigate("/tenant");
    
  }
  useEffect(() => {
    const fetchData = async () => {
    console.log('Clicked on View Tenant')
    const token=getToken()
    const result = await axios.get(
      `${API_URL}/api/tenants`,
      {
        headers: {
          Authorization: token
        },
       }
    );
    console.log(result.data.data)
    setTenantDetails(result.data.data)
};

fetchData();
}, []);

  return (
    <div className="home-container">
      <h2>BrandName {brandName}</h2>
      <div>
      <span
        style={{ cursor: "pointer", fontSize:'17px' }}
        onClick={() => handleLogin()}
      >
        Create New Tenant
      </span>
      <br />
      <br />
      </div>
      <div>
      {!!tenantDetails.length && (
        <>
          <h4>Tenants List</h4>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>BrandName</th>
                <th>Applications</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {tenantDetails.map((tenant, index) => (
                <tr key={index}>
                  <td>{tenant.userName}</td>
                  <td>{tenant.brandName}</td>
                  {tenant.permissions
                    .filter((permission) => permission.isAccess)
                    .map((permission, index) => (
                      <span key={index}>
                        {permission.application.name}
                        {index < tenant.permissions.length - 1 && ', '}
                      </span>
                    ))}
                  <td>
                    <button onClick={() => navigate(`/tenant`, { state: { id: tenant.id } })}> Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
        </div>
    </div>
  );
};

export default Home;

