import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
   return (
      <>
         {/* <!-- Sidebar --> */}
         <ul className="navbar-nav bg-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/* <!-- Sidebar - Brand --> */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
               <div className="sidebar-brand-icon rotate-n-15">
                  <i className="fas fa-laugh-wink"></i>
               </div>
               <div className="sidebar-brand-text mx-3">m27<sup>lab.com</sup></div>
            </a>
            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />


            <li className="nav-item ">
               <NavLink exact activeClassName="active" className="nav-link " to="/">
                  <i className="fas fa-fw fa-tachometer-alt"></i>
                  <span>Dashboard</span>
               </NavLink>
            </li>
            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
               Brick Built Cost Info
            </div>
            <li className="nav-item ">
               <NavLink exact activeClassName="active" className="nav-link" to="/shorder-list">
                  <i className="fas fa-fw fa-award"></i>
                  <span>Shorder List</span>
               </NavLink>
            </li>
            <li className="nav-item ">
               <NavLink exact activeClassName="active" className="nav-link" to="/mil-cost">
                  <i className="fas fa-fw fa-award"></i>
                  <span>Brick Built Cost</span>
               </NavLink>
            </li>
            <hr className="sidebar-divider d-none d-md-block" />


            <div className="sidebar-heading">
               Cost Info
            </div>
            <li className="nav-item">
               <NavLink exact activeClassName="active" className="nav-link" to="/labour-cost">
                  <i className="fab fa-fw fa-accusoft"></i>
                  <span>Labour Cost</span>
               </NavLink>
            </li>
            <li className="nav-item">
               <NavLink exact activeClassName="active" className="nav-link" to="/coal">
                  <i className="fas fa-fw fa-chart-area"></i>
                  <span>Coal Cost</span>
               </NavLink>
            </li>
            <li className="nav-item">
               <NavLink exact activeClassName="active" className="nav-link" to="/soil">
                  <i className="fas fa-fw fa-table"></i>
                  <span>Soil Cost</span>
               </NavLink>
            </li>
            <li className="nav-item">
               <NavLink exact activeClassName="active" className="nav-link" to="/tax">
                  <i className="fas fa-fw fa-hryvnia"></i>
                  <span>Tax Cost</span>
               </NavLink>
            </li>
            <li className="nav-item">
               <NavLink exact activeClassName="active" className="nav-link" to="/other-cost">
                  <i className="fas fa-fw fa-euro-sign"></i>
                  <span>Other Cost</span>
               </NavLink>
            </li>
            <hr className="sidebar-divider d-none d-md-block" />
            <div className="sidebar-heading">
               Staff Info
            </div>
            <li className="nav-item">
               <NavLink exact activeClassName="active" className="nav-link" to="/staff-list">
                  <i className="fas fa-fw fa-award"></i>
                  <span>Staff List</span>
               </NavLink>
            </li>
            <li className="nav-item">
               <NavLink exact activeClassName="active" className="nav-link" to="/staff-salary">
                  <i className="fab fa-fw fa-accusoft"></i>
                  <span>Staff Salary</span>
               </NavLink>
            </li>
            <hr className="sidebar-divider d-none d-md-block" />
            <div className="sidebar-heading">
               Land Loard Info
            </div>
            <li className="nav-item ">
               <NavLink exact activeClassName="active" className="nav-link" to="/land-lord-list">
                  <i className="fas fa-fw fa-award"></i>
                  <span>Land Lord List</span>
               </NavLink>
            </li>
            <li className="nav-item">
               <NavLink exact activeClassName="active" className="nav-link" to="/land-lord-cost">
                  <i className="fab fa-fw fa-accusoft"></i>
                  <span>Land Lord Cost</span>
               </NavLink>
            </li>
            <hr className="sidebar-divider d-none d-md-block" />

            <hr className="sidebar-divider d-none d-md-block" />

            {/* <!-- Sidebar Toggler (Sidebar) --> */}
            <div className="text-center d-none d-md-inline mt-2">
               <button className="rounded-circle border-0" id="sidebarToggle" onClick={() => {
                  document.getElementById("accordionSidebar").classList.toggle("toggled");
               }}></button>
            </div>
         </ul>
         {/* <!-- End of Sidebar --> */}
      </>
   )
}
