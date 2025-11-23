import { useEffect, useRef, useState } from "react";
import "../assets/styles/page-layout.css";
import "./Chasse.css";

export default function Chasse() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Erreur d'accès à la caméra :", error);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        for (const track of stream.getTracks()) {
          track.stop();
        }
      }
    };
  }, []);

  const savePhotoLocally = (photoData: string) => {
    const existingPhotos = JSON.parse(
      localStorage.getItem("userPhotos") || "[]"
    );
    existingPhotos.push({
      photo: photoData,
      date: new Date().toISOString(),
      user: "user_3", // Remplacer par l'utilisateur connecté plus tard
    });
    localStorage.setItem("userPhotos", JSON.stringify(existingPhotos));
  };

  const sendPhotoToBackend = async (blob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("photo", blob, "capture.png");
      formData.append("userId", "3"); // Remplacer par vrai userId connecté
      formData.append("artworkId", "1"); // Remplacer par vrai artworkId capturé

      const response = await fetch("http://localhost:3310/api/discovered", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.statusText}`);
      }

      const data = await response.json();
      setUploadStatus("Photo envoyée avec succès !");
      console.log("Réponse serveur :", data);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la photo :", error);
      setUploadStatus("Erreur lors de l'envoi de la photo.");
    }
  };

  const capturePhoto = (): void => {
    if (!videoRef.current || !canvasRef.current) return;

    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    if (width === 0 || height === 0) return;

    canvasRef.current.width = width;
    canvasRef.current.height = height;

    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, width, height);
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          setPhoto(URL.createObjectURL(blob));
          savePhotoLocally(URL.createObjectURL(blob));
          sendPhotoToBackend(blob);
        }
      }, "image/png");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <h1 className="page-title">Capture une œuvre !</h1>
        <div className="video-container">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            tabIndex={-1}
            className="video-preview"
          >
            <track kind="captions" />
          </video>
        </div>

        <button
          type="button"
          onClick={capturePhoto}
          className="capture-button"
          aria-label="Prendre une photo"
        >
          📸
        </button>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {photo && (
          <div className="photo-preview">
            <img src={photo} alt="oeuvre capturée" className="captured-image" />
          </div>
        )}

        {uploadStatus && <p className="page-text">{uploadStatus}</p>}
      </div>
    </div>
  );
}
