export const changeHighlightedSummoner = (summonerName) => {
  console.log('changeHighlightedSummoner', summonerName)
  return (
    {
      type: 'CHANGE_SUMMONER_NAME',
      summonerName: summonerName
    }
  )
}
