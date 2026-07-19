"use client";

import Webcam from "react-webcam";
import { forwardRef } from "react";

const CameraPreview = forwardRef<Webcam>((props, ref) => {
  return (
    <div className="rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
      <Webcam
        ref={ref}
        audio={false}
        mirrored
        screenshotFormat="image/png"
        width={700}
      />
    </div>
  );
});

CameraPreview.displayName = "CameraPreview";

export default CameraPreview;