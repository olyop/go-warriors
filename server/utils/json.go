package utils

import (
	"encoding/json"
	"fmt"
)

// LogJSON logs the JSON representation of the given object using MarshalIndent
func LogJSON(obj interface{}) {
	bytes, _ := json.MarshalIndent(obj, "", "  ")

	fmt.Println(string(bytes))
}
