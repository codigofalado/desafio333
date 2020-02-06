import React, { useState } from 'react';

// Static archives
    import './style.css';
function Header() {
    const [openHeader, setOpenHeader] = useState(false);

    function openMenu() {
        const iconNav = document.getElementById('icon-nav');
        const headerMobile = document.getElementById('header-mobile');
        if (openHeader === false) {
            setOpenHeader(true);
            headerMobile.style.height = "300px";
            iconNav.classList.toggle('fa-bars');
            iconNav.classList.toggle('fa-arrows-alt-v');
        } else {
            setOpenHeader(false);
            headerMobile.style.height = "0px";
            iconNav.classList.toggle('fa-bars');
            iconNav.classList.toggle('fa-arrows-alt-v');
        }
    }
    return (
        <>
            <div className="header-full">
                <h1 className="title-header">Organic Read</h1>
                <div className="cube-icon" onClick={openMenu}>
                    <i id="icon-nav" className="fas fa-arrow-down icon-nav"></i>
                </div>
            </div>
            <div id="header-mobile" className="header-mobile list-nav">
                <a href="#sobre">Sobre</a>
                <a href="/">Calcular PPM</a>
            </div>
        </>
    );
}

export default Header;