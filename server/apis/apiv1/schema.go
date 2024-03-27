package apiv1

// GoWarriorsAPIResponse is the base response for the GoWarriorsAPI
type GoWarriorsAPIResponse[T any] struct {
	Data T `json:"data"`
}

// GoWarriorsAPIGame is the game object for the GoWarriorsAPI
type GoWarriorsAPIGame struct {
	Home GoWarriorsAPIGameTeam `json:"home"`
	Away GoWarriorsAPIGameTeam `json:"away"`
}

// GoWarriorsAPIGameTeam represents a team in a game in the GoWarriorsAPI
type GoWarriorsAPIGameTeam struct {
	Team  GoWarriorsAPITeam  `json:"team"`
	Score GoWarriorsAPIScore `json:"score"`
}

// GoWarriorsAPITeam represents a team in the GoWarriorsAPI
type GoWarriorsAPITeam struct {
	TeamID   int    `json:"teamID"`
	Code     string `json:"code"`
	Name     string `json:"name"`
	Nickname string `json:"nickname"`
	Logo     string `json:"logo"`
}

// GoWarriorsAPIScore represents a team's score in a game in the GoWarriorsAPI
type GoWarriorsAPIScore struct {
	Points int `json:"points"`
}
