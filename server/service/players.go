package service

import (
	"gowarriors/integrations/nba"
	"gowarriors/integrations/nba/response"
	"gowarriors/schema"
	"gowarriors/service/mappers"
)

// RetreivePlayers retrieves players from the NBA API
func RetreivePlayers(client nba.NBA, teamID int) ([]schema.GoWarriorsAPIPlayer, error) {
	parameters := response.NBAPlayersParameters{
		ID: teamID,
	}

	data, err := client.GetPlayers(parameters)
	if err != nil {
		return nil, err
	}

	players := mappers.MapPlayers(data)

	return players, nil
}
