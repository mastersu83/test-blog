import React from "react";
import classes from "./About.module.scss";
import miPhoto from "../../assets/img/mi-foto.jpg";

const About = () => {
  return (
    <div className={classes.about}>
      <div className={classes.about__name}>Vasya Pupkin</div>
      <div className={classes.about__title}>Блог фронтенд-разработчика</div>
      <img src={miPhoto} alt="photo" className={classes.about__photo} />
      <div className={classes.about__me}>Обо мне</div>
      <div className={classes.about__text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
        scelerisque diam arcu risus. Imperdiet dolor, porttitor pellentesque
        fringilla aliquet sit. Turpis arcu vitae quis nunc suscipit. Mattis
        scelerisque leo curabitur faucibus. Nec, sed porta ac enim. Mattis quam
        accumsan ipsum commodo sed purus mi. Platea sit lectus neque, nulla
        sapien vitae nulla. Nisl viverra viverra quis mattis tincidunt laoreet
        amet, laoreet proin. Duis mi, aliquam tincidunt amet phasellus malesuada
        non nisi.
      </div>
    </div>
  );
};

export default About;
