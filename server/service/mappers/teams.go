package mappers

import (
	"gowarriors/integrations/nba/response"
	"gowarriors/schema"
)

// MapTeams maps the NBA API team response to a GoWarriors API team response
func MapTeams(response []response.NBATeamResponse) []schema.GoWarriorsAPITeam {
	teams := make([]schema.GoWarriorsAPITeam, len(response))

	for i := 0; i < len(response); i++ {
		teams[i] = mapTeam(response[i])
	}

	return teams
}

// mapTeam maps the NBA API team response to a GoWarriors API team response
func mapTeam(team response.NBATeamResponse) schema.GoWarriorsAPITeam {
	return schema.GoWarriorsAPITeam{
		TeamID:     team.ID,
		Code:       team.Code,
		Name:       team.Name,
		Nickname:   team.Nickname,
		Logo:       fixTeamLogo(team.ID, team.Logo),
		Conference: team.Leagues.Standard.Conference,
		Division:   team.Leagues.Standard.Division,
	}
}
