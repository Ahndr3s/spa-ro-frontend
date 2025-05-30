import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { useForm } from "../hooks/useForm";
import { useProductStore } from "../hooks/useProductStore";
import { useCategoryStore } from "../hooks/useCategoryStore";
import { useBannerStore } from "../hooks/useBannerStore";
import { useAuthStore } from "../hooks/useAuthStore";
import { useSalesStore } from "../hooks/useSalesStore";
import { toggleSidePanel } from "../store/SidePanelSlice";
import {
  onSetActiveProduct,
  toggleCreativeProdMode,
} from "../store/productSlice";
import {
  onSetActiveBanner,
  toggleCreateBannerMode,
} from "../store/bannerSlice";
import {
  onSetActiveCategory,
  toggleCreativeCatMode,
} from "../store/categorySlice";
import { getContentsByType } from "../helpers/getContents";

// LOGIN FORM FIELDS DEFINITION
const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

// SIGN IN FORM FIELDS DEFINITION
const signInFormFields = {
  signinName: "",
  signInEmail: "",
  signInPassword: "",
  signInPassword2: "",
};

// CONTACT FORM FIELDS DEFINITION
const contactFormFields = {
  contactType: "7",
  contactEmail: "",
  contactName: "",
  contactSurName: "",
  contactAddress: "",
  contactCity: "",
  contactProStaReg: "",
  contactZipCode: "",
  contactPhone: "",
};

// PRODUCT FORM FIELDS DEFINITION
const productFormFields = (info) => ({
  productType: info?.type || "1",
  productTitle: info?.title || "",
  productSize:
    productFormFields.productType === "1"
      ? info?.size || "1"
      : info?.size || "T",
  productCategory: info?.category || "",
  productPrice: info?.price || "0",
  productInfo: info?.info || "",
  productStock: info?.stock || "",
  productImage: info?.img || "",
});

// BANNER FORM FIELDS DEFINITION
const bannerFormFields = (info) => ({
  bannerType: info?.type || "5",
  bannerTitle: info?.title || "",
  bannerCategory: info?.category || "",
  bannerSubtitle1: info?.subtitle1 || "",
  bannerSubtitle2: info?.subtitle2 || "",
  bannerImage: info?.img || "",
});

// BANNER FORM FIELDS DEFINITION
const categoryFormFields = (info) => ({
  categoryType: info?.type || "3",
  categoryTitle: info?.title || "",
});

