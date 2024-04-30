package schema

// GoWarriorsAPIGame is the game object for the GoWarriorsAPI
type GoWarriorsAPIGame struct {
	GameID    int                     `json:"gameID"`
	StartTime int64                   `json:"startTime"`
	Status    GoWarriorsAPIGameStatus `json:"status"`
	Home      GoWarriorsAPIGameTeam   `json:"home"`
	Away      GoWarriorsAPIGameTeam   `json:"away"`
}

// GoWarriorsAPIGameStatus represents the status of a game in the GoWarriorsAPI
type GoWarriorsAPIGameStatus struct {
	Status string `json:"status"`
	Period int    `json:"period"`
	Clock  string `json:"clock"`
}

// GoWarriorsAPIGameTeam represents a team in a game in the GoWarriorsAPI
type GoWarriorsAPIGameTeam struct {
	Team       GoWarriorsAPITeam             `json:"team"`
	Score      GoWarriorsAPIScore            `json:"score"`
	Players    []GoWarriorsAPIGamePlayer     `json:"players"`
	Statistics []GoWarriorsAPITeamStatistics `json:"statistics"`
}

// GoWarriorsAPIScore represents a team's score in a game in the GoWarriorsAPI
type GoWarriorsAPIScore struct {
	Points int `json:"points"`
}

// GoWarriorsAPITeamStatistics represents a team in the GoWarriorsAPI
type GoWarriorsAPITeamStatistics struct {
	FastBreakPoints        int     `json:"fastBreakPoints,omitempty"`
	PointsInPaint          int     `json:"pointsInPaint,omitempty"`
	BiggestLead            int     `json:"biggestLead,omitempty"`
	SecondChancePoints     int     `json:"secondChancePoints,omitempty"`
	PointsOffTurnovers     int     `json:"pointsOffTurnovers,omitempty"`
	LongestRun             int     `json:"longestRun,omitempty"`
	Points                 int     `json:"points,omitempty"`
	FieldGoalsMade         int     `json:"fieldGoalsMade,omitempty"`
	FieldGoalsAttempted    int     `json:"fieldGoalsAttempted,omitempty"`
	FieldGoalPercentage    float64 `json:"fieldGoalPercentage,omitempty"`
	FreeThrowsMade         int     `json:"freeThrowsMade,omitempty"`
	FreeThrowsAttempted    int     `json:"freeThrowsAttempted,omitempty"`
	FreeThrowPercentage    float64 `json:"freeThrowPercentage,omitempty"`
	ThreePointersMade      int     `json:"threePointersMade,omitempty"`
	ThreePointersAttempted int     `json:"threePointersAttempted,omitempty"`
	ThreePointPercentage   float64 `json:"threePointPercentage,omitempty"`
	OffensiveRebounds      int     `json:"offensiveRebounds,omitempty"`
	DefensiveRebounds      int     `json:"defensiveRebounds,omitempty"`
	TotalRebounds          int     `json:"totalRebounds,omitempty"`
	Assists                int     `json:"assists,omitempty"`
	PersonalFouls          int     `json:"personalFouls,omitempty"`
	Steals                 int     `json:"steals,omitempty"`
	Turnovers              int     `json:"turnovers,omitempty"`
	Blocks                 int     `json:"blocks,omitempty"`
}

// GoWarriorsAPIGamePlayer represents a player's statistics in a game in the GoWarriorsAPI
type GoWarriorsAPIGamePlayer struct {
	Player     GoWarriorsAPIPlayer               `json:"player"`
	Statistics GoWarriorsAPIGamePlayerStatistics `json:"statistics"`
}

// GoWarriorsAPIGamePlayerStatistics represents a player's statistics in a game in the GoWarriorsAPI
type GoWarriorsAPIGamePlayerStatistics struct {
	Points                 int     `json:"points,omitempty"`
	Position               string  `json:"position,omitempty"`
	Minutes                string  `json:"minutes,omitempty"`
	FieldGoalsMade         int     `json:"fieldGoalsMade,omitempty"`
	FieldGoalsAttempted    int     `json:"fieldGoalsAttempted,omitempty"`
	FieldGoalPercentage    float64 `json:"fieldGoalPercentage,omitempty"`
	FreeThrowsMade         int     `json:"freeThrowsMade,omitempty"`
	FreeThrowsAttempted    int     `json:"freeThrowsAttempted,omitempty"`
	FreeThrowPercentage    float64 `json:"freeThrowPercentage,omitempty"`
	ThreePointersMade      int     `json:"threePointersMade,omitempty"`
	ThreePointersAttempted int     `json:"threePointersAttempted,omitempty"`
	ThreePointPercentage   float64 `json:"threePointPercentage,omitempty"`
	OffensiveRebounds      int     `json:"offensiveRebounds,omitempty"`
	DefensiveRebounds      int     `json:"defensiveRebounds,omitempty"`
	TotalRebounds          int     `json:"totalRebounds,omitempty"`
	Assists                int     `json:"assists,omitempty"`
	PersonalFouls          int     `json:"personalFouls,omitempty"`
	Steals                 int     `json:"steals,omitempty"`
	Turnovers              int     `json:"turnovers,omitempty"`
	Blocks                 int     `json:"blocks,omitempty"`
	PlusMinus              string  `json:"plusMinus,omitempty"`
	Comment                string  `json:"comment,omitempty"`
}
