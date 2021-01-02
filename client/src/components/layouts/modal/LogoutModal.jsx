import React, { useContext } from 'react'
import AuthAction from '../../../utils/actions/AuthAction';
import { DispatchContext } from 'utils/context/AppContext';
import Modal from './Modal';
import SeasonAction from './../../../utils/actions/SeasonAction';

export default function LogoutModal() {
   const { userDispatch, seasonsDispatch } = useContext(DispatchContext);
   const logOut = (e) => {
      e.preventDefault();

      SeasonAction.getInstance(seasonsDispatch).Clear();
      AuthAction.getInstance(userDispatch).Logout();
   }
   return (
      <Modal id="logoutModal"
         title="Ready to Leave?"
         btnTitle="Logout"
         callback={logOut}
      >
         <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
      </Modal>
   )
}
