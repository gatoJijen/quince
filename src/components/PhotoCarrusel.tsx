'use client'

import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Pagination } from 'swiper/modules'

// ✅ IMPORTS CSS CORREGIDOS para Next.js
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

import { Heart, Share2, Download, X } from 'lucide-react'
import Image from 'next/image'

interface Foto {
  id: string
  url: string
  path: string
  created_at?: string
}

export default function PhotoCarousel() {
  const [fotos, setFotos] = useState<Foto[]>([])
  const [loading, setLoading] = useState(true)

  const fetchFotos = async () => {
    try {
      const res = await fetch('/api/fotos/latest')
      const data = await res.json()
      setFotos(data || [])
    } catch (error) {
      console.error('Error cargando fotos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFotos()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl w-full h-[90%]max-x-[90dvw] max-h-[90dvh] ">
        Cargando las fotos del 15...
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden  w-dvw h-dvh">
      <div className="absolute hidden inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 z-10 max-x-[90dvw] max-h-[90dvh]" />

      <Swiper
        modules={[EffectFade, Pagination]}
        effect="fade"
        speed={700}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
        }}
        className="w-full h-full"
      >
        {fotos.map((foto) => (
          <SwiperSlide key={foto.id}>
            <Image
              src={foto.url}
              alt="Foto quinceañera"
              width={400}
              height={1200}
              className="w-full h-full object-cover"
            />

            {/* Overlay elegante */}
            {/* <div className="absolute inset-x-0 bottom-0 z-20 p-8 bg-gradient-to-t from-black/90 via-black/70 to-transparent max-x-[90dvw] max-h-[90dvh]">
              <div className="text-center max-w-md mx-auto">
                <h2 className="text-5xl font-serif tracking-widest text-amber-300 mb-2">
                  LUXURY
                </h2>
                <p className="text-white/90 text-lg">La Seda Eterna</p>

                <div className="flex justify-center gap-10 mt-10">
                  <button className="text-white hover:text-pink-400 transition-all">
                    <Heart size={36} strokeWidth={1.6} />
                  </button>
                  <button className="text-white hover:text-blue-400 transition-all">
                    <Share2 size={36} strokeWidth={1.6} />
                  </button>
                  <button 
                    onClick={() => window.open(foto.url, '_blank')}
                    className="text-white hover:text-amber-400 transition-all"
                  >
                    <Download size={36} strokeWidth={1.6} />
                  </button>
                  <button className="text-white hover:text-gray-400 transition-all">
                    <X size={36} strokeWidth={1.6} />
                  </button>
                </div>
              </div>
            </div> */}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Puntos de paginación */}
      <div className="custom-pagination absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2" />
    </div>
  )
}