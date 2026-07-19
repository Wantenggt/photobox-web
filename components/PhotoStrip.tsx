"use client";

type PhotoStripProps = {
  photos: string[];
};

export default function PhotoStrip({ photos }: PhotoStripProps) {
  if (photos.length === 0) return null;

  const today = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      id="photo-strip"
      className="bg-white rounded-2xl shadow-xl p-5 w-[340px] mt-10"
    >
      <h2 className="text-center text-3xl font-bold text-black">
        📸 PhotoBox
      </h2>

      <p className="text-center text-gray-500 mb-5">
        Capture Your Moment
      </p>

      <div className="space-y-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="w-full h-[230px] overflow-hidden rounded-lg border"
          >
            <img
              src={photo}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <p className="text-center text-gray-600 mt-5">
        {today}
      </p>
    </div>
  );
}