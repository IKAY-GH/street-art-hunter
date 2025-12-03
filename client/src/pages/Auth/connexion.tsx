import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import * as yup from "yup";
import type { JwtPayload } from "../../../../server/src/utils/jwt";

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
  const { setIsAuthenticated, setRole } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );

      if (!response.ok) {
        alert("Email ou mot de passe incorrect");
        return;
      }

      const result = await response.json();
      const token = result.token;
      const user = result.user;

      sessionStorage.setItem("jwt", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      const decoded = jwtDecode<JwtPayload>(token);

      setIsAuthenticated(true);
      setRole(decoded.role);

      window.location.href = "/";
    } catch (error) {
      console.error("Erreur réseau", error);
      alert("Problème de connexion au serveur");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content connexion-content">
        <h1 className="page-title">Connexion</h1>

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
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="form-error">
                {errors.email.message}
              </p>
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
              required
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p id="password-error" className="form-error">
                {errors.password.message}
              </p>
            )}
          </div>

          <button className="button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Connexion..." : "Connexion"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Connexion;
