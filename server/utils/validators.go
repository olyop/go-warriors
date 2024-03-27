package utils

import (
	"time"
)

const layout = "2006-01-02"

// ParseDate parses and validates a date string in the format "YYYY-MM-DD"
func ParseDate(date string) (string, bool) {
	parsed, err := time.Parse(layout, date)

	if err != nil {
		return "", false
	}

	value := parsed.Format(layout)

	isValid := value == date

	if !isValid {
		return "", false
	}

	return value, true
}
