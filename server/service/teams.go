package service

import (
	"gowarriors/integrations/nba"
	"gowarriors/schema"
	"gowarriors/service/mappers"
)

// RetreiveTeams returns a list of teams
func RetreiveTeams(client nba.NBA) ([]schema.GoWarriorsAPITeam, error) {
	data, err := client.GetTeams()

	if err != nil {
		return nil, err
	}

	teams := mappers.MapTeams(data.Response)

	return teams, nil
}
