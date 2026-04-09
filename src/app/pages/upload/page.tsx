'use client'

import Downbar from '@/components/Downbar'
import Navbar from '@/components/Navbar'
import { subirFoto } from '@/components/upload-foto'
import { UploadCloud } from 'lucide-react'

export default function Home() {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    for (const file of files) {
      await subirFoto(file)
    }

    // Limpiar el input
    e.target.value = ''
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <Navbar/>
      <div className="w-full max-w-md mb-12">
        {/* Tarjeta principal */}
        <div className="bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden ">
          
          {/* Área de subida con diseño bonito */}
          <label 
            htmlFor="file-upload"
            className="cursor-pointer p-12 hover:bg-pink-50/50 transition-colors  group h-[60dvh] flex items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center text-center">
              
              {/* Círculo con icono de nube */}
              <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <UploadCloud 
                  size={48} 
                  className="text-pink-500" 
                  strokeWidth={1.8}
                />
              </div>

              {/* Texto principal */}
              <p className="text-2xl font-medium text-pink-600 mb-2">
                Selecciona una foto
              </p>
              
              <p className="text-sm text-pink-400 tracking-wide">
                Preferiblemente JPG/JPEG/PNG
              </p>
            </div>
          </label>

          {/* Input oculto */}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
        </div>

        {/* Texto adicional opcional */}
        <p className="text-center text-xs text-pink-400 mt-6">
          Puedes subir hasta 10 fotos cada 30 minutos
        </p>
      </div>
      <Downbar showUsers={true} showWindow={false}/>
    </div>
  )
}