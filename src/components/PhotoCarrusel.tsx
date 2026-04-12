'use client'

import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Pagination } from 'swiper/modules'
import { createClient } from '@supabase/supabase-js' // ← Importante para Realtime

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

import Image from 'next/image'
import Downbar from './Downbar'
import Aviso from './Aviso'

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
  const supabase = useRef(
    createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  ).current

  // Función para cargar las fotos más recientes
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

  // Cargar fotos al montar
  useEffect(() => {
    fetchFotos()
  }, [])

  // === REALTIME: Escuchar nuevas subidas ===
  useEffect(() => {
    // Canal para escuchar inserciones en la tabla storage.objects
    const channel = supabase
      .channel('storage-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'storage',
          table: 'objects',
          filter: `bucket_id=eq.quince-fotos`,   // ← Cambia si tu bucket se llama diferente
        },
        (payload) => {
          const newFilePath = payload.new.name

          // Solo procesar si está en la carpeta public/
          if (newFilePath.startsWith('public/')) {
            const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/quince-fotos/${newFilePath}`

            const newFoto: Foto = {
              id: payload.new.id || Date.now().toString(),
              url: publicUrl,
              path: newFilePath,
              created_at: payload.new.created_at,
            }

            // Agregar al inicio (la más nueva primero)
            setFotos((prev) => [newFoto, ...prev])
          }
        }
      )
      .subscribe()

    // Cleanup
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  // Auto-ocultar Downbar
  useEffect(() => {
    if (showDownbar) {
      timerRef.current = setTimeout(() => {
        setShowDownbar(false)
      }, 4000)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [showDownbar])

  const handleSlideClick = () => {
    setShowDownbar(true)
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
          // Lazy loading de Swiper (precarga las slides cercanas)
          lazyPreloadPrevNext={1}   // precarga 1 anterior y 1 siguiente
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
                loading="lazy"           // ← Lazy loading nativo de Next.js
                quality={85}             // buena calidad sin pesar mucho
                sizes="100dvw"            // ocupa todo el ancho de la pantalla
                // placeholder="blur"       // (opcional) efecto blur mientras carga
                // blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagYE0Z2R0H//Z" // puedes cambiar o quitar
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2" />
      </div>

      <Downbar visible={showDownbar} showWindow={true} showUsers={false} />
      <Aviso visible={showDownbar} text='Mantega presionado para compartir'/>
    </div>
  )
}