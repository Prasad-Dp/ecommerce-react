import React from 'react'
import { Navigate } from 'react-router-dom'

function AdminRoute({children}) {

    const admin=localStorage.getItem('admin')
    

    if(admin){
        return children
    }
    else{
        return <Navigate to={'/'} />
    }

}

export default AdminRoute
