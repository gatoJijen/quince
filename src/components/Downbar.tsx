import { Square, Upload } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface DownbarProps {
  showWindow?: boolean
  showUsers?: boolean
  visible?: boolean
}

const Downbar = ({ showWindow = true, showUsers = false, visible = false }: DownbarProps) => {
  return (
    <nav
      className={`left-[50%] -translate-x-[50%] z-[999]
                 w-[90%] max-w-md h-14 absolute bottom-4
                 bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl 
                 shadow-[#E197AC] rounded-3xl px-8 py-4 
                 items-center gap-8 justify-center
                 transition-all duration-300
                 ${visible 
                   ? 'flex opacity-100 translate-y-0' 
                   : 'flex opacity-0 translate-y-4 pointer-events-none'
                 }`}
    >
            <Link href={'/'} className={`p-2 rounded-full  backdrop-blur-xl flex w-12 h-12 justify-center items-center hover:scale-105 cursor-pointer transition-all ${showWindow? 'bg-[#E197AC]': 'bg-transparent  text-[#E197AC] fill-[#E197AC]'}`}>
                <span>
                    <Square size={14} strokeWidth={0} className={`${showWindow? 'text-[#E197AC]': 'text-white'}`} fill={`${showWindow? 'white':'#E197AC'}`} />
                    <Square size={14} strokeWidth={0} className={`${showWindow? 'text-[#E197AC]': 'text-white'}`} fill={`${showWindow? 'white':'#E197AC'}`} />
                </span>
                <span>
                    <Square size={14} strokeWidth={0} className={`${showWindow? 'text-[#E197AC]': 'text-white'}`} fill={`${showWindow? 'white':'#E197AC'}`} />
                    <Square size={14} strokeWidth={0} className={`${showWindow? 'text-[#E197AC]': 'text-white'}`} fill={`${showWindow? 'white':'#E197AC'}`} />
                </span>
            </Link>
            {/* <Link href={'/pages/favorites'} className={`p-2 rounded-full  backdrop-blur-lg flex w-12 h-12 justify-center items-center hover:scale-105 cursor-pointer transition-all 
                ${showHeart? 'bg-[#E197AC]':'bg-transparent'}`}>
                <Heart size={28} strokeWidth={2.5} color={`${showHeart?'white':'#E197AC'}`} fill={`${showHeart?'white':'#E197AC'}`}/>
            </Link> */}
            <Link href={'/pages/upload'} className={`p-2 rounded-full  backdrop-blur-lg flex w-12 h-12 justify-center items-center hover:scale-105 cursor-pointer transition-all  ${showUsers? 'bg-[#E197AC]':'bg-white/80'}`}> 
                <Upload size={28} strokeWidth={2.5} color={`${showUsers?'white':'#E197AC'}`} fill={`${showUsers?'white':'#E197AC'}`}/>
            </Link>
        </nav>
    )
}

export default Downbar