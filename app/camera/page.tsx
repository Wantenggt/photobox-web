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
  const [isFlashing, setIsFlashing] = useState(false);

  // Ambil foto
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

          setIsFlashing(true);

          capture();

          setTimeout(() => {
            setIsFlashing(false);
          }, 400);

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

      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    setStarted(false);
    setFinished(true);
  };

  // Retake
  const retake = () => {
    setPhotos([]);
    setFinished(false);
    setStarted(false);
    setCurrentPhoto(1);
    setCount(3);
  };

  // Download PhotoStrip
  const downloadStrip = async () => {
    try {
      const dataUrl = await generatePhotoStrip(photos);

      const response = await fetch(dataUrl);
      const blob = await response.blob();

      const file = new File(
        [blob],
        `photobox-${Date.now()}.png`,
        {
          type: "image/png",
        }
      );

      // Cek apakah perangkat mobile
      const isMobile =
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

      // Mobile → Share
      if (
        isMobile &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          title: "PhotoBox",
          text: "Hasil PhotoBox",
          files: [file],
        });

        return;
      }

      // Desktop → Download langsung
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Gagal mengunduh gambar.");
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center py-10 relative">

      {isFlashing && (
        <div className="fixed inset-0 bg-white z-50 pointer-events-none animate-flash" />
      )}

      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm block"
        >
          🏠 Home
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-2 mt-4">
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