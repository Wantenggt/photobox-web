"use client";

import { forwardRef } from "react";
import Webcam from "react-webcam";

interface CameraPreviewProps {
  // Tambahkan props lain jika komponenmu memilikinya
}

const CameraPreview = forwardRef<Webcam, CameraPreviewProps>((props, ref) => {
  // 👉 Konfigurasi resolusi video ke rasio landscape 4:3 (misal 1280x960)
  const videoConstraints = {
    width: 1280,
    height: 960,
    facingMode: "user",
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 aspect-[4/3]">
      <Webcam
        audio={false}
        ref={ref}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        className="w-full h-full object-cover"
        mirrored={true} // Memastikan pratinjau kamera seperti cermin
      />
    </div>
  );
});

CameraPreview.displayName = "CameraPreview";

export default CameraPreview;