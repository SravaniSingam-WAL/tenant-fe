export const getToken = () => {
    const { token } =  JSON.parse(localStorage.getItem('user') || '{}');
    return token || '';
};
export const getEmail = () => {
    const { email } =  JSON.parse(localStorage.getItem('user') || '{}');
    return email || '';
};

export const getTenantId = () => {
    const { tenantId } =  JSON.parse(localStorage.getItem('user') || '{}');
    return tenantId || '';
};

export const getBrandName = () => {
    const { brandName } =  JSON.parse(localStorage.getItem('user') || '{}');
    return brandName || '';
};

export const setToken = (userDetails) => {
    localStorage.setItem('user', JSON.stringify(userDetails));   
};
    