/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import HomePage, { loader as homeLoader } from "./page/homePage/HomePage";
import ErrorPage from "./page/errorPage/ErrorPage";
import PlayResultPage, { prLoader } from "./page/playResultPage/PlayResultPage";
import PlayResult, {
  resultOneLoader,
} from "./components/play-result/play-result-segment/PlayResult";
import PlayerRatingPage, {
  pRatLoader,
} from "./page/player-rating-page/PlayerRatingPage";
import PlayResultFormPage, {
  loader as resultFormLoader,
} from "./page/play-result-form/PlayResultFormPage";
import { prAction } from "./components/play-result-form/PlayResultForm";
import LoginPage from "./page/LoginPage/LoginPage";
import { loginAction } from "./components/login/LoginForm";
import PageContextProvider from "./context/PageContext";
import ModifierPage, {
  action as modiAction,
  loader as modiLoader,
} from "./page/modifierPage/ModifierPage";
import PlayerRatingResult, {loader as prrLoader} from "./components/player-rating/PlayerRatingResult";
import RatingFormPage from "./page/RatingFormPage/RatingFormPage";
import {loader as rfLoader} from './page/RatingFormPage/loader';
import {action as rfAction} from './page/RatingFormPage/action';
import RatingUpdatePage from "./page/RatingUpdatePage/RatingUpdatePage";
import {action as ruAction} from './page/RatingUpdatePage/action';
import {loader as ruLoader} from './page/RatingUpdatePage/loader'

function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        { index: true, element: <HomePage></HomePage>, loader: homeLoader },
        {
          path: "/play-result",
          element: <PlayResultPage></PlayResultPage>,
          loader: prLoader,
        },
        {
          path: "/play-result/:id",
          element: <PlayResult></PlayResult>,
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
          path : '/player-rating/result/:id',
          element : <PlayerRatingResult></PlayerRatingResult>,
          loader : prrLoader
        },
        {
          path : '/player-rating/form',
          element : <RatingFormPage></RatingFormPage>,
          loader : rfLoader,
          action : rfAction
        },
        {
          path : '/player-rating/update/:id',
          element : <RatingUpdatePage></RatingUpdatePage>,
          loader : ruLoader,
          action : ruAction
        },
        {
          path: "/login",
          element: <LoginPage></LoginPage>,
          action: loginAction,
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
