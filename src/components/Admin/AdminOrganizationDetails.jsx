import React from 'react'
import { useParams } from 'react-router'

const AdminOrganizationDetails = () => {
  const { id } = useParams()
  return (
    <>
      <h1>Org details by id {id}</h1>
    </>
  )
}

export default AdminOrganizationDetails
