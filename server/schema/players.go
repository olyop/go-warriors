package schema

// GoWarriorsAPIPlayer represents a player in the GoWarriorsAPI
type GoWarriorsAPIPlayer struct {
	PlayerID  int    `json:"playerID"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}
