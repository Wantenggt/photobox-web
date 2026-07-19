export async function generatePhotoStrip(
    photos: string[]
  ): Promise<string> {
    const WIDTH = 1200;
    const MARGIN = 60;
    const HEADER = 180;
    const FOOTER = 120;
  
    const PHOTO_WIDTH = WIDTH - MARGIN * 2;
    const PHOTO_HEIGHT = 720; // rasio 3:2
  
    const HEIGHT =
      HEADER +
      FOOTER +
      photos.length * PHOTO_HEIGHT +
      (photos.length + 1) * MARGIN;
  
    const canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
  
    const ctx = canvas.getContext("2d");
  
    if (!ctx) {
      throw new Error("Canvas tidak tersedia");
    }
  
    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  
    // Judul
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
  
    ctx.font = "bold 60px Arial";
    ctx.fillText("📸 PhotoBox", WIDTH / 2, 80);
  
    ctx.fillStyle = "#666";
    ctx.font = "32px Arial";
    ctx.fillText("Capture Your Moment", WIDTH / 2, 130);
  
    let y = HEADER;
  
    for (const photo of photos) {
      const img = await loadImage(photo);
  
      drawImageCover(
        ctx,
        img,
        MARGIN,
        y,
        PHOTO_WIDTH,
        PHOTO_HEIGHT
      );
  
      y += PHOTO_HEIGHT + MARGIN;
    }
  
    const today = new Date().toLocaleDateString("id-ID");
  
    ctx.fillStyle = "#666";
    ctx.font = "28px Arial";
    ctx.fillText(today, WIDTH / 2, HEIGHT - 40);
  
    return canvas.toDataURL("image/png");
  }
  
  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
  
      img.onload = () => resolve(img);
      img.onerror = reject;
  
      img.src = src;
    });
  }
  
  // Crop otomatis tanpa membuat foto gepeng
  function drawImageCover(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    const imgRatio = img.width / img.height;
    const frameRatio = width / height;
  
    let sx = 0;
    let sy = 0;
    let sw = img.width;
    let sh = img.height;
  
    if (imgRatio > frameRatio) {
      // Foto lebih lebar → crop kiri kanan
      sw = img.height * frameRatio;
      sx = (img.width - sw) / 2;
    } else {
      // Foto lebih tinggi → crop atas bawah
      sh = img.width / frameRatio;
      sy = (img.height - sh) / 2;
    }
  
    ctx.drawImage(
      img,
      sx,
      sy,
      sw,
      sh,
      x,
      y,
      width,
      height
    );
  }