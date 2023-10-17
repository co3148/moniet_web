import "./community.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import Swal from "sweetalert2";
import CommunityBoardCommentWrite from "./CommunityBoardCommentWrite";

const RecommentWrite = (props) => {
  const index = props.index;
  const communityBoardNo = props.communityBoardNo;
  const comuBoardCommentNo = props.comuBoardCommentNo;
  const location = useLocation();

  const insertRecomment = () => {
    const recommentContent = document.querySelectorAll(
      ".comment-recomment-write-textareat-text"
    )[index].value;

    if (recommentContent !== "") {
      Swal.fire({
        icon: "question",
        text: "댓글을 작성하시겠습니까?",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((res) => {
        if (res.isConfirmed) {
          const form = new FormData();
          form.append("comuBoardRef", communityBoardNo);
          form.append("comuBoardCommentRef", comuBoardCommentNo);
          form.append("comuBoardCommentContent", recommentContent);
          const token = window.localStorage.getItem("token");

          axios
            .post("/community/insertBoardComment", form, {
              headers: {
                contentType: "multipart/form-data",
                processdData: false,
                Authorization: "Bearer " + token,
              },
            })
            .then((res) => {
              if (res.data > 0) {
                Swal.fire(
                  "작성 완료",
                  "댓글 작성이 완료되었습니다.",
                  "success"
                );
              }
            })
            .catch((res) => {
              console.log(res.response.status);
            });
        } else {
          return;
        }
      });
    } else {
      Swal.fire("작성 실패", "입력값을 확인해주세요.", "warning");
    }
  };

  return (
    <div className="comment-recomment-write">
      <div className="comment-recomment-write-wrap">
        {/* <CommunityBoardCommentWrite /> */}
        <div className="comment-recomment-write">
          <div className="comment-recomment-write-textarea">
            <textarea className="comment-recomment-write-textareat-text"></textarea>
          </div>
          <div className="comment-recomment-write-btn">
            <Button1 text="등록하기" clickEvent={insertRecomment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommentWrite;
