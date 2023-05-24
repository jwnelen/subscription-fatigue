// footer component

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer class=" absolute w-full bottom-0 text-center">
            {year} &copy; The subscription Fatigue is real
            </footer>
    );
}

export default Footer;