import React from 'react'
import MainLayout from '../components/MainLayout'
import nature from '../assets/image/Nature.jpg'
import image1 from '../assets/image/image1.jpg'
function DashBoardCarousal() {
  return (
    <MainLayout>
    <div >
       <div id="carouselExampleIndicators"  className="carousel slide p-1" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner h-50">
    <div className="carousel-item active">
      <img src={image1} className="d-block w-100 " height={620} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={nature} className="d-block w-100" height={620} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={image1} className="d-block w-100" height={620} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
    </MainLayout>
  )
}

export default DashBoardCarousal
