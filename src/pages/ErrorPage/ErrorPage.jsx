import React from 'react'
import { history } from '../../App'

function ErrorPage() {

  document.title = 'Error'

  return (
    <div className='container mx-auto'>
      <img className='img-fluid' onClick={() => {
        if (localStorage.getItem('user_role') === 'ADMIN') {
          history.push('/admin');
        } else {
          history.push('/');
        }
      }} src="https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-template-17.png.webp" alt="" style={{ cursor: 'pointer' }} />
    </div>
  )
}

export default ErrorPage