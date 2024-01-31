import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getBrandName,getToken,setToken } from './utils';

const Header =() => {
  const navigate = useNavigate();
    const brandName = getBrandName()
   const token =getToken()
    const logout = ()=>{
        console.log('click on logout')
        setToken({})
        navigate('/login')
    }
  return (
   <div className='navBar'>
    <div className='brand'>{brandName}Hello</div>
    <button className='logout' onClick={()=>logout()}>Logout</button>
    </div>
  );
  }

export default Header;
