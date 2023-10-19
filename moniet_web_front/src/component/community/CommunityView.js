import "./community.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Button1,
  Button2,
  Button3,
  Button4,
  Button5,
  Button6,
} from "../util/Buttons";
import axios from "axios";
import CommunityBoard from "./CommunityBoard";
import CommunityBoardWrite from "./CommunityBoardWrite";

const CommunityView = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const communityNo = location.state.communityNo;
  const [community, setCommunity] = useState({});
  const [member, setMember] = useState(null);
  const navigate = useNavigate();
  const [rendering, setRendering] = useState(false);

  useEffect(() => {
    axios
      .get("/community/view/" + communityNo)
      .then((res) => {
        setCommunity(res.data);
        // setRendering(!rendering);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
    if (isLogin) {
      const token = window.localStorage.getItem("token");
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setMember(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, [rendering]);

  // if (!isLogin) {
  //   Swal.fire({
  //     title: "로그인이 필요한 서비스입니다.",
  //     text: "로그인페이지로 이동합니다.",
  //     icon: "info",
  //   }).then(() => {
  //     navigate("/login");
  //   });
  // }

  // const deleteCommunity = () => {
  //   Swal.fire({
  //     icon: "warning",
  //     text: "해당 커뮤니티를 삭제하시겠습니까?",
  //     showCancelButton: true,
  //     confirmButtonText: "삭제",
  //     cancelButtonText: "취소",
  //   }).then((res) => {
  //     if (res.isConfirmed) {
  //       axios
  //         .get("/community/delete/" + community.communityNo)
  //         .then((res) => {
  //           console.log(res.data);
  //           if (res.data === 1) {
  //             navigate("/community");
  //           }
  //         })
  //         .catch((res) => {
  //           console.log(res.response.status);
  //         });
  //     }
  //   });
  // };

  const modifyCommunity = () => {
    Swal.fire({
      icon: "warning",
      text: "커뮤니티를 수정하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    })
      .then((res) => {
        if (res.isConfirmed) {
          navigate("/community/modify", { state: { community: community } });
        } else {
          return;
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  const deleteCommunity = () => {
    Swal.fire({
      icon: "warning",
      text: "커뮤니티를 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    })
      .then((res) => {
        if (res.isConfirmed) {
          axios.get("/community/deleteCommunity/" + communityNo).then((res) => {
            console.log(res.data);
            console.log("커뮤니티 삭제 성공");
            if (res.data > 0) {
              Swal.fire(
                "삭제 완료",
                "커뮤니티 삭제가 완료되었습니다.",
                "success"
              );
              navigate("community");
            }
          });
        } else {
          return;
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  return (
    <div className="community-view-wrap">
      <div className="community-view-thumbnail">
        {community.communityThumb ? (
          <img src={"/community/" + community.communityThumb} />
        ) : (
          <img src="/image/default.png" />
        )}
      </div>
      <div className="community-view-info">
        <div className="community-view-title">{community.communityTitle}</div>
        <div className="community-view-subtitle">
          {community.communitySubTitle}
        </div>
        <div className="community-view-type">
          {community.typeList
            ? community.typeList.map((type, index) => {
                return <TypeItem key={"type" + index} type={type} />;
              })
            : ""}
        </div>
        <div className="community-view-writer">
          작성자 ｜ {community.memberId}
        </div>
        <div className="community-view-email">
          이메일 ｜ {community.memberEmail}
        </div>
        <div className="community-view-date">
          작성일 ｜ {community.communityDate}
        </div>

        <div className="community-view-parti">
          참여인원 {community.communityParti}
        </div>

        <div className="community-view-btns">
          <div className="community-view-join-btn">
            {isLogin ? (
              <Button3 text="참여하기" /> // onClick해서 axios 못 돌리는지(위에서 돌려서)
            ) : (
              <Button6 text="로그인 해주시기 바랍니다." />
            )}
          </div>
          <div className="community-view-like-btn">
            {isLogin ? (
              <span class="material-icons ab-btn1">favorite_border</span>
            ) : (
              ""
            )}
          </div>
          <div className="community-view-share-btn">
            <span class="material-icons sh-btn1">share</span>
          </div>
        </div>
      </div>
      <div className="community-view-content-top">INFO</div>
      <div
        className="community-view-content ql-editor"
        dangerouslySetInnerHTML={{ __html: community.communityContent }}
      ></div>

      <div className="community-view-bottom-btns">
        {isLogin ? (
          member && member.memberNo == community.communityWriter ? (
            <>
              <div className="community-view-update" clickEvent={""}>
                <span
                  className="community-view-update-btn"
                  onClick={modifyCommunity}
                >
                  수정
                </span>
              </div>

              <div className="community-view-delete" onClick={deleteCommunity}>
                <span className="community-view-delete-btn">삭제</span>
              </div>
            </>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>

      <div className="community-view-board-zone">
        <div className="board-top">게시물 등록 〉</div>
        <div className="community-view-board-write">
          <CommunityBoardWrite
            communityNo={communityNo}
            rendering={rendering}
            setRendering={setRendering}
          />
        </div>
        <div className="community-view-board-list">
          <CommunityBoard
            communityNo={communityNo}
            rendering={rendering}
            setRendering={setRendering}
            isLogin={isLogin}
            member={member}
          />
        </div>
      </div>
    </div>
  );
};

const TypeItem = (props) => {
  const type = props.type;

  return (
    <div className="community-type">
      <div className="type-name">
        {type.communityTypeDiv === 1 ? (
          <span className="keyword key1">저축하기</span>
        ) : type.communityTypeDiv === 2 ? (
          <span className="keyword key2">지출줄이기</span>
        ) : type.communityTypeDiv === 4 ? (
          <span className="keyword key4">투자하기</span>
        ) : (
          <span className="keyword key8">기타</span>
        )}
      </div>
    </div>
  );
};

export default CommunityView;
