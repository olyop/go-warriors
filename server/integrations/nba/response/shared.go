package response

// NBAResponse is the base response from the NBA API
type NBAResponse[T interface{}] struct {
	Message  string `json:"message,omitempty"`
	Response []T    `json:"response,omitempty"`
}
