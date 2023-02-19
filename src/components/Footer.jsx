import React from 'react'
import '../style/style.css'

const Footer = () => {
  
  const today = new Date();
  const year = today.getFullYear();
  
  return (
    <div>
<footer class="bg-gray-900  text-white py-5">
  <div class="container mx-auto  text-center justify-between px-4">
    <div>
      <p>© {year} Jasim Ihsan . All rights reserved.</p>
    </div>

  </div>
</footer>

    </div>
  )
}

export default Footer