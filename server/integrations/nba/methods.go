package nba

// GetGames returns the games for a given date
func (nba *NBA) GetGames(params map[string]string) (Response[Game], error) {
	return Query[Game](nba, "games", params)
}

// GetTeams returns the teams for a given date
func (nba *NBA) GetTeams() (Response[Team], error) {
	return Query[Team](nba, "teams", map[string]string{})
}
