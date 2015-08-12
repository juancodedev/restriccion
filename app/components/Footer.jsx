import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="Footer">
        <h5>Desarrollado por:</h5>
        <a href="http://www.santiagolab.cl/" target="_blank"><img className="responsive-img stgoLogo" src="imgs/logo-santiagolab.svg" alt="SantiagoLab" /></a>

        <small>
          Original background Photo: <a target="_blank" href="https://www.flickr.com/photos/armandolobos/3108665801/in/photolist-5JGJ3e-hmH164-pshdpp-hmGR3q-g2Tp1h-fdufra-pD5cia-kpy4A8-7o9hsB-4nW4f8-8Sgcbe-59RA6R-ae4FEw-qv6mJf-4o18MJ-4rTPNE-qxnsUr-kpAqCo-kpy19P-pABmta-8GL3iP-rG5ogV-5MCG1E-hcRt5x-ufgXrG-qfPzYm-qfXtoZ-i36cWR-qTE8a6-suLrrd-qfNWBW-573DcR-r2wAMd-9Nepsq-rYwRac-9MSczx-sqzNBE-hcRsHR-psbKqC-kpyRh6-geZpSc-5TuU4u-pf7u6C-puyBQs-98K68h-i7aiiH-pf8zLV-i7azMf-hYXy77-i35exa">
            Santiago de Chile by night
          </a>,
          by <a target="_blank" href="https://www.flickr.com/photos/armandolobos/">alobos Life</a>,
          <a target="_blank" href="https://creativecommons.org/licenses/by-nc-nd/2.0/#">
          <span data-icon="" className="icon"></span> License</a>
        </small>

        <div className="git">
          <a href="https://github.com/SantiagoLab/tengo-restriccion" target="_blank"><span>Código abierto</span> <img className="responsive-img" src="imgs/logo-git.svg" alt="SantiagoLab Repositorio git" />
        </a>
        </div>
      </footer>
    );
  }
}
