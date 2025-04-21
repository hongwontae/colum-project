import HomeButton from '../../../reusable-components/HomeButton';
import {useStore} from '../../../zustand-store/home-page-store';
import HomeLatestNewsText from '../home-segment/HomeLatestNewsText';
import HomePictures from '../home-segment/HomePictures';
import HomeShortHistory from '../home-segment/HomeShortHistory';
import HomeTropies from '../home-segment/HomeTropies'

function HomeSubButton(){

    const {
        toggleState,
        toggleShortHistoryHandler,
        toggleNewsHandler,
        toggleTrophyHandler,
        togglePicturesHandler
      } = useStore();
    
      const { toggleDesc, toggleNews, toggleTrophy, togglePictures } = toggleState;

    
      return (
        <>
          <HomeButton onClick={toggleShortHistoryHandler}>
            Click and LiverPool Description
          </HomeButton>
          <HomeShortHistory toggle={toggleDesc}></HomeShortHistory>
    
          <HomeButton onClick={toggleNewsHandler}>
            Click and LiverPool lastes NEWS
          </HomeButton>
          <HomeLatestNewsText toggle={toggleNews}></HomeLatestNewsText>
    
          <HomeButton onClick={toggleTrophyHandler}>
            Click and LiverPool Tropies
          </HomeButton>
          <HomeTropies toggle={toggleTrophy}></HomeTropies>

          <HomeButton onClick={togglePicturesHandler}>Click and LiverPool some Pictures...</HomeButton>
          <HomePictures toggle={togglePictures}></HomePictures>
        </>
      );
}

export default HomeSubButton;