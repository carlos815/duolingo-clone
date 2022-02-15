
import MediaQuery, { useMediaQuery } from 'react-responsive';

const mobileWidth = 768

export const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: mobileWidth })
    return isDesktop ? children : null
}
export const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: mobileWidth })
    return isMobile ? children : null
}


