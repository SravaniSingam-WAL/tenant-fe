export const getToken = () => {
    const { token } =  JSON.parse(localStorage.getItem('user') || '{}');
    return token || '';
};
export const getEmail = () => {
    const { email } =  JSON.parse(localStorage.getItem('user') || '{}');
    return email || '';
};
export const getName = () => {
    const { name } =  JSON.parse(localStorage.getItem('user') || '{}');
    return name || '';
};

export const getRoleId = () => {
    const { roleId } =  JSON.parse(localStorage.getItem('user') || '{}');
    return roleId || '';
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
export const transformOptionsArrayToObject = (optionsArray) => {
    const transformedOptions = {};
  
    for (const item of optionsArray) {
      const { isAccess, application } = item;
  
      if (application && application.name) {
        transformedOptions[application.name.toUpperCase()] = isAccess;
      }
    }
  
    return transformedOptions;
  };
  