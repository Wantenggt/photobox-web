export async function generatePhotoStrip(
    photos: string[]
  ): Promise<string> {
    const WIDTH = 1200;
    const MARGIN = 60;
    const HEADER = 180;
    const FOOTER = 120;
  
    const PHOTO_WIDTH = WIDTH - MARGIN * 2; // 1080
    // Menurunkan tinggi foto agar rasionya tepat 4:3 Landscape (1080 * 3 / 4 = 810)
    const PHOTO_HEIGHT = 810; 
  
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
  
    // Mengoptimalkan penggambaran gambar dan memastikan orientasi EXIF dihormati (terutama di iOS)
    ctx.imageSmoothingEnabled = true;
    if ('imageOrientation' in ctx) {
      (ctx as any).imageOrientation = 'from-image';
    }
  
    // Latar Belakang (Background) Strip Foto
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  
    // Bagian Header: Judul Utama
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.font = "bold 60px Arial";
    ctx.fillText("📸 PhotoBox", WIDTH / 2, 80);
  
    // Bagian Header: Subjudul / Slogan
    ctx.fillStyle = "#666";
    ctx.font = "32px Arial";
    ctx.fillText("Capture Your Moment", WIDTH / 2, 130);
  
    let y = HEADER + MARGIN;
  
    // Melakukan iterasi dan menggambar setiap foto ke dalam Canvas
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
  
    // Bagian Footer: Tanggal Hari Ini
    const today = new Date().toLocaleDateString("id-ID");
  
    ctx.fillStyle = "#666";
    ctx.font = "28px Arial";
    ctx.fillText(today, WIDTH / 2, HEIGHT - 40);
  
    // Mengembalikan hasil akhir dalam bentuk Data URL Base64 format PNG
    return canvas.toDataURL("image/png");
  }
  
  // Fungsi pembantu untuk memuat source string gambar ke elemen HTMLImageElement secara asinkron
  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }
  
  // Fungsi simulasi CSS 'object-fit: cover' pada Canvas untuk memotong gambar landscape secara presisi ke tengah
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
      // Foto dari webcam lebih lebar dari bingkai landscape -> potong bagian kiri & kanan
      sw = img.height * frameRatio;
      sx = (img.width - sw) / 2;
    } else {
      // Foto dari webcam lebih tinggi (misal orientasi portrait terbalik) -> potong bagian atas & bawah
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