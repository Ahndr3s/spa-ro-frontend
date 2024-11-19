import { useEffect } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export const SimpleForm = (props) => {
  let formOption;
  // const { startLogin, startSignIn, errorMessage } = useAuthStore();
  // const { startSavingCourse } = useCourseStore();
  // const { startSavingVideo } = useVideoStore();
  // const { user } = useSelector((state) => state.auth);

  // Inicializar el estado del formulario con base en el tipo de formulario (course o video)
  //   const initialFields =
  //   props.type === 4
  //     ? modalCourseFields(props.info)
  //     : modalVideoFields(props.info);

  //   const { formState, onInputChange, setFormState } = useForm(initialFields);

  switch(props.type) {
    // LOGIN FORM
    case 1:
      formOption = (
        <form className="simple-form" onSubmit={handleLoginSubmit}>
          <h1 className="page-title">Iniciar Sesión</h1>
          <input
            type="email"
            name="loginEmail"
            placeholder="correo"
            value={loginEmail}
            // onChange={onLoginInputChange}
          />
          <input
            type="password"
            name="loginPassword"
            placeholder="password"
            value={loginPassword}
            // onChange={onLoginInputChange}
          />

          <input className="serv-btn" type="submit" value="Enviar" />
        </form>
      );
      break;

          // CONTACT FORM
    case 3:
        formOption = (
          <form className="simple-form">
            <input
              type="text"
              name="userName"
              className="userName"
              placeholder="Nombre"
              autoComplete="off"
            />
            <input
              type="text"
              name="email"
              className="email"
              placeholder="Correo"
              autoComplete="off"
            />
            <input
              type="text"
              name="phone"
              className="phone"
              placeholder="Telefono"
              autoComplete="off"
            />
            <label className="text-desc">
              Por favor, déjanos tu pregunta o comentario.
            </label>
            <textarea
              name="description"
              rows={4}
              cols={40}
              placeholder="Comentario/Duda"
              // value={description}
              // onChange={(e) => {setdescription(e.target.value)}}
            ></textarea>
            <button className="serv-btn" type="button">
              Enviar
            </button>
          </form>
        );
        break;
  }
  return <>{formOption}</>;
};

SimpleForm.propTypes = {
    type: PropTypes.any,
    setloggedIn: PropTypes.any,
    close: PropTypes.any,
    info: PropTypes.any,
  };