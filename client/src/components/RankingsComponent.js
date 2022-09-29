import React, { useState } from "react";
import InputDataComponent from "./InputDataComponent";
import DisplayDataComponent from "./DisplayDataComponent";
import { firstMetric, secondMetric, thirdMetric, forthMetric } from "../utils/rankingMetrics";

export default function RankingsComponent({ teams, results }) {
  // console.log(teams);
  // console.log(results);

  let group1teams = [];
  let group2teams = [];

  const calculateMatchStats = () => {
    for (const res of results) {
      const [firstTeam, secondTeam] = [res.firstTeam, res.secondTeam]

      let firstTeamRef = teams.find(team => team.name == firstTeam)
      let secondTeamRef = teams.find(team => team.name == secondTeam)

      if (res.firstTeamGoals > res.secondTeamGoals) {
        // first team won
        firstTeamRef["matchStats"]["Win"] += 1;
        secondTeamRef["matchStats"]["Lose"] += 1;
      } else if (res.secondTeamGoals > res.firstTeamGoals) {
        // second team won
        secondTeamRef["matchStats"]["Win"] += 1;
        firstTeamRef["matchStats"]["Lose"] += 1;
      } else {
        // draw
        firstTeamRef["matchStats"]["Draw"] += 1;
        secondTeamRef["matchStats"]["Draw"] += 1;
      }
      // update goals
      firstTeamRef["matchStats"]["Goals"] += parseInt(res.firstTeamGoals);
      secondTeamRef["matchStats"]["Goals"] += parseInt(res.secondTeamGoals);
    }
  }

  const calculateRanking = () => {
    group1teams = teams.filter(team => team.groupNum == "1");
    group2teams = teams.filter(team => team.groupNum == "2");

    const teamsArr = [group1teams, group2teams];
    teamsArr.forEach(team => {
      // sorted descending
      team.sort((x, y) => {
        const metrics = [firstMetric, secondMetric, thirdMetric, forthMetric];

        for (const metric of metrics) {
          const res = metric(x, y);
          if (res != 0) {
            return -res;
          }
        }
      });
    })
  }

  const getCurrentRanking = () => {
    // modifies prop locally
    for (const team of teams) {
      team["matchStats"] = {
        Goals: 0,
        Win: 0,
        Lose: 0,
        Draw: 0,
      }
    }
    calculateMatchStats();
    calculateRanking();
  }

  getCurrentRanking();

  return (
    <>
    </>
  );
}