import "./community.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import Swal from "sweetalert2";
import CommunityBoardCommentWrite from "./CommunityBoardCommentWrite";
import RecommentWrite from "./RecommentWrite";
import RecommentList from "./RecommentList";

const CommunityBoardComment = (props) => {
  const comuBoardCommentCount = props.comuBoardCommentCount;
  const member = props.member;
  const index = props.index;
  const isLogin = props.isLogin;
  const [boardCommentList, setBoardCommentList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const communityBoardNo = props.communityBoardNo;
  const [renderingComment, setRenderingComment] = useState(false);
  const [renderingRecomment, setRenderingRecomment] = useState(false);

  useEffect(() => {
    axios
      .get("/community/boardCommentList/" + reqPage + "/" + communityBoardNo)
      .then((res) => {
        console.log(res.data);
        setBoardCommentList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [renderingComment]);

  return (
    <div className="board-item-comment">
      <div className="board-item-comment-arrow">
        <span className="material-symbols-outlined arrow-right">
          subdirectory_arrow_right
        </span>
      </div>
      <div className="board-item-comment-write-wrap">
        <CommunityBoardCommentWrite
          communityBoardNo={communityBoardNo}
          index={index}
          renderingComment={renderingComment}
          setRenderingComment={setRenderingComment}
        />
      </div>
      <div className="board-item-comment-list-wrap">
        {boardCommentList.map((comment, indexComment) => {
          return (
            <CommentItem
              key={"comment" + index}
              comment={comment}
              indexComment={indexComment}
              index={index}
              member={member}
              renderingComment={renderingComment}
              setRenderingComment={setRenderingComment}
              renderingRecomment={renderingRecomment}
              setRenderingRecomment={setRenderingRecomment}
            />
          );
        })}
        {/* {boardCommentList.map((item, index) => {
          return <div key={"test" + index}>{item.comuBoardCommentContent}</div>;
        })} */}
      </div>
    </div>
  );
};

// const CommunityBoardCommentWrite = (props) => {
//   const communityBoardNo = props.communityBoardNo;

//   const insertComment = () => {
//     const boardCommentContent = document.querySelector(
//       ".comment-write-textareat-text"
//     ).value;

//     console.log(communityBoardNo);
//     console.log(boardCommentContent);

//     if (boardCommentContent !== "") {
//       Swal.fire({
//         icon: "question",
//         text: "게시글을 작성하시겠습니까?",
//         showCancelButton: true,
//         confirmButtonText: "확인",
//         cancelButtonText: "취소",
//       }).then((res) => {
//         if (res.isConfirmed) {
//           const form = new FormData();
//           form.append("comuBoardRef", communityBoardNo);
//           form.append("comuBoardCommentContent", boardCommentContent);
//           const token = window.localStorage.getItem("token");

//           axios
//             .post("community/insertBoardComment", form, {
//               headers: {
//                 contentType: "multipart/form-data",
//                 processdData: false,
//                 Authorization: "Bearer " + token,
//               },
//             })
//             .then((res) => {
//               console.log(res.data);
//             })
//             .catch((res) => {
//               console.log(res.response.status);
//             });
//         }
//       });
//     } else {
//       Swal.fire("작성 실패", "입력값을 확인해주세요.", "warning");
//     }

//   };

//   return (
//     <div className="comment-write-wrap">
//       <div className="comment-write">
//         <div className="comment-write-textarea">
//           <textarea className="comment-write-textareat-text"></textarea>
//         </div>
//         <div className="comment-write-btn">
//           <Button1 text="등록하기" clickEvent={insertComment} />
//         </div>
//       </div>
//     </div>
//   );
// };

const CommentItem = (props) => {
  const index = props.index;
  const comment = props.comment;
  const navigate = useNavigate();
  const member = props.member;
  const indexComment = props.indexComment;
  const renderingComment = props.renderingComment;
  const setRenderingComment = props.setRenderingComment;
  const renderingRecomment = props.renderingRecomment;
  const setRenderingRecomment = props.setRenderingRecomment;

  const ToggleRecomment = () => {
    const recommentBtn = document.querySelectorAll(
      ".comment-recomment-write-wrap"
    )[(index, indexComment)];

    const selectComment = document.querySelector(
      "#i" + index + "ic" + indexComment
    );

    // recommentBtn.classList.toggle("showClass");
    selectComment.classList.toggle("showClass"); // 쿼리셀렉터로 id로 불러오고 걔한테 toggle주면 되는거 아닌가?
  };

  // console.log(comment);

  const deleteComment = () => {
    console.log(comment);
    Swal.fire({
      icon: "warning",
      text: "댓글을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/community/removeComment/" + comment.comuBoardCommentNo)
          .then((res) => {
            console.log(res.data);
            console.log("성공");
            setRenderingComment(!renderingComment);
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      } else {
        return;
      }
    });
  };

  return (
    <div className="board-item-comment-list">
      <div className="comment-profile">
        <div className="comment-account">
          <span class="material-icons">account_circle</span>
        </div>
        <div className="comment-writer">{comment.memberId}</div>
        <div className="comment-date">{comment.comuBoardCommentDate}</div>
        <div className="comment-recomment-btn" onClick={ToggleRecomment}>
          답글달기
        </div>
        {member && member.memberNo == comment.comuBoardCommentWriter ? (
          <>
            <div className="comment-update">수정</div>
            <div className="comment-delete" onClick={deleteComment}>
              삭제
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="comment-content">{comment.comuBoardCommentContent}</div>
      <div className="comment-recomment-wrap">
        {/* <div className="comment-recomment-arrow">
          <span className="material-symbols-outlined arrow-right">
            subdirectory_arrow_right
          </span>
        </div> */}
        <RecommentWrite
          communityBoardNo={comment.comuBoardRef}
          comuBoardCommentNo={comment.comuBoardCommentNo}
          index={index}
          indexComment={indexComment}
          member={member}
          renderingRecomment={renderingRecomment}
          setRenderingRecomment={setRenderingRecomment}
        />
        <RecommentList
          communityBoardNo={comment.comuBoardRef}
          comuBoardCommentNo={comment.comuBoardCommentNo}
          index={index}
          member={member}
          renderingRecomment={renderingRecomment}
          setRenderingRecomment={setRenderingRecomment}
        />
      </div>
    </div>
  );
};

export default CommunityBoardComment;
