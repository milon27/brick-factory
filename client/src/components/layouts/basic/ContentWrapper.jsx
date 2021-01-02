import React from 'react'
import Footer from './Footer';
import Header from './Header';

export default function ContentWrapper(props) {
   return (
      <div id="content-wrapper" className="d-flex flex-column bg-white">
         <div id="content">
            {/*Topbar*/}
            <Header />
            {/* main content */}
            <div className="container-fluid">
               {props.children}
            </div>
         </div>
         {/*Footer*/}
         <Footer />
      </div>
   )
}
