import React from 'react'
import { useParams } from 'react-router'

const CampaignsDetails = () => {
  const {id } = useParams()
  return (
    <>
      <h1>campain details by id {id}</h1>
    </>
  )
}

export default CampaignsDetails
