import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button3 } from "../util/Buttons";
const IngChallenge = () => {
  const [challengeList, setChallengeList] = useState([]);
  useEffect(() => {
    axios
      .get("/challenge/challengeList1")
      .then((res) => {
        console.log(res.data);
        setChallengeList(res.data.challengeList);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  const navigate = useNavigate();
  const write = () => {
    navigate("write");
  };
  return (
    <div className="challenge-content">
      <div className="challenge-detail">진행중인 머니챌린지 리스트</div>
      <div className="challenge-list-wrap">
        {challengeList.map((challenge, index) => {
          return (
            <ChallengeItem key={"challenge" + index} challenge={challenge} />
          );
        })}
      </div>
    </div>
  );
};
const ChallengeItem = (props) => {
  const challenge = props.challenge;
  const navigate = useNavigate();
  const challengeView = () => {
    navigate("/challenge/view", {
      state: { challengeNo: challenge.challengeNo },
    });
  };
  return (
    <div className="challenge-item" onClick={challengeView}>
      <div className="challenge-item-info">
        <div>{challenge.challengeTitle}</div>
        <div>{challenge.challengeAmount.toLocaleString()}</div>
        <Dayday></Dayday>
      </div>
    </div>
  );
};
const Dayday = (props) => {
  const challenge = props.challenge;
  const [targetDate, setTargetDate] = useState(new Date("2023-12-31"));
  const calculateDday = () => {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;
    // D-day 계산
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return { days };
  };
  const [dday, setDday] = useState(calculateDday());
  useEffect(() => {
    const interval = setInterval(() => {
      const ddayData = calculateDday();
      setDday(ddayData);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="challenge-content">
      <p>{dday.days}일남음</p>
    </div>
  );
};
export default IngChallenge;
