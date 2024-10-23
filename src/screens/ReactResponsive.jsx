import React from 'react'
import MainLayout from '../components/MainLayout'
// import {Media} from 'react-responsive'
import {useMediaQuery,Media} from 'react-responsive';

function ReactResponsive() {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <MainLayout>
            <div>
      {isDesktop && <h1>This is a Desktop view</h1>}
      {isTablet && <h1>This is a Tablet view</h1>}
      {isMobile && <h1>This is a Mobile view</h1>}


      <Media query="(min-width: 1024px)">
      <div>I am Jaydeep Panwar</div>
      </Media>

    </div>
    </MainLayout>
  )
}

export default ReactResponsive
