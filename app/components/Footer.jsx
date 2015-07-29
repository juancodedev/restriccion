import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="Footer">
        <h5>Desarrollado por:</h5>
        <a href="http://www.santiagolab.cl/" target="_blank"><img className="responsive-img stgoLogo" src="imgs/logo-santiagolab.svg" alt="SantiagoLab" /></a>
        <div className="git">
          <a href="https://github.com/SantiagoLab/tengo-restriccion" target="_blank"><span>Código abierto</span> <img className="responsive-img" src="imgs/logo-git.svg" alt="SantiagoLab Repositorio git" />
        </a>
        </div>
      </footer>
    );
  }
}
