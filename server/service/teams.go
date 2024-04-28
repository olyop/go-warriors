package service

import (
	"gowarriors/integrations/nba"
	"gowarriors/integrations/nba/response"
	"gowarriors/schema"
	"gowarriors/service/mappers"
)

// RetreiveTeams returns a list of teams
func RetreiveTeams(client nba.NBA) ([]schema.GoWarriorsAPITeam, error) {
	parameters := response.NBATeamsParameters{
		League: "standard",
	}

	data, err := client.GetTeams(parameters)
	if err != nil {
		return nil, err
	}

	teams := filterTeams(data)
	teamsFiltered := mappers.MapTeams(teams)

	return teamsFiltered, nil
}

func filterTeams(teams []response.NBATeamResponse) []response.NBATeamResponse {
	var filteredTeams []response.NBATeamResponse

	for _, team := range teams {
		if !team.NBAFranchise || team.AllStar {
			continue
		}

		filteredTeams = append(filteredTeams, team)
	}

	return filteredTeams
}
