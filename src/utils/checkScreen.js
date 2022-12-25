export const renderResponsive = () => {
    if (window.innerWidth <= 414 && window.innerHeight <= 736) {
        return true;
    } else {
        return false;
    }
}