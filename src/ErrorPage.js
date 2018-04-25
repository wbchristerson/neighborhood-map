import React from 'react'
import hibiscus from './images/hibiscus.jpg'
import skyline from './images/skyline.jpg'
import sunset from './images/sunset.jpg'

const ErrorPage = (props) => {
  return (
    <main className="error-page">
      <h3 className="inner-margin">Uh-oh, there was an error in retrieving the necessary data.
        This may have been a result of a poor internet connection.</h3>
      <div role="Contentinfo" className="inner-margin">In the meantime, here is a picture of a hibiscus flower in Manhattan Beach:
        <img className="error-image" src={hibiscus} alt="A pink hibiscus flower"/>
      </div>
      <div role="Contentinfo" className="inner-margin">Here is a picture of the skyline facing the Pacific Ocean:
        <img className="error-image" src={skyline} alt="A view of the Manhattan Beach skyline"/>
      </div>
      <div role="Contentinfo" className="inner-margin">Here is a picture of a sunset over Manhattan Beach, also facing the Pacific Ocean:
        <img className="error-image" src={sunset} alt="A sunset over Manhattan Beach"/>
      </div>
    </main>
  )
}

export default ErrorPage
