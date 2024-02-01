import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getBrandName, getName, getToken } from "./utils";
import { API_URL } from "./config";

const Home = () => {
  const navigate = useNavigate();
  const [tenantDetails,setTenantDetails] =useState([])
  const brandName = getBrandName()
  const name =getName()
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
    <h4 className="welcomeText">Welcome {name}! welcome to the tenant management app.</h4>
      <div>
      <p className="description">If you want to create new user then click on below button</p>
      <button
      className="createButton"
        onClick={() => handleLogin()}
      >
        Create New Tenant
      </button>
      <br />
      <br />
      </div>
      <div>
      {!!tenantDetails.length && (
        <>
          <h4 className="brandName">Tenants List</h4>
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
                  <td >{tenant.userName}</td>
                  <td >{tenant.brandName}</td>
                  <td>
                  {tenant.permissions
                    .filter((permission) => permission.isAccess)
                    .map((permission, index) => (
                      <span key={index} style={{ color: 'black', textDecoration: 'none' }} >
                        {permission.application.name}
                        {index < tenant.permissions.length - 1 && ', '}
                      </span>
                    ))}
                    </td>
                  <td>
                    <button onClick={() => navigate(`/tenant`, { state: { id: tenant.id } })}>  <i className="fas fa-pencil-alt" style={{ color: 'white' }}></i> 
                    </button>
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

