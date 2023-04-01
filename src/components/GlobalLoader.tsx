import { useState, useEffect } from "react";

const GlobalLoader = ({ loading }: { loading: boolean }) => {
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      // delay the loading state to avoid flickering
      const timeout = setTimeout(() => {
         setIsLoading(loading);
      }, 300);

      return () => clearTimeout(timeout);
   }, [loading]);

   return (
      <>
         {isLoading && (
            <div className="fixed w-full z-30 top-0 left-0 w-screen h-screen flex flex-row justify-center items-center bg-black opacity-50 ">
               <div
                  className="w-12 h-12 rounded-full animate-spin
							border-4 border-solid border-green-500 
							border-t-transparent shadow-md"
               ></div>
            </div>
         )}
      </>
   );
};

export default GlobalLoader;
