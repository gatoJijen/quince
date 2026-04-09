'use client'

import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

import Image from 'next/image'
import Downbar from './Downbar' // ← ajusta la ruta según tu carpeta

interface Foto {
  id: string
  url: string
  path: string
  created_at?: string
}

export default function PhotoCarousel() {
  const [fotos, setFotos] = useState<Foto[]>([])
  const [loading, setLoading] = useState(true)
  const [showDownbar, setShowDownbar] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

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

  // Auto-hide después de 5 segundos
  useEffect(() => {
    if (showDownbar) {

      timerRef.current = setTimeout(() => {
        setShowDownbar(false)
      }, 3000) // ← 5 segundos (cámbialo a 4000 si quieres 4s)
    }

    // Cleanup al desmontar
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [showDownbar])

  const handleSlideClick = () => {
    setShowDownbar(true) // siempre muestra y reinicia el timer
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
        Cargando las fotos del 15...
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden w-screen h-screen">

      <div className="flex-1 relative">
        <Swiper
          modules={[EffectFade, Pagination]}
          effect="fade"
          speed={700}
          slidesPerView={1}
          pagination={{ clickable: true, el: '.custom-pagination' }}
          className="w-full h-full"
        >
          {fotos.map((foto) => (
            <SwiperSlide
              key={foto.id}
              onClick={handleSlideClick}
              className="cursor-pointer"
            >
              <Image
                src={foto.url}
                alt="Foto quinceañera"
                fill
                className="object-cover"
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2" />
      </div>

      <Downbar
        visible={showDownbar}
        showWindow={true}
        showUsers={false}
      />
    </div>
  )
}