// footer component

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer class="fixed p-1 w-full bottom-0 bg-gray-100 text-center">
            {year} &copy; The subscription Fatigue is real
            </footer>
    );
}

export default Footer;