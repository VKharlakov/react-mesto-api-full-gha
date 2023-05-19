import React from "react";

const date = new Date()

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy;&nbsp;{`${date.getFullYear()} Mesto Russia // Kharlakov Vitaly`}</p>
        </footer>
    )
}

export default Footer