import Header  from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import PropTypes from 'prop-types';
// const ParentComponent = ({ children }) => {
//     return <div>{children}</div>;
//   };
//   ParentComponent.propTypes = {
//     children: PropTypes.node.isRequired,
//   };
const Layout = ( {children} ) => {
    return (
    <div className=" flex flex-col min-h-screen">
        <Header />
        <Hero />
        {/* <ParentComponent> */}
        <div className="container mx-auto py-10 flex-1"> {children}
        </div>
        {/* </ParentComponent> */}
        <Footer /> 
    </div>

    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
export default Layout