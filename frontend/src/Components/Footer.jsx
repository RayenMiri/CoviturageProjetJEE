import React from 'react';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <p>&copy; {new Date().getFullYear()} TEST123. All rights reserved.</p>
        </footer>
    );
};

const footerStyle = {
    backgroundColor: '#f8f9fa',
    padding: '1px',
    textAlign: 'center',
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    borderTop: '1px solid #e7e7e7',
};

export default Footer;