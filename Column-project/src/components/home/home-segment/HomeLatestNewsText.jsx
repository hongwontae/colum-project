/* eslint-disable react/prop-types */
function HomeLatestNewsText({ toggle }) {
    return (
      <>
        {toggle && (
          <div className="w-2/3 m-auto">
              <div className="mb-2">(1주일 간격으로 최근 소식으로 업데이트 됩니다.)</div>
            <div>
              <p className="mb-1">Topic1 - 아르네 슬롯이 누구신가요?</p>
              <p className="mb-3">
                강한 압박과 선수들의 왕성한 움직임을 통한 공격적인 축구를 철학으로
                삼고 있으며, 풀백과 미드필더들의 포지셔닝 변화를 통한 유연하고
                다양한 후방 빌드업 구조를 사용한다. 포메이션은 기본적으로 4-3-3
                혹은 4-2-3-1을 선호하며, 수비 상황에서는 4-4-2 포메이션의 두 줄
                수비로 전형을 바꾸는 편이다. 펩 과르디올라 감독에게 영향을 많이
                받았다고 직접 밝힌 바 있으며, 부분적으로 꽤나 유사한 스타일의
                축구를 펼친다.
              </p>
              <p className="mb-1">Topic2 - 다윈 누녜스의 미래는?</p>
              <p className="mb-3">
                현대 축구는 높은 조직성, 실리를 추구하는 방식이다. 근 10년동안
                레알마드리드을 보면 알 수 있다. 점유율을 포기하고 수비를 단단히
                하고 빠른 역습으로 골을 넣고 그들의 축구로 상대를 빠뜨린다.
                <p>
                  여기서 중요한 것은 높은 결정력이다. 골을 넣지 못하면 팀이
                  추구하는 경기목표를 달성할 수 없다. 강팀은...
                </p>
              </p>
              <p>Topic3 - 다음 시즌에 누구를 영입할까?</p>
              <p className="mb-20">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
                deserunt enim ipsam iure. Quisquam quae animi, corporis ab cumque
                itaque veniam aliquam fugit quibusdam eveniet dolorum perferendis,
                laboriosam tempora hic.
              </p>
            </div>
          </div>
        )}
      </>
    );
  }
  
  export default HomeLatestNewsText;
  