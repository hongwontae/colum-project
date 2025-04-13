/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import ErrorPage from "./page/errorPage/ErrorPage";

// play-result public and private (public 2개 먼저)
import PublicPlayResultPage, { prLoader } from "./page/public-play-result-page/PublicPlayResultPage";
import PrivatePlayResultPage from "./page/private-play-result-page/PrivatePlayReslutPage";
import PublicPlayResult, {
  resultOneLoader,
} from "./page/public-play-result-one/PublicPlayResult";



import PlayerRatingPage, {
  pRatLoader,
} from "./page/player-rating-page/PlayerRatingPage";
import PlayResultFormPage, {
  loader as resultFormLoader,
} from "./page/play-result-form/PlayResultFormPage";
import { prAction } from "./components/play-result-form/PlayResultForm";
import LoginPage from "./page/LoginPage/LoginPage";
import ModifierPage, {
  action as modiAction,
  loader as modiLoader,
} from "./page/modifierPage/ModifierPage";
import PlayerRatingResult, {
  loader as prrLoader,
} from "./components/player-rating/PlayerRatingResult";
import RatingFormPage from "./page/RatingFormPage/RatingFormPage";
import { loader as rfLoader } from "./page/RatingFormPage/loader";
import { action as rfAction } from "./page/RatingFormPage/action";
import RatingUpdatePage from "./page/RatingUpdatePage/RatingUpdatePage";
import { action as ruAction } from "./page/RatingUpdatePage/action";
import { loader as ruLoader } from "./page/RatingUpdatePage/loader";
import HomePage from "./page/homePage/HomePage";

// Context
import PageContextProvider from "./context/PageContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        { index: true, element: <HomePage></HomePage> },
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
          action: prAction,
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
          loader: rfLoader,
          action: rfAction,
        },
        {
          path: "/player-rating/update/:id",
          element: <RatingUpdatePage></RatingUpdatePage>,
          loader: ruLoader,
          action: ruAction,
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
