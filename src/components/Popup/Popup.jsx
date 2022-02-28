import React from "react";
import closeIcon from "../../assets/img/closePopup.svg";
import { useDispatch } from "react-redux";
import { isLoginThunk, isRegisterThunk } from "../../redux/actions/authAction";

const Popup = ({ toggleLoginPopup, popupLogin }) => {
  const dispatch = useDispatch();
  const [input, setInput] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [contentPopup, setContentPopup] = React.useState(true);
  const handlePopup = () => {
    setContentPopup(!contentPopup);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const login = () => {
    if (contentPopup) {
      dispatch(isLoginThunk(input.email, input.password));
      toggleLoginPopup();
    } else {
      dispatch(isRegisterThunk(input.fullName, input.email, input.password));
      toggleLoginPopup();
      handlePopup();
    }
    setInput({ fullName: "", email: "", password: "" });
  };

  return (
    <div className={`popup ${popupLogin ? "open" : ""}`}>
      <div className="popup__body">
        <div className="popup__content popup__contentEdit">
          <img
            onClick={toggleLoginPopup}
            className="popup__close-img close-popup"
            src={closeIcon}
            alt=""
          />
          <div className="popup__inner">
            <div id="formEdit" className="popup__formEdit">
              {contentPopup ? (
                <div className="popup__title">Вход в аккаунт</div>
              ) : (
                <>
                  <div className="popup__title">Регистрация</div>
                  <div>Имя и Фамилия</div>
                  <input
                    name="fullName"
                    onChange={handleChange}
                    className="popup__input"
                    type="text"
                    placeholder="Введите Имя и Фамилию..."
                    required
                  />
                </>
              )}
              <div>Email</div>
              <input
                onChange={handleChange}
                name="email"
                className="popup__input"
                type="text"
                placeholder="Введите Email..."
                value={input.email}
                required
              />
              <div>Пароль</div>
              <input
                onChange={handleChange}
                name="password"
                className="popup__input"
                type="password"
                placeholder="Введите пароль..."
                required
                value={input.password}
              />
              <button onClick={login} className="yellow__button popup__submit">
                {contentPopup ? (
                  <div>Войти</div>
                ) : (
                  <div>Зарегистрироваться</div>
                )}
              </button>
            </div>
            <div onClick={handlePopup}>
              {!contentPopup ? (
                <span className="popup__link">Войти:</span>
              ) : (
                <div className="popup__link">Зарегистрироваться:</div>
              )}
            </div>
          </div>
        </div>
        <div className="overlay" onClick={toggleLoginPopup} />
      </div>
    </div>
  );
};

export default Popup;
