'use client'

export async function subirFoto(file: File) {
  if (!file) return { success: false, error: 'No hay archivo' }

  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(
      'https://lfuetkgvytrkjbbrbhsw.supabase.co/functions/v1/upload-foto', 
      {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}` } // solo si es necesario
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Error del servidor:', data)
      return { success: false, error: data.error || 'Error desconocido' }
    }

    console.log('✅ Foto subida correctamente:', data.url)
    return { success: true, url: data.url, path: data.path }

  } catch (err: any) {
    console.error('Error al subir foto:', err)
    return { success: false, error: err.message || 'Error de conexión' }
  }
}