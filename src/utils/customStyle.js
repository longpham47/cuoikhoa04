export const upperFirstLett = (myStr) => {
    return localStorage.setItem('job__title', myStr.charAt(0).toUpperCase() + myStr.slice(1));
}