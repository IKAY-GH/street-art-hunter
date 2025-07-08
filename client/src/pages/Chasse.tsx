import { useEffect, useRef, useState } from "react";

export default function Chasse() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let activeStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
        activeStream = mediaStream;
      } catch (error) {
        console.error("Erreur d'accès à la caméra:", error);
      }
    };

    startCamera();

    return () => {
      const tracks = (activeStream || stream)?.getTracks();
      if (tracks) {
        for (const track of tracks) {
          track.stop();
        }
      }
    };
  }, [stream]);

  const capturePhoto = (): void => {
    if (!canvasRef.current || !videoRef.current) return;

    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    if (width === 0 || height === 0) return;

    canvasRef.current.width = width;
    canvasRef.current.height = height;

    const context = canvasRef.current.getContext("2d");
    if (context) {
      context.drawImage(videoRef.current, 0, 0, width, height);
      const imageData = canvasRef.current.toDataURL("image/png");
      setPhoto(imageData);
    }
  };

  return (
    <div className="camera-container">
      <video ref={videoRef} autoPlay playsInline className="video">
        <track kind="captions" />
      </video>

      <button type="button" className="capture-button" onClick={capturePhoto}>
        Prendre une photo
      </button>

      <canvas ref={canvasRef} className="canvas" style={{ display: "none" }} />

      {photo && (
        <div className="photo-preview">
          <img src={photo} alt="œuvre capturée" className="captured-image" />
        </div>
      )}
    </div>
  );
}
