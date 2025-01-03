import React from 'react'
import UpdateStudentProfile from './StudentUpdateForm'
import UpdateCompanyProfile from './CompanyUpdateForm'
function UpdateProfile() {
    const userRole = sessionStorage.getItem('userRole')
  return (
    <div>
       {userRole === 'student' ? <UpdateStudentProfile/> : <UpdateCompanyProfile/>}
    </div>
  )
}

export default UpdateProfile
