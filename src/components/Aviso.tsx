import React from 'react'

interface PropsAviso {
    text: string;
    visible?: boolean
    color?: string;
}

const Aviso = ({visible, text, color}:PropsAviso) => {
  return (
    <div className={`left-[90%] -translate-x-[90%] z-999
                 w-dvw  text-right h-14 absolute top-0
                 bg-linear-to-tr
                  from-white/20 to-black/80 px-8 py-4 
                 items-center gap-8 justify-center
                 transition-all duration-300
                 ${visible 
                   ? 'flex opacity-100 translate-y-0' 
                   : 'flex opacity-0 translate-y-4 pointer-events-none'
                 }`}>
        <h1 className={`font-bold ${color? `${color}`:'text-[#E197AC]'}`}>
            {text}
        </h1>
    </div>
  )
}

export default Aviso