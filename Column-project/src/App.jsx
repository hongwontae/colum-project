/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// basic
import Layout from "./components/layout/Layout";
import ErrorPage from "./page/error-page/ErrorPage";
import LoginPage from "./page/login-page/LoginPage";
import HomePage from "./page/home-page/HomePage";


// play-result public and private (public 2개 먼저)
import PublicPlayResultPage, { prLoader } from "./page/play-result/public-play-result-page/PublicPlayResultPage";
import PrivatePlayResultPage from "./page/play-result/private-play-result-page/PrivatePlayReslutPage";
// 굳이 여기서 public vs private으로 나눌 이유가 있나? one은 detail일 뿐인데....
import PublicPlayResult, {
  resultOneLoader,
} from "./page/play-result/public-play-result-one/PublicPlayResult";
import PlayResultFomrPage from './page/play-result/play-result-form/PlayResultFormPage'


// play-rating
import PlayerRatingPage from "./page/play-rating/public-play-rating-page/PlayRatingPage";
import RatingUpdatePage from "./page/play-rating/rating-update-Page/RatingUpdatePage";
import PlayRatingFormPage from "./page/play-rating/rating-form-page/RatingFormPage";
import PlayerRatingResult from "./components/play-rating/PlayerRatingResult";
// rating loader and action
import {PlayRatingFormLoader} from './components/play-rating-from/PlayRatingForm';


import ModifierPage, {
  action as modiAction,
  loader as modiLoader,
} from "./page/modifier-page/ModifierPage";

import TestPage from './page/test-page/TestPage';

// Context
import PageContextProvider from "./context/PageContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        { index: true, element: <HomePage></HomePage>},
        {path : '/test', element : <TestPage></TestPage>},
        {
          path: "/public/play-result",
          element: <PublicPlayResultPage></PublicPlayResultPage>,
          loader: prLoader,
        },
        {
          path : '/private/play-result',
          element : <PrivatePlayResultPage></PrivatePlayResultPage>
        },
        {
          path: "/public/play-result/:id",
          element: <PublicPlayResult></PublicPlayResult>,
          loader: resultOneLoader,
        },
        {
          path: "/play-result-form",
          element: <PlayResultFomrPage></PlayResultFomrPage>,
        },
        // {
        //   path: "/modifier/:id",
        //   element: <ModifierPage></ModifierPage>,
        //   action: modiAction,
        //   loader: modiLoader,
        // },
        {
          path: "/play-rating",
          element: <PlayerRatingPage></PlayerRatingPage>,
        },
        {
          path : '/play-rating/form',
          element : <PlayRatingFormPage></PlayRatingFormPage>,
        },
        {
          path: "/play-rating/result/:id",
          element: <PlayerRatingResult></PlayerRatingResult>,
        },
        {
          path: "/play-rating/update/:id",
          element: <RatingUpdatePage></RatingUpdatePage>,
        },
        {
          path: "/login",
          element: <LoginPage></LoginPage>,
        },
      ],
    },
  ]);

  return (
    <>
      {/* <PageContextProvider> */}
        <RouterProvider router={router}></RouterProvider>
      {/* </PageContextProvider> */}
    </>
  );
}

export default App;
