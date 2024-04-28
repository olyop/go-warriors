package schema

// GoWarriorsAPITeam represents a team in the GoWarriorsAPI
type GoWarriorsAPITeam struct {
	TeamID     int    `json:"teamID"`
	Code       string `json:"code"`
	Name       string `json:"name"`
	Nickname   string `json:"nickname"`
	Logo       string `json:"logo"`
	Conference string `json:"conference,omitempty"`
	Division   string `json:"division,omitempty"`
}
