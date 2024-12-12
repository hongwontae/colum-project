/* eslint-disable react/prop-types */
function HomeShortHistory({ toggle }) {
  
    return (
      <>
        {toggle && (
          <div className="w-2/3 m-auto">
            <p>
              <p className="mb-2">
                리버풀 FC는 영국 잉글랜드 머지사이드 주의 리버풀을 연고로 하는
                프로 축구 구단이다. 잉글랜드 프리미어 리그에 소속되어 있으며,
                홈구장은 안필드다.
              </p>
              <p className="mb-2">
                잉글랜드 1부 리그 누적 승점 1위 이자 잉글랜드 구단 중 가장 많은
                메이저 트로피와 더불어 모든 유럽 대항전 최다 우승 기록을
                보유했으며, 특히 잉글랜드 구단 중 UEFA 챔피언스 리그 최다 우승
                구단으로서 잉글랜드에서 유일하게 빅 이어를 영구 소장한 구단이다.
              </p>
              <p className="mb-7">
                1892년에 창단되어 빌 샹클리, 밥 페이즐리, 조 페이건 재임기에 붉은
                제국이라 불리는 압도적인 전성기를 보내면서 잉글랜드를 넘어 유럽
                최정상급 클럽으로 그 명성을 알렸으며, 축구사에 길이 남을 명승부라
                칭해지는 이스탄불의 기적과 안필드의 기적의 주인공이기도 하다.
              </p>
            </p>
          </div>
        )}
      </>
    );
  }
  
  export default HomeShortHistory;
  