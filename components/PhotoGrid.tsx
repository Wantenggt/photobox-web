"use client";

interface PhotoGridProps {
  photos: string[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 px-4">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-200">
        Hasil Foto 📸
      </h2>
      
      {/* Menggunakan grid 2 kolom agar seimbang untuk susunan gambar landscape */}
      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 aspect-[4/3]"
          >
            <img
              src={photo}
              alt={`Captured moment ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-xs text-gray-300">
              #{index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}