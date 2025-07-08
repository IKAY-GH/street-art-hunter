import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object({
  pseudo: yup
    .string()
    .required("Il faut préciser votre pseudo")
    .min(2, "Un vrai pseudo"),
  first_name: yup
    .string()
    .required("Il faut préciser votre nom")
    .min(4, "Un minimum de 4 caractères est demandé"),
  last_name: yup
    .string()
    .required("Il faut préciser votre prénom")
    .min(4, "Un minimum de 4 caractères est demandé !"),
  email: yup
    .string()
    .required("Il faut préciser votre email")
    .email("l'email n'est pas valide"),
  password: yup
    .string()
    .required("Il faut préciser votre password")
    .min(6, "Mot de passe trop court"),
  confirm_password: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "La confirmation du mot de passe est incorrecte",
    )
    .required("Confirmez votre mot de passe"),
});

type FormData = yup.InferType<typeof validationSchema>;

function Formulaire() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data: FormData) => {
    alert(`Bienvenue ${data.pseudo} ! votre email : ${data.email}`);
    reset();
  };

  return (
    <div className="profil">
      <h2>Inscription</h2>

      <div className="ligne-separation" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="pseudo">Pseudo</label>
        <input
          {...register("pseudo")}
          type="text"
          id="pseudo"
          autoComplete="userName"
          required
        />
        {errors.pseudo && <p className="form-error">{errors.pseudo.message}</p>}

        <label htmlFor="nom">Nom</label>
        <input
          {...register("first_name")}
          type="text"
          id="nom"
          autoComplete="family-name"
          required
        />
        {errors.first_name && (
          <p className="form-error">{errors.first_name.message}</p>
        )}

        <label htmlFor="prenom">Prenom</label>
        <input
          {...register("last_name")}
          type="text"
          id="prenom"
          autoComplete="given-name"
          required
        />
        {errors.last_name && (
          <p className="form-error">{errors.last_name.message}</p>
        )}

        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="email"
          id="email"
          autoComplete="email"
          required
        />
        {errors.email && <p className="form-error">{errors.email.message}</p>}

        <label htmlFor="password">Mot de passe</label>
        <input
          {...register("password")}
          type="password"
          id="password"
          autoComplete="new-password"
          required
        />
        {errors.password && (
          <p className="form-error">{errors.password.message}</p>
        )}

        <label htmlFor="confirm_password">Confirmez le mot de passe</label>
        <input
          {...register("confirm_password")}
          type="password"
          id="confirm_password"
          autoComplete="new-password"
          required
        />
        {errors.confirm_password && (
          <p className="form-error">{errors.confirm_password.message}</p>
        )}

        <div>
          <button id="btn-valide" type="submit">
            Inscription
          </button>
        </div>
      </form>
    </div>
  );
}

export default Formulaire;
