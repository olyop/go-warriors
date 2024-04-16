package nba

// GetGames returns the games for a given date
func (nba *NBA) GetGames(params map[string]string) (Response[Game], error) {
	data, err := Query[Game](nba, "games", params)

	if err != nil {
		return data, err
	}

	return data, nil
}

// GetTeams returns the teams for a given date
func (nba *NBA) GetTeams(params map[string]string) (Response[Team], error) {
	data, err := Query[Team](nba, "teams", params)

	if err != nil {
		return data, err
	}

	return data, nil
}
