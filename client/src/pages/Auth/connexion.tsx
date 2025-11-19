import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import authService from "../../services/authService";

import "../../assets/styles/page-layout.css";

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Il faut préciser votre email")
    .email("l'email n'est pas valide"),
  password: yup
    .string()
    .required("Il faut préciser votre password")
    .min(6, "Mot de passe trop court"),
});

type FormData = yup.InferType<typeof validationSchema>;

function Connexion() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est déjà connecté au chargement de la page
  useEffect(() => {
    if (authService.isAuthenticated()) {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setIsLoggedIn(true);
        setUserEmail(currentUser.email);
      }
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Appel API pour vérifier email/password dans la BDD
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });

      // Connexion réussie !
      setIsLoggedIn(true);
      setUserEmail(response.user.email);
      reset();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Email ou mot de passe incorrect"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUserEmail("");
  };

  return (
    <div className="page-wrapper">
      <div className="page-content connexion-content">
        {isLoggedIn ? (
          <div className="welcom-message">
            <h1 className="page-title">Déjà connecté</h1>
            <p className="page-text">
              Vous êtes déjà connecté en tant que <strong>{userEmail}</strong>
            </p>
            <p className="page-text" style={{ marginTop: "1rem" }}>
              Vous pouvez continuer votre navigation ou vous déconnecter.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "1.5rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                className="form-button"
                type="button"
                onClick={() => navigate("/")}
              >
                Retour à l'accueil
              </button>
              <button
                className="form-button"
                type="button"
                onClick={handleLogout}
                style={{ backgroundColor: "#ff8000" }}
              >
                Se déconnecter
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="page-title">Connexion</h1>

            {errorMessage && (
              <div
                style={{
                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                  border: "1px solid var(--color-error)",
                  color: "var(--color-error)",
                  padding: "1rem",
                  borderRadius: "var(--border-radius)",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                {errorMessage}
              </div>
            )}

            <form className="page-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  {...register("email")}
                  className="form-input"
                  type="email"
                  id="email"
                  disabled={isLoading}
                  required
                />
                {errors.email && (
                  <p className="form-error">{errors.email.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Mot de passe
                </label>
                <input
                  {...register("password")}
                  className="form-input"
                  type="password"
                  id="password"
                  disabled={isLoading}
                  required
                />
                {errors.password && (
                  <p className="form-error">{errors.password.message}</p>
                )}
              </div>

              <button
                className="form-button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours..." : "Connexion"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Connexion;
