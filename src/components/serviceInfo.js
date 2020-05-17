import React from 'react'

function serviceInfo({ companyName, service, website }) {
  return (
    <React.Fragment>
      <div className="service-info-card">
        <a href={website}>
        <p>{companyName}</p>
        <p>{service}</p>
        </a>
      </div>
    </React.Fragment>
  )
}

export default serviceInfo
