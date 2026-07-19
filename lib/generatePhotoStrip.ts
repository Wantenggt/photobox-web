export async function generatePhotoStrip(
    photos: string[]
  ): Promise<string> {
    const WIDTH = 1200;
    const PHOTO_WIDTH = 1040;
    const PHOTO_HEIGHT = 780;
    const MARGIN = 80;
    const HEADER = 180;
    const FOOTER = 120;
  
    const HEIGHT =
      HEADER +
      FOOTER +
      PHOTO_HEIGHT * photos.length +
      MARGIN * (photos.length + 1);
  
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
    ctx.fillStyle = "#000000";
    ctx.font = "bold 60px Arial";
    ctx.textAlign = "center";
    ctx.fillText("📸 PhotoBox", WIDTH / 2, 90);
  
    ctx.font = "32px Arial";
    ctx.fillStyle = "#666";
    ctx.fillText("Capture Your Moment", WIDTH / 2, 140);
  
    let y = HEADER;
  
    for (const photo of photos) {
      const img = await loadImage(photo);
  
      ctx.drawImage(
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
    ctx.font = "30px Arial";
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