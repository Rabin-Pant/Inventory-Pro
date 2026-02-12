// Context for sharing state across components
const { createContext, useContext } = React;

const AppContext = createContext();

// Custom hook for using context
function useAppContext() {
    return useContext(AppContext);
}

// Make it global
window.AppContext = AppContext;
window.useAppContext = useAppContext;