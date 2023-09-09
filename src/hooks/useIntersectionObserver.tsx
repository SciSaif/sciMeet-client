// import { useDispatch } from "react-redux";
// import { useState, useEffect, useRef, useCallback } from "react";

// interface Props {}

// export default function useIntersectionObserver({}: Props) {
//     const dispatch = useDispatch();
//     const observer = useRef<IntersectionObserver | null>();

//     const lastPostObserver = useCallback(
//         (node) => {
//             if (isSuccess === false) {
//                 return;
//             }
//             if (isFetching) {
//                 return;
//             }
//             if (observer.current) observer?.current?.disconnect();

//             observer.current = new IntersectionObserver((entries) => {
//                 if (entries[0].isIntersecting && hasMore) {
//                     // console.log("visible, ", pageOptions.pageNumber);
//                     dispatch(incrementPage(type));
//                 }
//             });
//             if (node) {
//                 observer?.current?.observe(node);
//             }
//         },
//         [isFetching, hasMore]
//     );

//     // return ref to be used in the component
//     return lastPostObserver;
// }
