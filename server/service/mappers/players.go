package mappers

import (
	"gowarriors/integrations/nba/response"
	"gowarriors/schema"
)

// MapPlayers maps the NBA API players response to a GoWarriors API players response
func MapPlayers(response []response.NBAPlayerResponse) []schema.GoWarriorsAPIPlayer {
	players := make([]schema.GoWarriorsAPIPlayer, len(response))

	for i, player := range response {
		players[i] = MapPlayer(player)
	}

	return players
}

// MapPlayer maps the NBA API player response to a GoWarriors API player response
func MapPlayer(player response.NBAPlayerResponse) schema.GoWarriorsAPIPlayer {
	return schema.GoWarriorsAPIPlayer{
		PlayerID:  player.ID,
		FirstName: player.FirstName,
		LastName:  player.LastName,
	}
}
