package utils

import (
	"strconv"
	"time"
)

const layout = "2006-01-02T15:04:05.000Z"

// ParseISODate parses and validates a date string in the format "YYYY-MM-DD"
func ParseISODate(date string) (string, bool) {
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

// ParseStringToInt parses and validates a string to an integer
func ParseStringToInt(s string) (int, bool) {
	i, err := strconv.Atoi(s)

	if err != nil {
		return 0, false
	}

	return i, true
}
