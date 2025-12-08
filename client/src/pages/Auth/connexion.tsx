import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import * as yup from "yup";
import type { JwtPayload } from "../../../../server/src/utils/jwt";
import authService from "../../services/authService";

import "../../assets/styles/page-layout.css";

/**
 * Login page component
 * Allows users to authenticate with email and password
 * Uses react-hook-form for form management and Yup for validation
 */

// Yup schema for login form validation
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

// Infer TypeScript type from validation schema
type FormData = yup.InferType<typeof validationSchema>;

// Login page component
function Connexion() {
  // Get auth context methods to update global state
  const { setIsAuthenticated, setRole } = useAuth();

  // Local state for error messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize react-hook-form with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  // Handle login form submission
  const onSubmit = async (data: FormData) => {
    setErrorMessage(null);

    try {
      // Call login API
      const result = await authService.login({
        email: data.email,
        password: data.password,
      });

      // Decode JWT to extract user role
      const decoded = jwtDecode<JwtPayload>(result.token);

      // Update global authentication state
      setIsAuthenticated(true);
      setRole(decoded.role);

      // Redirect to home page
      window.location.href = "/";
    } catch (error: any) {
      setErrorMessage(error.message || "Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <h1 className="page-title">Connexion</h1>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form className="page-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              className="form-input"
              type="text"
              id="email"
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
