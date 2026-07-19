"use client";

import { useRef, useState } from "react";
import Webcam from "react-webcam";

import CameraPreview from "@/components/CameraPreview";
import Countdown from "@/components/Countdown";
import PhotoGrid from "@/components/PhotoGrid";
import PhotoStrip from "@/components/PhotoStrip";
import { generatePhotoStrip } from "@/lib/generatePhotoStrip";
import Link from "next/link";

export default function CameraPage() {
  const webcamRef = useRef<Webcam>(null);

  const [photos, setPhotos] = useState<string[]>([]);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(3);
  const [currentPhoto, setCurrentPhoto] = useState(1);
  const [finished, setFinished] = useState(false);

  // Ambil foto dari webcam
  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();

    if (imageSrc) {
      setPhotos((prev) => [...prev, imageSrc]);
    }
  };

  // Countdown
  const countdown = () => {
    return new Promise<void>((resolve) => {
      let current = 3;
      setCount(current);

      const timer = setInterval(() => {
        current--;

        if (current > 0) {
          setCount(current);
        } else {
          clearInterval(timer);

          capture();

          resolve();
        }
      }, 1000);
    });
  };

  // Mulai sesi foto
  const startCapture = async () => {
    setPhotos([]);
    setFinished(false);
    setStarted(true);

    for (let i = 1; i <= 4; i++) {
      setCurrentPhoto(i);

      await countdown();

      // jeda antar foto
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    setStarted(false);
    setFinished(true);
  };

  // Ulangi sesi
  const retake = () => {
    setPhotos([]);
    setFinished(false);
    setStarted(false);
    setCurrentPhoto(1);
    setCount(3);
  };

  // Download PhotoStrip HD
  const downloadStrip = async () => {
    try {
      const image = await generatePhotoStrip(photos);

      const link = document.createElement("a");

      link.href = image;
      link.download = `photobox-${Date.now()}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      alert("Gagal membuat PhotoStrip.");
    }
  };

  <Link
  href="/"
  className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg"
>
  🏠 Home
</Link>

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-2">
        PhotoBox
      </h1>

      <p className="text-gray-400 mb-8">
        Ambil 4 foto dan unduh hasilnya
      </p>

      <CameraPreview ref={webcamRef} />

      <div className="mt-8">
        {started ? (
          <Countdown
            currentPhoto={currentPhoto}
            count={count}
          />
        ) : (
          <button
            onClick={startCapture}
            disabled={started}
            className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-500 transition px-10 py-4 rounded-full text-xl"
          >
            Start Capture
          </button>
        )}
      </div>

      {finished && <PhotoGrid photos={photos} />}

      {finished && <PhotoStrip photos={photos} />}

      {finished && (
        <div className="flex gap-4 mt-8">
          <button
            onClick={retake}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg"
          >
            🔄 Retake
          </button>

          <button
            onClick={downloadStrip}
            className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-lg"
          >
            ⬇ Download HD
          </button>
        </div>
      )}
    </main>
  );
}