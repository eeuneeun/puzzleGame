// import axios from "axios";
// import queryString from "query-string";

// /**
//  * API 통신 공통
//  */

// export const api = axios.create({
//   paramsSerializer: (params) => queryString.stringify(params),
// });

// // Response 공통 처리
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     console.log("error: ", error);
//     switch (error.response.status) {
//       case 401: // 인증오류 발생
//         // await signOut()
//         console.error("Signout");
//         break;
//       default:
//     }
//     return Promise.reject(error);
//   }
// );
