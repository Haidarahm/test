import React from 'react'

const DetailsSection = () => {
  return (
    <section className="emigo-technology h-screen relative ">
        <div className="title-description absolute top-0 right-0">
            <h1 className="title uppercase  text-end text-[31.7px] font-semibold">emigo <br/> advanced <br/> technology</h1>
            <p className='font-light uppercase text-end'>The emiGo container combines built in <br/> heating and smart sensors for precise <br/> temperature control every time</p>
        </div>
        <div className="content h-full w-full  overflow-hidden ">
           <div className="bottle flex h-full rotate-15 w-full justify-center items-center">
                <img src="/images/bottle.png" alt="" className='  w-[300px] h-auto'  />
           </div>
        </div>
    </section>
  )
}

export default DetailsSection