export const SimpleForm = (props) => {
  let formOption;
  let initialFields;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { startLogin, startSignIn, errorMessage } = useAuthStore();
  const { contact, startCapturingContact } = useSalesStore();
  const { startSavingProduct } = useProductStore();
  const { startSavingBanner } = useBannerStore();
  const { categories, startSavingCategory } = useCategoryStore();
  const loadedCategories = getContentsByType(categories, "3");
  // console.log(loadedCategories);
  const states = [
    {name:"Aguascalientes",       tariff: 'AGS.100'},
    {name:"Baja California",      tariff: 'BC.100'},
    {name:"Baja California Sur",  tariff: 'BCS.100'},
    {name:"Campeche",             tariff: 'CAM.100'},
    {name:"Coahuila",             tariff: 'COA.100'},
    {name:"Colima",               tariff: 'COL.100'},
    {name:"Chiapas",              tariff: 'CHP.100'},
    {name:"Chihuahua",            tariff: 'CHH.100'},
    {name:"Ciudad de México",     tariff: 'CDMX.100'},
    {name:"Durango",              tariff: 'DUR.100'},
    {name:"Guanajuato",           tariff: 'GUA.100'},
    {name:"Guerrero",             tariff: 'GRO.100'},
    {name:"Hidalgo",              tariff: 'HID.100'},
    {name:"Jalisco",              tariff: 'JAL.100'},
    {name:"México",               tariff: 'MEX.100'},
    {name:"Michoacán",            tariff: 'MIC.100'},
    {name:"Morelos",              tariff: 'MOR.100'},
    {name:"Nayarit",              tariff: 'NAY.100'},
    {name:"Nuevo León",           tariff: 'NL.100'},
    {name:"Oaxaca",               tariff: 'OAX.100'},
    {name:"Puebla",               tariff: 'PUE.100'},
    {name:"Querétaro",            tariff: 'QUE.100'},
    {name:"Quintana Roo",         tariff: 'ROO.100'},
    {name:"San Luis Potosí",      tariff: 'SLP.100'},
    {name:"Sinaloa",              tariff: 'SIN.100'},
    {name:"Sonora",               tariff: 'SON.100'},
    {name:"Tabasco",              tariff: 'TAB.100'},
    {name:"Tamaulipas",           tariff: 'TAM.100'},
    {name:"Tlaxcala",             tariff: 'TLX.100'},
    {name:"Veracruz",             tariff: 'VER.100'},
    {name:"Yucatán",              tariff: 'YUC.100'},
    {name:"Zacatecas",            tariff: 'ZAC.100'},
  ];

  const { user } = useSelector((state) => state.auth);

  // Inicializar el estado del formulario con base en el tipo de formulario ()
  if (props.formType === 3) {
    initialFields = productFormFields(props.info || {});
    // console.log(initialFields)
  } else if (props.formType === 5) {
    initialFields = bannerFormFields(props.info || {});
    // console.log(initialFields)
  } else if (props.formType === 6) {
    initialFields = categoryFormFields(props.info || {});
    // console.log(initialFields)
  }

  const { formState, onInputChange, onSelectChange, setFormState } =
    useForm(initialFields);

  // UPLOADS AM IMAGE FOR THE SELECTED PRODUCT
  const handleImageChange = async (
    e,
    type,
    currentImage = "",
    ContentOwner
  ) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "fz466asa");

    try {
      // Si hay una imagen actual, elimínala llamando al backend
      if (currentImage) {
        // Obtener el public_id de la URL de la imagen
        const publicId = currentImage.split("/").pop().split(".")[0];

        // const collection = props.info.type === 1 ? "products" : "accesories";
        const collection =
          props.info.type === 1
            ? "products"
            : props.info.type === 2
            ? "accesories"
            : "banners";

        console.log(collection + " " + publicId);
        // const deleteResponse = await roApi.delete(
        //   `/api/uploads/${collection}/${publicId}`
        // );

        // Axios devuelve un código de estado para comprobar si la respuesta es exitosa
        // if (deleteResponse.status !== 200) {
        //   throw new Error("Error deleting the current image");
        // }
      }

      // Subir la nueva imagen
      if (ContentOwner === user.uuid) {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dfpbzr7n0/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        const file = await response.json();

        setFormState((prevState) => ({
          ...prevState,
          [type === "product" ? "productImage" : "bannerImage"]:
            file.secure_url,
        }));
      }
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  // GETS LOGIN FORM FIELDS VALUES
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  // GETS SIGN IN FORM FIELDS VALUES
  const {
    signInName,
    signInEmail,
    signInPassword,
    signInPassword2,
    onInputChange: onSignInInputChange,
  } = useForm(signInFormFields);

  // GETS CONTACT FORM FIELDS VALUES
  const {
    contactType,
    contactEmail,
    contactName,
    contactSurName,
    contactAddress,
    contactCity,
    contactProStaReg,
    contactZipCode,
    contactPhone,
    onInputChange: onContactInputChange,
  } = useForm(contactFormFields);

  // TRIGGERS LOGIN REQUEST AND NAVIGATES TO HOME PAGE
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const success = await startLogin({
      email: loginEmail,
      password: loginPassword,
    });
    if (success)
      navigate("/home", {
        replace: true,
      });
  };

  // TRIGGERS SIGN UP REQUEST AND NAVIGATES TO HOME PAGE
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (signInPassword !== signInPassword2) {
      Swal.fire("Error en registro", "Contraseñas no coinciden", "error");
      return;
    }
    startSignIn({
      name: signInName,
      email: signInEmail,
      password: signInPassword,
    });
    navigate("/home", {
      replace: true,
    });
  };

  // TRIGGERS LOGIN REQUEST AND NAVIGATES TO HOME PAGE
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    let contactFormData = {
      type: contactType,
      email: contactEmail,
      name: contactName,
      surName: contactSurName,
      address: contactAddress,
      city: contactCity,
      region: formState.contactProStaReg,
      zipCode: contactZipCode,
      phone: contactPhone,
      user: {
        name: user.name,
        uuid: user.uuid,
      },
    };

    if (Object.values(contactFormData).every((value) => value !== "")) {
      dispatch(startCapturingContact(contactFormData));
      console.log(contactFormData);
      return true;
    } else {
      Swal.fire(
        "Error en cpatura de datos",
        "Por favor llana el formulario de contacto",
        "error"
      );
      return;
    }
  };

  // TRIGGERS startSaving REQUEST EITHER TO CREATE/EDIT A PRODUCT
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    if (formState.productCategory === "") {
      Swal.fire("Error en registro", "Por favor elige una Categoria", "error");
      return;
    }

    let productFormData = {
      type: formState.productType,
      title: formState.productTitle,
      size: formState.productSize,
      category: formState.productCategory,
      price: formState.productPrice,
      info: formState.productInfo,
      stock: formState.productStock,
      user: {
        name: user.name,
        uuid: user.uuid,
      },
      img: formState.productImage,
    };

    if (props.info && props.info.id) {
      productFormData.id = props.info.id;
    }

    // console.log(productFormData)
    startSavingProduct(productFormData);
    setFormState(productFormFields);
    dispatch(toggleSidePanel());
    dispatch(onSetActiveProduct(null));
    dispatch(toggleCreativeProdMode());
  };

  // TRIGGERS startSaving REQUEST EITHER TO CREATE/EDIT A BANNER
  const handleBannerSubmit = async (e) => {
    e.preventDefault();

    let bannerFormData = {
      type: formState.bannerType,
      title: formState.bannerTitle,
      category: formState.bannerCategory,
      subtitle1: formState.bannerSubtitle1,
      subtitle2: formState.bannerSubtitle2,
      // user: {
      //   name: "ro",
      //   uuid: "123",
      // },
      img: formState.bannerImage,
    };

    if (props.info && props.info.id) {
      bannerFormData.id = props.info.id;
    }

    // console.log(bannerFormData)
    startSavingBanner(bannerFormData);
    setFormState(bannerFormData);
    dispatch(toggleSidePanel());
    dispatch(onSetActiveBanner(null));
    dispatch(toggleCreateBannerMode());
  };

  // TRIGGERS startSaving REQUEST EITHER TO CREATE/EDIT A CATEGORY
  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    let categoryFormData = {
      type: formState.categoryType,
      title: formState.categoryTitle,
      user: {
        name: "ro",
        uuid: "123",
      },
    };

    if (props.info && props.info.id) {
      categoryFormData.id = props.info.id;
    }

    // console.log(categoryFormData)
    startSavingCategory(categoryFormData);
    setFormState(categoryFormData);
    dispatch(toggleSidePanel());
    dispatch(onSetActiveCategory(null));
    dispatch(toggleCreativeCatMode());
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error al autenticar", errorMessage, "error");
    }
  }, [errorMessage]);

  // DEFINES WHICH BANNER FILLED WITH IT'S CORRESPONDING INFO GONNA SHOW
  // DEPPENDING ON THE FORM TYPE
  useEffect(() => {
    if (props.formType === 3) {
      const updatedProductFields = productFormFields(props.info || {});
      setFormState(updatedProductFields);
    } else if (props.formType === 5) {
      const updatedBannerFields = bannerFormFields(props.info || {});
      setFormState(updatedBannerFields);
    } else if (props.formType === 6) {
      const updatedCategoryFields = categoryFormFields(props.info || {});
      setFormState(updatedCategoryFields);
    }
  }, [props.info, props.formType, setFormState]);

  switch (props.formType) {
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
            onChange={onLoginInputChange}
          />
          <input
            type="password"
            name="loginPassword"
            placeholder="password"
            value={loginPassword}
            onChange={onLoginInputChange}
          />

          <input className="serv-btn" type="submit" value="Enviar" />
        </form>
      );
      break;

    // SIGN IN FORM
    case 2:
      formOption = (
        <form className="simple-form" onSubmit={handleSignInSubmit}>
          <h1 className="page-title">Registrarse</h1>
          <input
            type="text"
            name="signInName"
            placeholder="Nombre"
            value={signInName}
            onChange={onSignInInputChange}
          />
          <input
            type="email"
            name="signInEmail"
            placeholder="correo"
            value={signInEmail}
            onChange={onSignInInputChange}
          />
          <input
            type="password"
            name="signInPassword"
            placeholder="password"
            value={signInPassword}
            onChange={onSignInInputChange}
          />
          <input
            type="password"
            name="signInPassword2"
            placeholder="Please repeat the password"
            value={signInPassword2}
            onChange={onSignInInputChange}
          />

          <input className="serv-btn" type="submit" value="Enviar" />
        </form>
      );
      break;

    // CRUD PRODUCT FORM
    case 3:
      formOption = (
        <form className="simple-form" onSubmit={handleProductSubmit}>
          <select
            name="productType"
            id="sizes"
            className="form-sizes"
            onChange={onSelectChange}
            value={formState.productType}
          >
            <option key={`opt1`} value={"1"}>
              Disfraces
            </option>
            <option key={`opt2`} value={"2"}>
              Accesorios
            </option>
          </select>
          <input
            className="txtbox-t3"
            type="text"
            name="productTitle"
            placeholder="Nombre"
            value={formState.productTitle || ""}
            onChange={onInputChange}
          />
          <input
            className="txtbox-t3"
            type="text"
            name="productPrice"
            placeholder="Precio"
            value={formState.productPrice || ""}
            onChange={onInputChange}
          />
          <select
            name="productCategory"
            id="categories"
            className="form-sizes"
            onChange={onSelectChange}
            // value={formState.productCategory || loadedCategories[0]?.id}
            value={formState.productCategory || ""}
          >
            <option key={`opt0`} value={""}>
              seleccione la Categoria
            </option>
            {loadedCategories.map((category) => (
              <option key={`opt${category.title}`} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          <input
            className="txtbox-t3"
            type="text"
            name="productStock"
            placeholder="Existencias"
            value={formState.productStock || ""}
            onChange={onInputChange}
          />
          {formState.productType !== "2" && (
            <>
              <select
                name="productSize"
                id="sizes"
                className="form-sizes"
                onChange={onSelectChange}
                value={formState.productSize}
              >
                <option key={`opt1`} value={"1"}>
                  Tallas de menores
                </option>
                <option key={`opt2`} value={"2"}>
                  Todas las Tallas
                </option>
              </select>
            </>
          )}
          <textarea
            name="productInfo"
            rows={5}
            cols={24}
            placeholder="Descripcion"
            value={formState.productInfo || ""}
            onChange={onInputChange}
          ></textarea>
          <label htmlFor={formState.productImage}>Elige una imagen:</label>
          <input
            type="file"
            className="userName"
            id="productImage"
            name="productImage"
            accept="image/*"
            onChange={(e) =>
              // console.log(props.info)
              // handleImageChange(e, "course", formState.courseImage, props.info.user._id)
              handleImageChange(e, "product", formState.productImage, user.uuid)
            }
          />
          <img
            style={{ height: "250px", width: "250px" }}
            src={formState.productImage}
            alt=""
          />

          <input className="primary-btn-drk" type="submit" value="Guardar" />
        </form>
      );
      break;

    // CONTACT FORM
    case 4:
      formOption = (
        <form className="simple-form" onSubmit={handleContactSubmit}>
          <input
            type="text"
            name="contactEmail"
            className="email"
            placeholder="Correo"
            value={contactEmail}
            onChange={onContactInputChange}
          />
          <input
            type="text"
            name="contactName"
            className="userName"
            placeholder="Nombre"
            value={contactName}
            onChange={onContactInputChange}
          />
          <input
            type="text"
            name="contactSurName"
            className="userName"
            placeholder="Apellidos"
            value={contactSurName}
            onChange={onContactInputChange}
          />
          <input
            type="text"
            name="contactAddress"
            className="userName"
            placeholder="Calle, Número exterior y Número interior"
            value={contactAddress}
            onChange={onContactInputChange}
          />
          <input
            type="text"
            name="contactCity"
            className="userName"
            placeholder="Ciudad"
            value={contactCity}
            onChange={onContactInputChange}
          />
          <select
            name="contactProStaReg"
            id="proStaReg"
            className="form-sizes"
            onChange={onSelectChange}
            value={formState.contactProStaReg}
          >
            <option key={`opt0`} value={""}>
              selecciona tu Estado
            </option>
            {states.map((state) => (
              <option key={`opt${state.name}`} value={state.tariff}>
                {state.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="contactZipCode"
            className="userName"
            placeholder="Código Postal"
            value={contactZipCode}
            onChange={onContactInputChange}
          />
          <input
            type="text"
            name="contactPhone"
            className="phone"
            placeholder="Telefono"
            value={contactPhone}
            onChange={onContactInputChange}
          />
          {Object.keys(contact).length === 0 && (
            <input className="serv-btn" type="submit" value="Continuar" />
          )}
        </form>
      );
      break;

    // BANNER FORM
    case 5:
      formOption = (
        <form className="simple-form" onSubmit={handleBannerSubmit}>
          <input
            className="txtbox-t3"
            type="text"
            name="bannerTitle"
            placeholder="Titulo"
            value={formState.bannerTitle || ""}
            onChange={onInputChange}
          />
          <input
            className="txtbox-t3"
            type="text"
            name="bannerSubtitle1"
            placeholder="Subtitulo 1"
            value={formState.bannerSubtitle1 || ""}
            onChange={onInputChange}
          />
          <input
            className="txtbox-t3"
            type="text"
            name="bannerSubtitle2"
            placeholder="Subtitulo 2"
            value={formState.bannerSubtitle2 || ""}
            onChange={onInputChange}
          />
          <div className="select-container">
            <h4>Categoría de Producto</h4>
            <select
              name="bannerCategory"
              id="Bannercategories"
              className="form-sizes"
              onChange={onSelectChange}
              value={formState.bannerCategory || categories[0]?.id || ""}
            >
              {categories.map((category) => (
                <option key={`opt${category.title}`} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor={formState.bannerImage}>Elige una imagen:</label>
          <input
            type="file"
            className="userName"
            id="bannerImage"
            name="bannerImage"
            accept="image/*"
            onChange={(e) =>
              handleImageChange(e, "banner", formState.bannerImage, user.uuid)
            }
          />
          <img
            style={{ height: "250px", width: "250px" }}
            src={formState.bannerImage}
            alt=""
          />
          <input className="primary-btn-drk" type="submit" value="Guardar" />
        </form>
      );
      break;

    // CATEGORY FORM
    case 6:
      formOption = (
        <form className="simple-form" onSubmit={handleCategorySubmit}>
          <input
            className="txtbox-t3"
            type="text"
            name="categoryTitle"
            placeholder="Nombre de Coleccion"
            value={formState.categoryTitle || ""}
            onChange={onInputChange}
          />

          <input className="primary-btn-drk" type="submit" value="Guardar" />
        </form>
      );
      break;
  }
  return <>{formOption}</>;
};

SimpleForm.propTypes = {
  formType: PropTypes.any,
  setloggedIn: PropTypes.any,
  close: PropTypes.any,
  info: PropTypes.any,
};
