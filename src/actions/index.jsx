export const changeHighlightedSummoner = (summonerName) => {
  return (
    {
      type: 'CHANGE_SUMMONER_NAME',
      summonerName: summonerName
    }
  )
}
