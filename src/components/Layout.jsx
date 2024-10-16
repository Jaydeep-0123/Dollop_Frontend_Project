import React from 'react'
import '../assets/styles/Layout.css';
function Layout({children}) {
  return (
    <div className='main_Div d-flex justify-content-center align-items-center'>
      
            {children}
    </div>
    

  )
}

export default Layout
