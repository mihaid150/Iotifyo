import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export const Footer =() =>{
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='http://mihaiddomain150.go.ro:3000/'>
          Iotifyo version 0.12
        </a>
      </div>
    </MDBFooter>
  );
}