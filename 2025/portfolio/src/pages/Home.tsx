import mySelfImage from "/public/images/me.jpg";
import { TfiArrowCircleDown } from "react-icons/tfi";

import "../styles/page/Home.css";

const Home = () => {
    return (
        <div className="home">
            <div className="inner">
                {/* setInterval(() => {
                    
                }, interval); */}
                <div className="wrap_name">
                    <h2>Hello ! My name is daseul</h2>
                    <p className="desc">
                        안녕하세요 ! <br />
                        한사람 몫은 꼭 해내는 웹 퍼블리셔 정다슬 입니다. 프로젝트를 진행하면서 다른 팀원들과 원활한 소통이 가능하며, 주어진 대로만 만들어 내는 것이 아닌 주체적으로 의견을 제시하면서 더 좋은 사용성에 대해 끊임없이 고민하면서 퍼블리싱을 하는 것을 지향합니다. 앞으로도 끊임없이 고민하고, 발전을 하며 생각의 폭을 넓혀가겠습니다.
                        <br />
                        공부하고, 발전하며, 어제보다는 성장한 내가 될 수 있는 퍼블리셔가 되겠습니다.
                    </p>
                </div>
                <div className="wrap_img">
                    <img src={mySelfImage} alt="myself" />
                </div>

                <div className="more">
                    <p>
                        저는 이런 사람입니다.
                        <button>
                            <TfiArrowCircleDown />
                        </button>
                    </p>
                    <div className="content">
                        <p>
                            저는 일할 때<span>긍정적인 방향으로 프로젝트를 완수</span> 합니다.
                            {/* 
                            1 긍정적인 방향으로 프로젝트를 완수합니다.
                            2 맡은 몫은 최선을 다해 이뤄냅니다.
                            3 꼼꼼하게 더 실용적인 코드를 만들 수 있게 생각합니다.
                            4 커뮤니케이션을 중요하게 생각합니다.
                            5 동료들과 의견을 제시하고 수용합니다.
                            6 웹 표준, 웹 접근성을 지킵니다.
                            7 깔끔하고, 실용적인 stylesheet 를 지향합니다.
                            */}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
