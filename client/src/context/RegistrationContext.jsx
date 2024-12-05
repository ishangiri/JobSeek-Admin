// import { useContext, createContext, useState } from "react";

// const RegistrationContext = createContext();


// export const ContextProvider = ({children}) => {
//     const [registrationData, setRegistrationData ] = useState(null);

//    return( <RegistrationContext.Provider value={{registrationData, setRegistrationData}}>
//       {children}
//     </RegistrationContext.Provider>
//    )

// }

// export const useRegistration = () => {
//   const value = useContext(RegistrationContext);

//   if (!value) {
//     throw new Error("useAuth must be wrapped inside AuthContextProvider");
//   }
//   return value;
// }

