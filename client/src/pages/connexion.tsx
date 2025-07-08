import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

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

function connexion() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data: FormData) => {
    alert(`Bienvenue ${data.email}`);
    reset();
  };

  return (
    <div className="connexion">
      <div className="ligne-separation" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input {...register("email")} type="email" id="email" required />
        {errors.email && <p className="form-error">{errors.email.message}</p>}

        <label htmlFor="password">Mot de passe</label>
        <input
          {...register("password")}
          type="password"
          id="password"
          required
        />
        {errors.password && (
          <p className="form-error">{errors.password.message}</p>
        )}
        <div>
          <button id="btn-connexion" type="submit">
            Connexion
          </button>
        </div>
      </form>
    </div>
  );
}

export default connexion;
