import React from 'react'
import Hero from '../../../component/home/Hero/Hero'
import Features from '../../../component/home/Features/Features'
import { Helmet } from 'react-helmet';
function HomePage() {
  return (
    <div>
      <Helmet>
        <title>Trang chủ | JURK</title>
      </Helmet>
      <Hero />
      <Features />
    </div>
  )
}

export default HomePage