// app/api/fotos/latest/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()   // ← importante el await

  const { data: files, error } = await supabase.storage
    .from('quince-fotos')                  // ← bucket correcto
    .list('public', {
      limit: 10,
      sortBy: { column: 'created_at', order: 'desc' }
    })

  if (error) {
    console.error('Error al listar fotos:', error)
    return NextResponse.json([], { status: 500 })
  }

  if (!files || files.length === 0) {
    return NextResponse.json([])
  }

  const fotoPromises = files.map(async (file: any) => {
    const { data: { publicUrl } } = supabase.storage
      .from('quince-fotos')
      .getPublicUrl(`public/${file.name}`)

    return {
      id: file.id || file.name,
      url: publicUrl,
      path: `public/${file.name}`,
      created_at: file.created_at
    }
  })

  const fotos = await Promise.all(fotoPromises)

  return NextResponse.json(fotos)
}