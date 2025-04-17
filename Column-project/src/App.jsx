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
import PlayResultFormPage, { loader as resultFormLoader } from "./page/play-rating/rating-form-page/RatingFormPage";


// play-rating
import PlayerRatingPage, { pRatLoader } from "./page/play-rating/public-play-rating-page/PlayRatingPage";
import RatingFormPage from "./page/play-rating/rating-form-page/RatingFormPage";
import RatingUpdatePage from "./page/play-rating/rating-update-Page/RatingUpdatePage";

import PlayerRatingResult, {
  loader as prrLoader,
} from "./components/player-rating/PlayerRatingResult";


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
          element: <PlayResultFormPage></PlayResultFormPage>,
          loader: resultFormLoader,
        },
        {
          path: "/modifier/:id",
          element: <ModifierPage></ModifierPage>,
          action: modiAction,
          loader: modiLoader,
        },
        {
          path: "/player-rating",
          element: <PlayerRatingPage></PlayerRatingPage>,
          loader: pRatLoader,
        },
        {
          path: "/player-rating/result/:id",
          element: <PlayerRatingResult></PlayerRatingResult>,
          loader: prrLoader,
        },
        {
          path: "/player-rating/form",
          element: <RatingFormPage></RatingFormPage>,
        },
        {
          path: "/player-rating/update/:id",
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
      <PageContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </PageContextProvider>
    </>
  );
}

export default App;
