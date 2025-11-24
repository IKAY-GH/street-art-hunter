import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import authService, { type RegisterData } from "../../services/authService";

import "../../assets/styles/page-layout.css";

const validationSchema = yup.object({
  pseudo: yup.string().required("Il faut préciser votre pseudo").min(2),
  first_name: yup.string().required("Il faut préciser votre nom").min(2),
  last_name: yup
    .string()
    .required("Il faut préciser votre prénom")
    .min(2, "Un minimum de 2 caractères est demandé !"),
  email: yup
    .string()
    .required("Il faut préciser votre email")
    .email("l'email n'est pas valide"),
  zip_code: yup
    .number()
    .required("Il faut préciser votre code postal")
    .positive("Le code postal doit être un nombre positif")
    .integer("Le code postal doit être un nombre entier"),
  password: yup
    .string()
    .required("Il faut préciser votre password")
    .min(6, "Mot de passe trop court"),
  confirm_password: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "La confirmation du mot de passe est incorrecte"
    )
    .required("Confirmez votre mot de passe"),
});

type FormData = yup.InferType<typeof validationSchema>;

function Inscription() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
    setSuccessMessage(null);

    try {
      // Préparer les données pour l'inscription
      const registerData: RegisterData = {
        pseudo: data.pseudo,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        zip_code: data.zip_code,
      };

      // Appel à l'API via authService
      const response = await authService.register(registerData);

      // Succès ! Afficher message de confirmation
      setSuccessMessage(
        ` Compte créé avec succès ! Bienvenue ${response.user.pseudo} ! Vous allez être redirigé...`
      );

      // Réinitialiser le formulaire
      reset();

      // Rediriger vers la page d'accueil après 2 secondes
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: any) {
      // Gestion d'erreurs
      console.error("Erreur lors de l'inscription:", error);

      if (error.response) {
        // Erreur retournée par le serveur
        setErrorMessage(
          error.response.data.message ||
            `Erreur ${error.response.status}: ${error.response.statusText}`
        );
      } else if (error.request) {
        // Pas de réponse du serveur
        setErrorMessage(
          "Impossible de contacter le serveur. Vérifiez votre connexion."
        );
      } else {
        // Autre erreur
        setErrorMessage(
          error.message || "Une erreur inattendue s'est produite."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="page-wrapper">
      <div className="page-content inscription-content">
        <h1 className="page-title">Inscription</h1>

        {successMessage && (
          <div
            style={{
              backgroundColor: "rgba(0, 255, 0, 0.1)",
              border: "1px solid var(--color-primary)",
              color: "var(--color-primary)",
              padding: "1rem",
              borderRadius: "var(--border-radius)",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            {successMessage}
          </div>
        )}

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
            ⚠️ {errorMessage}
          </div>
        )}

        <form className="page-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label" htmlFor="pseudo">
              Pseudo
            </label>
            <input
              {...register("pseudo")}
              className="form-input"
              type="text"
              id="pseudo"
              autoComplete="userName"
              required
              aria-describedby="pseudo_help"
              disabled={isLoading}
            />
            {errors.pseudo && (
              <p className="form-error">{errors.pseudo.message}</p>
            )}
            <p id="pseudo_help" className="form-help">
              Votre pseudo doit faire 4 caractères min.
            </p>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="nom">
              Nom
            </label>
            <input
              {...register("first_name")}
              className="form-input"
              type="text"
              id="nom"
              autoComplete="family-name"
              disabled={isLoading}
              required
            />
            {errors.first_name && (
              <p className="form-error">{errors.first_name.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="prenom">
              Prénom
            </label>
            <input
              {...register("last_name")}
              className="form-input"
              type="text"
              id="prenom"
              autoComplete="given-name"
              disabled={isLoading}
              required
            />
            {errors.last_name && (
              <p className="form-error">{errors.last_name.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              className="form-input"
              type="email"
              id="email"
              autoComplete="email"
              disabled={isLoading}
              required
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="zip_code">
              Code Postal
            </label>
            <input
              {...register("zip_code", { valueAsNumber: true })}
              className="form-input"
              type="number"
              id="zip_code"
              autoComplete="postal-code"
              disabled={isLoading}
              required
            />
            {errors.zip_code && (
              <p className="form-error">{errors.zip_code.message}</p>
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
              autoComplete="new-password"
              disabled={isLoading}
              required
            />
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirm_password">
              Confirmez le mot de passe
            </label>
            <input
              {...register("confirm_password")}
              className="form-input"
              type="password"
              id="confirm_password"
              autoComplete="new-password"
              disabled={isLoading}
              required
            />
            {errors.confirm_password && (
              <p className="form-error">{errors.confirm_password.message}</p>
            )}
          </div>

          <button className="form-button" type="submit" disabled={isLoading}>
            {isLoading ? "Inscription en cours..." : "Inscription"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Inscription;
