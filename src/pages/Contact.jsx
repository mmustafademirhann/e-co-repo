import { useState } from 'react'

import { Lgy } from '../components/Lgy'
import { Qanswer1 } from '../components/Qanswer1'
import { Qanswers2 } from '../components/Qanswers2'
import { ContactUs } from '../components/ContactUs'
const Contact = () => {
  const [activeQuestion, setActiveQuestion] = useState(null)

    return (
    <div className="flex flex-col bg-white">
      {/* Section 1: Get answers to all your questions */}
      <Qanswer1 />
      
      {/* Section 2: Questions & Answers */}
      <Qanswers2 />
      
      {/* Section 3: CONTACT US */}
      <ContactUs />
      <Lgy />
     
      </div>
    )
  }
  
  export default Contact
  