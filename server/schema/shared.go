package schema

// GoWarriorsAPIResponse is the base response for the GoWarriorsAPI
type GoWarriorsAPIResponse[T any] struct {
	Data  T      `json:"data"`
	Error string `json:"error"`
}
