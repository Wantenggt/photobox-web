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
      className="bg-white rounded-xl shadow-xl p-5 w-[340px] mt-10"
    >
      <h2 className="text-center text-3xl font-bold text-black">
        📸 PhotoBox
      </h2>

      <p className="text-center text-gray-500 mb-5">
        Capture Your Moment
      </p>

      <div className="space-y-4">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt=""
            className="rounded-lg w-full border"
          />
        ))}
      </div>

      <p className="text-center text-gray-600 mt-5">
        {today}
      </p>
    </div>
  );
}