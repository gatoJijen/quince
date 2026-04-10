import React from 'react'

interface PropsAviso {
    visible?: boolean
}

const Aviso = ({visible}:PropsAviso) => {
  return (
    <div className={`left-[90%] -translate-x-[90%] z-[999]
                 w-dvw  text-right h-14 absolute top-0
                 bg-linear-to-tr
                  from-white/5 to-black/50 px-8 py-4 
                 items-center gap-8 justify-center
                 transition-all duration-300
                 ${visible 
                   ? 'flex opacity-100 translate-y-0' 
                   : 'flex opacity-0 translate-y-4 pointer-events-none'
                 }`}>
        <h1 className='font-bold text-[#E197AC]'>
            Mantega presionado para compartir
        </h1>
    </div>
  )
}

export default Aviso